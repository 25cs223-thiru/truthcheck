import { createActor } from "@/backend";
import type { Submission } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetSubmissions() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Submission[]>({
    queryKey: ["submissions"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getSubmissions();
      // Sort newest first by timestamp
      return [...results].sort((a, b) => Number(b.timestamp - a.timestamp));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useClearHistory() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor || isFetching) {
        throw new Error("Backend not ready");
      }
      const confirmed = window.confirm(
        "Clear all analysis history? This cannot be undone.",
      );
      if (!confirmed) return;
      await actor.clearHistory();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
}
