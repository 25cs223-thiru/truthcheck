import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type Verdict = string;
export interface Submission {
    id: SubmissionId;
    justification: string;
    inputText: string;
    verdict: Verdict;
    timestamp: Timestamp;
    confidence: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export type SubmissionId = bigint;
export interface backendInterface {
    analyzeText(inputText: string): Promise<Submission>;
    clearHistory(): Promise<void>;
    getSubmissions(): Promise<Array<Submission>>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
