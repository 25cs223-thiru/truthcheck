import Types "../types/common";
import DetectionLib "../lib/detection";
import List "mo:core/List";
import Time "mo:core/Time";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Text "mo:core/Text";

mixin (
  submissions : List.List<Types.Submission>,
) {
  // NOTE: nextId is derived from submissions.size() to avoid var in mixin params.

  /// Submit a news headline or text for fake-news analysis.
  /// Calls external AI/fact-checking API via HTTP outcall and stores the result.
  public func analyzeText(inputText : Text) : async Types.Submission {
    let requestBody = DetectionLib.buildRequestBody(inputText);
    let apiUrl = "https://api.openai.com/v1/chat/completions";
    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/json" },
      // The API key is intentionally left empty for the MVP — users configure
      // their own key via environment or replace this placeholder at deploy time.
      { name = "Authorization"; value = "Bearer OPENAI_API_KEY" },
    ];

    let result : Types.AnalysisResult = try {
      let rawJson = await OutCall.httpPostRequest(apiUrl, headers, requestBody, transform);
      // The OpenAI response wraps the assistant message; extract the `content` field.
      let content = extractContent(rawJson);
      DetectionLib.parseAnalysisResult(content);
    } catch (_) {
      {
        verdict = "UNCERTAIN";
        confidence = 0;
        justification = "Failed to reach the analysis API. Please try again later.";
      };
    };

    let id = submissions.size();
    let submission = DetectionLib.newSubmission(id, Time.now(), inputText, result);
    submissions.add(submission);
    submission;
  };

  /// Retrieve all past submissions, newest first.
  public query func getSubmissions() : async [Types.Submission] {
    DetectionLib.sortedNewestFirst(submissions);
  };

  /// Clear all submission history.
  public func clearHistory() : async () {
    submissions.clear();
  };

  /// Transform callback required by the IC for HTTP outcalls (strips non-essential headers).
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ── Private helpers ──────────────────────────────────────────────────────

  /// Extract the `content` field from an OpenAI chat completion response.
  /// Falls back to the full response if extraction fails.
  func extractContent(json : Text) : Text {
    // Look for "content":"<value>" in the JSON body
    let key = "\"content\"";
    switch (findSubstr(json, key, 0)) {
      case null { json }; // fallback: treat entire response as the payload
      case (?keyStart) {
        let afterKey = keyStart + key.size();
        let chars = json.toArray();
        // Skip whitespace + ':'
        var i = afterKey;
        while (i < chars.size() and (chars[i] == ' ' or chars[i] == ':')) { i += 1 };
        if (i >= chars.size() or chars[i] != '\u{22}') return json;
        i += 1; // skip opening quote
        var result = "";
        var escaped = false;
        label read while (i < chars.size()) {
          let c = chars[i];
          if (escaped) {
            if (c == 'n') { result := result # "\n" }
            else if (c == 'r') { result := result # "\r" }
            else if (c == 't') { result := result # "\t" }
            else { result := result # Text.fromChar(c) };
            escaped := false;
          } else if (c == '\\') {
            escaped := true;
          } else if (c == '\u{22}') {
            break read;
          } else {
            result := result # Text.fromChar(c);
          };
          i += 1;
        };
        result;
      };
    };
  };

  /// Minimal substring search helper (duplicated here to keep mixin self-contained).
  func findSubstr(haystack : Text, needle : Text, from : Nat) : ?Nat {
    let hChars = haystack.toArray();
    let nChars = needle.toArray();
    let hLen = hChars.size();
    let nLen = nChars.size();
    if (nLen == 0) return ?from;
    var i = from;
    label search while (i + nLen <= hLen) {
      var match = true;
      var j = 0;
      while (j < nLen) {
        if (hChars[i + j] != nChars[j]) { match := false };
        j += 1;
      };
      if (match) return ?i;
      i += 1;
    };
    null;
  };
};
