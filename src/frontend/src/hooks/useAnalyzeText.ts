import { createActor } from "@/backend";
import type { AnalysisResult, Verdict } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AnalyzePayload {
  text: string;
}

export function useAnalyzeText() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<AnalysisResult, Error, AnalyzePayload>({
    mutationFn: async ({ text }) => {
      if (!actor || isFetching) {
        throw new Error("Backend not ready");
      }
      const submission = await actor.analyzeText(text);
      return {
        verdict: submission.verdict as Verdict,
        confidence: Number(submission.confidence),
        justification: submission.justification,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
}
