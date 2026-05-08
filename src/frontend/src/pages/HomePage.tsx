import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAnalyzeText } from "@/hooks/useAnalyzeText";
import { useClearHistory, useGetSubmissions } from "@/hooks/useSubmissions";
import type { AnalysisResult, Verdict } from "@/types";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock,
  HelpCircle,
  Loader2,
  Search,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

const SAMPLE_TEXTS: Array<{ id: string; label: string; text: string }> = [
  {
    id: "sample-credible",
    label: "Try sample 1",
    text: "Scientists have confirmed that drinking coffee every morning can increase lifespan by 10 years, according to a peer-reviewed study published in the New England Journal of Medicine.",
  },
  {
    id: "sample-fake",
    label: "Try sample 2",
    text: "SHOCKING: Government secretly putting mind-control chemicals in tap water! Exposed by whistleblower! Share before they delete this!",
  },
  {
    id: "sample-neutral",
    label: "Try sample 3",
    text: "The mayor announced plans for a new downtown transit hub. Officials said construction will begin next spring, pending budget approval from the city council.",
  },
];

function VerdictIcon({ verdict }: { verdict: Verdict }) {
  if (verdict === "REAL")
    return <CheckCircle2 className="w-5 h-5 text-success" />;
  if (verdict === "FAKE")
    return <AlertTriangle className="w-5 h-5 text-destructive" />;
  return <HelpCircle className="w-5 h-5 text-warning" />;
}

function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const styles: Record<Verdict, string> = {
    REAL: "bg-[oklch(var(--success)/0.12)] text-success border-[oklch(var(--success)/0.3)]",
    FAKE: "bg-destructive/10 text-destructive border-destructive/30",
    UNCERTAIN:
      "bg-[oklch(var(--warning)/0.12)] text-warning border-[oklch(var(--warning)/0.3)]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-display font-600 border ${styles[verdict]}`}
    >
      <VerdictIcon verdict={verdict} />
      {verdict}
    </span>
  );
}

function ConfidenceBar({
  value,
  verdict,
}: { value: number; verdict: Verdict }) {
  const colors: Record<Verdict, string> = {
    REAL: "bg-[oklch(var(--success))]",
    FAKE: "bg-destructive",
    UNCERTAIN: "bg-[oklch(var(--warning))]",
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-muted-foreground font-body">
          Confidence
        </span>
        <span className="text-sm font-display font-700 text-foreground">
          {value}%
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colors[verdict]}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    </div>
  );
}

function ResultCard({
  result,
  text,
}: { result: AnalysisResult; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border bg-card shadow-xs overflow-hidden"
      data-ocid="result.card"
    >
      <div className="px-5 pt-5 pb-4 border-b border-border bg-muted/20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <VerdictBadge verdict={result.verdict} />
          <span className="text-xs text-muted-foreground truncate hidden sm:block">
            {text.slice(0, 60)}
            {text.length > 60 ? "…" : ""}
          </span>
        </div>
        <ConfidenceBar value={result.confidence} verdict={result.verdict} />
      </div>
      <div className="px-5 py-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-2">
          Analysis
        </p>
        <p className="text-sm text-foreground leading-relaxed font-body">
          {result.justification}
        </p>
      </div>
    </motion.div>
  );
}

