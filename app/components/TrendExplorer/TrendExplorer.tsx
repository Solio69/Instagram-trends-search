"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DEMO_POSTS, DEMO_SOURCE } from "../../constants/demo";
import { advanceDemoStage, canStartDemo, getDemoView, type DemoStage } from "../../lib/demo-flow";
import { getVisiblePosts, normalizeResultLimit, type ContentFilter, type PeriodDays, type SortMetric } from "../../lib/results";
import { ResultsSection } from "../results/ResultsSection";
import { SearchPanel } from "../search/SearchPanel";

export function TrendExplorer() {
  const [niche, setNiche] = useState("");
  const [periodDays, setPeriodDays] = useState<PeriodDays>(3);
  const [contentFilter, setContentFilter] = useState<ContentFilter>("all");
  const [limitInput, setLimitInput] = useState("50");
  const [sortBy, setSortBy] = useState<SortMetric>("likeCount");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [stage, setStage] = useState<DemoStage>("idle");
  const resultsRef = useRef<HTMLElement>(null);
  const limit = normalizeResultLimit(Number(limitInput || 50));
  const view = getDemoView(stage);
  const visiblePosts = useMemo(
    () => getVisiblePosts(DEMO_POSTS, { periodDays, contentFilter, limit, sortBy, keywords: selectedKeywords }, DEMO_SOURCE.snapshotAt),
    [periodDays, contentFilter, limit, sortBy, selectedKeywords],
  );

  useEffect(() => {
    if (stage !== "loading-breakdown" && stage !== "loading-posts") return;
    const timer = window.setTimeout(() => setStage((current) => advanceDemoStage(current)), 1000);
    return () => window.clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "complete") return;
    resultsRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }, [stage]);

  function changeNiche(value: string) {
    setNiche(value);
    setStage("idle");
  }

  function showTrends() {
    if (!canStartDemo(niche)) return;
    setSelectedKeywords([]);
    setStage("loading-breakdown");
  }

  function toggleKeyword(term: string) {
    setSelectedKeywords((current) => current.includes(term) ? current.filter((item) => item !== term) : [...current, term]);
  }

  function downloadJson() {
    const payload = {
      source: DEMO_SOURCE.name,
      sourceRun: DEMO_SOURCE.runUrl,
      sourceQuery: DEMO_SOURCE.query,
      snapshotAt: DEMO_SOURCE.snapshotAt,
      demo: true,
      filters: { periodDays, contentFilter, limit, sortBy, keywords: selectedKeywords, direction: "desc" },
      count: visiblePosts.length,
      posts: visiblePosts,
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = DEMO_SOURCE.filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return <>
    <SearchPanel
      niche={niche}
      periodDays={periodDays}
      contentFilter={contentFilter}
      limitInput={limitInput}
      view={view}
      onNicheChange={changeNiche}
      onPeriodChange={setPeriodDays}
      onContentFilterChange={setContentFilter}
      onLimitChange={setLimitInput}
      onLimitCommit={() => setLimitInput(String(limit))}
      onSubmit={showTrends}
    />
    {view.results && <ResultsSection
      posts={visiblePosts}
      totalCount={DEMO_POSTS.length}
      periodDays={periodDays}
      sortBy={sortBy}
      selectedKeywords={selectedKeywords}
      onSort={setSortBy}
      onKeywordToggle={toggleKeyword}
      onKeywordClear={() => setSelectedKeywords([])}
      onDownload={downloadJson}
      sectionRef={resultsRef}
    />}
  </>;
}
