import type { Ref } from "react";
import type { DemoPost } from "../../../constants/demo";
import { DEMO_FORMALIZATION, DEMO_SOURCE } from "../../../constants/demo";
import {
  ARIA_HIDDEN_PROPS,
  ARIA_LIVE_POLITE_PROPS,
  ROLE_PROPS,
} from "../../../constants/dom";
import { ICONS } from "../../../constants/icons";
import { EXTERNAL_LINK_PROPS } from "../../../constants/links";
import { PERIOD_DESCRIPTIONS, SORT_LABELS } from "../../../constants/options";
import { SPACE } from "../../../constants/text";
import type { PeriodDays, SortMetric } from "../../../lib/results";
import { ActionButton, BUTTON_VARIANT } from "../../ui/ActionButton";
import { KeywordFilter } from "../KeywordFilter";
import { ResultsTable } from "../ResultsTable";
import { RESULTS_COPY } from "./constants";
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

const {
  eyebrow,
  title,
  subtitle,
  sourceIntro,
  sourceDetail,
  sourceLink,
  tableTitle,
  tableHint,
  sortPrefix,
  scrollHint,
  shown,
  countOf,
  units,
  referenceTime,
  download,
} = RESULTS_COPY;
const { topics } = DEMO_FORMALIZATION;
const { query, runUrl } = DEMO_SOURCE;
const { DOWN_ARROW, INFO } = ICONS;

export function ResultsSection({
  posts,
  totalCount,
  periodDays,
  sortBy,
  selectedKeywords,
  onSort,
  onKeywordToggle,
  onKeywordClear,
  onDownload,
  sectionRef,
}: ResultsSectionProps) {
  const visibleCount = posts.length;

  return (
    <section
      className={styles["results-section"]}
      ref={sectionRef}
      aria-labelledby="results-title"
    >
      <div className={styles["results-section__heading"]}>
        <div>
          <p className={styles["results-section__eyebrow"]}>{eyebrow}</p>
          <h2 className={styles["results-section__title"]} id="results-title">
            {title}
          </h2>
          <p className={styles["results-section__subtitle"]}>{subtitle}</p>
        </div>
        <span
          className={styles["results-section__count"]}
          {...ARIA_LIVE_POLITE_PROPS}
        >
          {visibleCount} {countOf} {totalCount}
        </span>
      </div>
      <div className={styles["results-section__notice"]} {...ROLE_PROPS.NOTE}>
        <span
          className={styles["results-section__notice-icon"]}
          {...ARIA_HIDDEN_PROPS}
        >
          {INFO}
        </span>
        <p className={styles["results-section__notice-copy"]}>
          {sourceIntro} <code>{query}</code>. {sourceDetail}
        </p>
        <a
          className={styles["results-section__source-link"]}
          href={runUrl}
          {...EXTERNAL_LINK_PROPS}
        >
          {sourceLink}
        </a>
      </div>
      <div className={styles["results-section__card"]}>
        <div className={styles["results-section__toolbar"]}>
          <div className={styles["results-section__toolbar-copy"]}>
            <strong>{tableTitle}</strong>
            <span>{tableHint}</span>
          </div>
          <span className={styles["results-section__sort-status"]}>
            {sortPrefix} {SORT_LABELS[sortBy]} {DOWN_ARROW}
          </span>
        </div>
        <KeywordFilter
          topics={topics}
          selected={selectedKeywords}
          onToggle={onKeywordToggle}
          onClear={onKeywordClear}
        />
        <p className={styles["results-section__scroll-hint"]}>{scrollHint}</p>
        <ResultsTable posts={posts} sortBy={sortBy} onSort={onSort} />
        <div className={styles["results-section__footer"]}>
          <span>
            {shown} {visibleCount} {units} · {PERIOD_DESCRIPTIONS[periodDays]}
            {SPACE}
            {referenceTime}
          </span>
          <ActionButton
            variant={BUTTON_VARIANT.DOWNLOAD}
            icon={DOWN_ARROW}
            onClick={onDownload}
            disabled={visibleCount === 0}
          >
            {download}
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
