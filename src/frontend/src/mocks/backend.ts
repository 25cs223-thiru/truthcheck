import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  analyzeText: async (inputText: string) => ({
    id: BigInt(1),
    inputText,
    verdict: "FAKE",
    confidence: BigInt(87),
    justification:
      "This content exhibits several hallmarks of misinformation: unverified sourcing, emotionally charged language designed to bypass critical thinking, and claims that contradict established reporting from credible outlets. The narrative structure is consistent with fabricated content designed to go viral.",
    timestamp: BigInt(Date.now()) * BigInt(1_000_000),
  }),
  clearHistory: async () => undefined,
  getSubmissions: async () => [
    {
      id: BigInt(1),
      inputText:
        "Scientists confirm drinking coffee reverses aging — study shows 20 years younger in 30 days",
      verdict: "FAKE",
      confidence: BigInt(92),
      justification:
        "No peer-reviewed study supports this claim. The language is hyperbolic and the claim contradicts established nutritional science.",
      timestamp: BigInt(Date.now() - 3600000) * BigInt(1_000_000),
    },
    {
      id: BigInt(2),
      inputText:
        "Global average temperatures have risen approximately 1.1°C above pre-industrial levels according to the latest IPCC report",
      verdict: "REAL",
      confidence: BigInt(98),
      justification:
        "This aligns with data published in the IPCC Sixth Assessment Report (AR6) and corroborated by multiple independent climate research institutions.",
      timestamp: BigInt(Date.now() - 7200000) * BigInt(1_000_000),
    },
    {
      id: BigInt(3),
      inputText:
        "A new bill in Congress proposes significant changes to how social media platforms moderate content",
      verdict: "UNCERTAIN",
      confidence: BigInt(54),
      justification:
        "While several such bills have been proposed, the specific details cannot be verified without more context. The statement is plausible but insufficiently specific to confirm or deny.",
      timestamp: BigInt(Date.now() - 10800000) * BigInt(1_000_000),
    },
  ],
  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  }),
};
