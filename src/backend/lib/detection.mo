import Types "../types/common";
import List "mo:core/List";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

module {
  public type Submission = Types.Submission;
  public type AnalysisResult = Types.AnalysisResult;

  /// Create a new submission record with the given fields.
  public func newSubmission(
    id : Nat,
    timestamp : Int,
    inputText : Text,
    result : AnalysisResult,
  ) : Submission {
    {
      id;
      timestamp;
      inputText;
      verdict = result.verdict;
      confidence = result.confidence;
      justification = result.justification;
    };
  };

  /// Parse an LLM/fact-checking API JSON response into an AnalysisResult.
  /// Performs lightweight substring extraction — no full JSON parser required.
  public func parseAnalysisResult(rawJson : Text) : AnalysisResult {
    // Extract verdict
    let verdict = extractJsonString(rawJson, "verdict");
    let verdictNorm = switch (verdict) {
      case (?v) {
        let upper = v.toUpper();
        if (upper == "FAKE" or upper == "REAL" or upper == "UNCERTAIN") {
          upper;
        } else {
          "UNCERTAIN";
        };
      };
      case null { "UNCERTAIN" };
    };

    // Extract confidence as Nat (0-100)
    let confidence = switch (extractJsonNumber(rawJson, "confidence")) {
      case (?n) { if (n > 100) 100 else n };
      case null { 0 };
    };

    // Extract justification
    let justification = switch (extractJsonString(rawJson, "justification")) {
      case (?j) { j };
      case null { "No justification provided." };
    };

    { verdict = verdictNorm; confidence; justification };
  };

  /// Build the JSON request body to send to the external AI API (OpenAI-compatible).
  public func buildRequestBody(inputText : Text) : Text {
    let escaped = escapeJson(inputText);
    let systemPrompt = "You are a fact-checking AI. Analyze the given news text and classify it. " #
      "Respond ONLY with a JSON object containing exactly these fields: " #
      "\\\"verdict\\\" (string: FAKE, REAL, or UNCERTAIN), " #
      "\\\"confidence\\\" (integer 0-100), " #
      "\\\"justification\\\" (string, brief explanation). " #
      "Example: {\\\"verdict\\\": \\\"FAKE\\\", \\\"confidence\\\": 87, \\\"justification\\\": \\\"The claim contradicts verified sources.\\\"}";
    "{\"model\":\"gpt-3.5-turbo\",\"messages\":[{\"role\":\"system\",\"content\":\"" # systemPrompt # "\"},{\"role\":\"user\",\"content\":\"" # escaped # "\"}],\"temperature\":0.2,\"max_tokens\":256}";
  };

  /// Return all submissions sorted newest first (highest timestamp first).
  public func sortedNewestFirst(submissions : List.List<Submission>) : [Submission] {
    let arr = submissions.toArray();
    arr.sort(func(a, b) = Int.compare(b.timestamp, a.timestamp));
  };

  // ── Private helpers ──────────────────────────────────────────────────────

  /// Extract the string value of a JSON key using simple substring search.
  func extractJsonString(json : Text, key : Text) : ?Text {
    let needle = "\"" # key # "\"";
    // Find key position
    switch (findSubstring(json, needle, 0)) {
      case null { null };
      case (?keyStart) {
        let afterKey = keyStart + needle.size();
        // Skip whitespace + ':'
        switch (findChar(json, '\"', afterKey)) {
          case null { null };
          case (?openQuote) {
            let contentStart = openQuote + 1;
            // Find closing quote (not escaped)
            switch (findClosingQuote(json, contentStart)) {
              case null { null };
              case (?closeQuote) {
                ?substring(json, contentStart, closeQuote);
              };
            };
          };
        };
      };
    };
  };

  /// Extract the numeric value of a JSON key (returns Nat).
  func extractJsonNumber(json : Text, key : Text) : ?Nat {
    let needle = "\"" # key # "\"";
    switch (findSubstring(json, needle, 0)) {
      case null { null };
      case (?keyStart) {
        let afterKey = keyStart + needle.size();
        // Skip whitespace + ':'
        switch (findDigit(json, afterKey)) {
          case null { null };
          case (?digitStart) {
            let numText = collectDigits(json, digitStart);
            Nat.fromText(numText);
          };
        };
      };
    };
  };

  /// Find first occurrence of substring `needle` in `haystack` starting at `from`.
  func findSubstring(haystack : Text, needle : Text, from : Nat) : ?Nat {
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

  /// Find first occurrence of char `c` in `text` starting at `from`.
  func findChar(text : Text, c : Char, from : Nat) : ?Nat {
    let chars = text.toArray();
    var i = from;
    while (i < chars.size()) {
      if (chars[i] == c) return ?i;
      i += 1;
    };
    null;
  };

  /// Find closing (unescaped) double-quote starting at position `from`.
  func findClosingQuote(text : Text, from : Nat) : ?Nat {
    let chars = text.toArray();
    var i = from;
    while (i < chars.size()) {
      if (chars[i] == '\\') {
        i += 2; // skip escaped character
      } else if (chars[i] == '\u{22}') {
        return ?i;
      } else {
        i += 1;
      };
    };
    null;
  };

  /// Find first digit character at or after `from`.
  func findDigit(text : Text, from : Nat) : ?Nat {
    let chars = text.toArray();
    var i = from;
    while (i < chars.size()) {
      let c = chars[i];
      if (c >= '0' and c <= '9') return ?i;
      i += 1;
    };
    null;
  };

  /// Collect contiguous digit characters starting at `from` and return as Text.
  func collectDigits(text : Text, from : Nat) : Text {
    let chars = text.toArray();
    var i = from;
    var result = "";
    while (i < chars.size() and chars[i] >= '0' and chars[i] <= '9') {
      result := result # Text.fromChar(chars[i]);
      i += 1;
    };
    result;
  };

  /// Extract a substring from `from` (inclusive) to `to` (exclusive).
  func substring(text : Text, from : Nat, to : Nat) : Text {
    let chars = text.toArray();
    var result = "";
    var i = from;
    while (i < to and i < chars.size()) {
      result := result # Text.fromChar(chars[i]);
      i += 1;
    };
    result;
  };

  /// Escape special JSON characters in a string.
  func escapeJson(text : Text) : Text {
    var result = "";
    for (c in text.toIter()) {
      if (c == '\u{22}') { result := result # "\\\"" }
      else if (c == '\\') { result := result # "\\\\" }
      else if (c == '\n') { result := result # "\\n" }
      else if (c == '\r') { result := result # "\\r" }
      else if (c == '\t') { result := result # "\\t" }
      else { result := result # Text.fromChar(c) };
    };
    result;
  };
};