function HistoryItem({
  text,
  verdict,
  confidence,
  index,
}: {
  text: string;
  verdict: string;
  confidence: bigint;
  index: number;
}) {
  const v = verdict as Verdict;
  const iconColors: Record<string, string> = {
    REAL: "text-success",
    FAKE: "text-destructive",
    UNCERTAIN: "text-warning",
  };
  return (
    <div
      className="flex items-start gap-3 py-3 border-b border-border last:border-0 group"
      data-ocid={`history.item.${index}`}
    >
      <div
        className={`mt-0.5 flex-shrink-0 ${iconColors[v] ?? "text-muted-foreground"}`}
      >
        {v === "REAL" && <CheckCircle2 className="w-3.5 h-3.5" />}
        {v === "FAKE" && <AlertTriangle className="w-3.5 h-3.5" />}
        {v === "UNCERTAIN" && <HelpCircle className="w-3.5 h-3.5" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-foreground line-clamp-2 font-body leading-snug">
          {text}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          {v} · {Number(confidence)}% confidence
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [inputText, setInputText] = useState("");
  const [lastResult, setLastResult] = useState<AnalysisResult | null>(null);
  const [lastText, setLastText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const analyzeText = useAnalyzeText();
  const { data: submissions = [], isLoading: loadingHistory } =
    useGetSubmissions();
  const clearHistory = useClearHistory();

  const canSubmit = inputText.trim().length >= 20;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const text = inputText.trim();
    setLastText(text);
    analyzeText.mutate(
      { text },
      {
        onSuccess: (result) => {
          setLastResult(result);
        },
      },
    );
  }

  function loadSample(text: string) {
    setInputText(text);
    textareaRef.current?.focus();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        {/* Main column */}
        <div className="space-y-6">
          {/* Hero heading */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-display text-3xl sm:text-4xl font-700 tracking-tight text-foreground leading-tight">
              Detect misinformation
              <br />
              <span className="text-primary">before it spreads.</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground font-body max-w-lg">
              Paste any news article, headline, or claim. Our AI analyzes
              credibility signals and returns a verdict with confidence score.
            </p>
          </motion.div>

          {/* Input form */}
          <motion.form
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-3"
            data-ocid="analyze.form"
          >
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste a news article, headline, or claim here (min. 20 characters)…"
                className="min-h-[140px] text-sm resize-none bg-card border-input font-body focus:ring-1 focus:ring-ring"
                data-ocid="analyze.textarea"
              />
              {inputText.length > 0 && (
                <span className="absolute bottom-2.5 right-3 text-[10px] text-muted-foreground">
                  {inputText.length} chars
                </span>
              )}
            </div>

            {/* Sample texts */}
            <div className="flex flex-wrap gap-1.5" data-ocid="analyze.samples">
              {SAMPLE_TEXTS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => loadSample(s.text)}
                  className="text-[10px] text-muted-foreground hover:text-primary border border-border hover:border-primary/40 bg-muted/40 hover:bg-primary/5 px-2 py-1 rounded-md transition-smooth"
                  data-ocid={`analyze.sample.${i + 1}`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="submit"
                disabled={!canSubmit || analyzeText.isPending}
                className="h-10 px-5 font-display font-600 text-sm"
                data-ocid="analyze.submit_button"
              >
                {analyzeText.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing…
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Analyze
                  </>
                )}
              </Button>
              {!canSubmit && inputText.length > 0 && (
                <p
                  className="text-xs text-muted-foreground"
                  data-ocid="analyze.field_error"
                >
                  Need at least 20 characters
                </p>
              )}
            </div>
          </motion.form>

          {/* Loading state */}
          <AnimatePresence>
            {analyzeText.isPending && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-border bg-card p-5 space-y-3"
                data-ocid="analyze.loading_state"
              >
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error state */}
          {analyzeText.isError && (
            <div
              className="rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-4 text-sm text-destructive font-body"
              data-ocid="analyze.error_state"
            >
              Analysis failed. Please try again.
            </div>
          )}

          {/* Result card */}
          <AnimatePresence>
            {lastResult && !analyzeText.isPending && (
              <ResultCard key="result" result={lastResult} text={lastText} />
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar — submission history */}
        <aside className="space-y-3">
          <div
            className="rounded-xl border border-border bg-card overflow-hidden"
            data-ocid="history.panel"
          >
            <div className="px-4 pt-4 pb-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-display font-600 text-foreground uppercase tracking-wide">
                  History
                </span>
              </div>
              {submissions.length > 0 && (
                <button
                  type="button"
                  onClick={() => clearHistory.mutate()}
                  disabled={clearHistory.isPending}
                  className="text-[10px] text-muted-foreground hover:text-destructive transition-colors duration-200 flex items-center gap-1"
                  data-ocid="history.clear_button"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>

            <div className="px-4 py-1">
              {loadingHistory ? (
                <div
                  className="space-y-2 py-3"
                  data-ocid="history.loading_state"
                >
                  {(["s1", "s2", "s3"] as const).map((k) => (
                    <Skeleton key={k} className="h-8 w-full" />
                  ))}
                </div>
              ) : submissions.length === 0 ? (
                <div
                  className="py-8 flex flex-col items-center gap-2 text-center"
                  data-ocid="history.empty_state"
                >
                  <Search className="w-7 h-7 text-muted-foreground/40" />
                  <p className="text-xs text-muted-foreground font-body">
                    No analyses yet.
                    <br />
                    Submit your first claim above.
                  </p>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 rotate-[-90deg]" />
                </div>
              ) : (
                submissions
                  .slice(0, 10)
                  .map((s, i) => (
                    <HistoryItem
                      key={String(s.id)}
                      text={s.inputText}
                      verdict={s.verdict}
                      confidence={s.confidence}
                      index={i + 1}
                    />
                  ))
              )}
            </div>
          </div>

          {/* Verdict legend */}
          <div className="rounded-xl border border-border bg-card/60 px-4 py-3 space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">
              Verdict Guide
            </p>
            {(["REAL", "UNCERTAIN", "FAKE"] as Verdict[]).map((v) => (
              <div key={v} className="flex items-center gap-2">
                <VerdictBadge verdict={v} />
                <span className="text-[10px] text-muted-foreground font-body">
                  {v === "REAL" && "Likely credible"}
                  {v === "UNCERTAIN" && "Needs verification"}
                  {v === "FAKE" && "Likely misinformation"}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
