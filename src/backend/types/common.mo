module {
  public type SubmissionId = Nat;
  public type Timestamp = Int;
  public type Verdict = Text; // "FAKE" | "REAL" | "UNCERTAIN"

  public type Submission = {
    id : SubmissionId;
    timestamp : Timestamp;
    inputText : Text;
    verdict : Verdict;
    confidence : Nat;
    justification : Text;
  };

  public type AnalysisResult = {
    verdict : Verdict;
    confidence : Nat;
    justification : Text;
  };
};
