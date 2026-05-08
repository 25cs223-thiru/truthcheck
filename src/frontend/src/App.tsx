import { Layout } from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import LearnPage from "@/pages/LearnPage";
import { useState } from "react";

export type Page = "home" | "learn";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  // Allow cross-component navigation via custom event (e.g., from LearnPage CTA)
  if (typeof window !== "undefined") {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === "home" || detail === "learn") setPage(detail);
    };
    window.removeEventListener("truthcheck:navigate", handler);
    window.addEventListener("truthcheck:navigate", handler);
  }

  return (
    <Layout activePage={page} onNavigate={setPage}>
      {page === "learn" ? <LearnPage /> : <HomePage />}
    </Layout>
  );
}
