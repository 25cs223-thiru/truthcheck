export type Verdict = "FAKE" | "REAL" | "UNCERTAIN";

export interface Submission {
  id: bigint;
  timestamp: bigint;
  inputText: string;
  verdict: string;
  confidence: bigint;
  justification: string;
}

export interface AnalysisResult {
  verdict: Verdict;
  confidence: number; // 0-100
  justification: string;
}
