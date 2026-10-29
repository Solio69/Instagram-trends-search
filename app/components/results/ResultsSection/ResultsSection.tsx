import type { Ref } from "react";
import type { DemoPost } from "../../../constants/demo";
import { DEMO_FORMALIZATION, DEMO_SOURCE } from "../../../constants/demo";
import { PERIOD_DESCRIPTIONS, SORT_LABELS } from "../../../constants/options";
import type { PeriodDays, SortMetric } from "../../../lib/results";
import { ActionButton } from "../../ui/ActionButton";
import { KeywordFilter } from "../KeywordFilter";
import { ResultsTable } from "../ResultsTable";
import { RESULTS_COPY as copy } from "./constants";
import styles from "./ResultsSection.module.scss";

type ResultsSectionProps = {
  posts: readonly DemoPost[];
  totalCount: number;
  periodDays: PeriodDays;
  sortBy: SortMetric;
  selectedKeywords: readonly string[];
  onSort: (metric: SortMetric) => void;
  onKeywordToggle: (term: string) => void;
  onKeywordClear: () => void;
  onDownload: () => void;
  sectionRef: Ref<HTMLElement>;
};

export function ResultsSection({ posts, totalCount, periodDays, sortBy, selectedKeywords, onSort, onKeywordToggle, onKeywordClear, onDownload, sectionRef }: ResultsSectionProps) {
  return <section className={styles["results-section"]} ref={sectionRef} aria-labelledby="results-title">
    <div className={styles["results-section__heading"]}>
      <div>
        <p className={styles["results-section__eyebrow"]}>{copy.eyebrow}</p>
        <h2 className={styles["results-section__title"]} id="results-title">{copy.title}</h2>
        <p className={styles["results-section__subtitle"]}>{copy.subtitle}</p>
      </div>
      <span className={styles["results-section__count"]} aria-live="polite">{posts.length} {copy.countOf} {totalCount}</span>
    </div>
    <div className={styles["results-section__notice"]} role="note">
      <span className={styles["results-section__notice-icon"]} aria-hidden="true">i</span>
      <p className={styles["results-section__notice-copy"]}>{copy.sourceIntro} <code>{DEMO_SOURCE.query}</code>. {copy.sourceDetail}</p>
      <a className={styles["results-section__source-link"]} href={DEMO_SOURCE.runUrl} target="_blank" rel="noopener noreferrer">{copy.sourceLink}</a>
    </div>
    <div className={styles["results-section__card"]}>
      <div className={styles["results-section__toolbar"]}>
        <div className={styles["results-section__toolbar-copy"]}><strong>{copy.tableTitle}</strong><span>{copy.tableHint}</span></div>
        <span className={styles["results-section__sort-status"]}>{copy.sortPrefix} {SORT_LABELS[sortBy]} ↓</span>
      </div>
      <KeywordFilter topics={DEMO_FORMALIZATION.topics} selected={selectedKeywords} onToggle={onKeywordToggle} onClear={onKeywordClear} />
      <p className={styles["results-section__scroll-hint"]}>{copy.scrollHint}</p>
      <ResultsTable posts={posts} sortBy={sortBy} onSort={onSort} />
      <div className={styles["results-section__footer"]}>
        <span>{copy.shown} {posts.length} {copy.units} · {PERIOD_DESCRIPTIONS[periodDays]} {copy.referenceTime}</span>
        <ActionButton variant="download" icon="↓" onClick={onDownload} disabled={posts.length === 0}>{copy.download}</ActionButton>
      </div>
    </div>
  </section>;
}
