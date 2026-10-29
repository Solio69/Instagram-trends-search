import type { DemoPost } from "../../../constants/demo";
import { METRIC_LABELS, NUMERIC_METRICS } from "../../../constants/options";
import type { SortMetric } from "../../../lib/results";
import { PostRow } from "../PostRow";
import { RESULTS_TABLE_COPY as copy } from "./constants";
import styles from "./ResultsTable.module.scss";

type ResultsTableProps = {
  posts: readonly DemoPost[];
  sortBy: SortMetric;
  onSort: (metric: SortMetric) => void;
};

function renderSortHeader(metric: SortMetric, label: string, sortBy: SortMetric, onSort: ResultsTableProps["onSort"]) {
  const isActive = sortBy === metric;
  const isDate = metric === "publishedAt";
  const className = [styles["results-table__sort"], isDate && styles["results-table__sort--date"], isActive && styles["results-table__sort--active"]]
    .filter(Boolean)
    .join(" ");
  const ariaLabel = isDate ? copy.dateSortAria : `${copy.metricSortAria} «${label}» по убыванию`;

  return <th scope="col" className={isDate ? undefined : styles["results-table__numeric"]} key={metric} aria-sort={isActive ? "descending" : "none"}>
    <button type="button" className={className} onClick={() => onSort(metric)} aria-label={ariaLabel}>
      {label} <span aria-hidden="true">{isActive ? "↓" : "↕"}</span>
    </button>
  </th>;
}

function renderPostRow(post: DemoPost, index: number, sortBy: SortMetric) {
  return <PostRow key={post.url} post={post} index={index} sortBy={sortBy} />;
}

export function ResultsTable({ posts, sortBy, onSort }: ResultsTableProps) {
  return <div className={styles["results-table__scroll"]} role="region" aria-label={copy.region} tabIndex={0}>
    <table className={styles["results-table"]}>
      <thead><tr>
        <th scope="col" className={styles["results-table__index"]}>{copy.index}</th>
        <th scope="col" className={styles["results-table__post"]}>{copy.post}</th>
        <th scope="col">{copy.format}</th>
        {renderSortHeader("publishedAt", copy.date, sortBy, onSort)}
        <th scope="col">{copy.match}</th>
        {NUMERIC_METRICS.map((metric) => renderSortHeader(metric, METRIC_LABELS[metric], sortBy, onSort))}
      </tr></thead>
      <tbody>
        {posts.map((post, index) => renderPostRow(post, index, sortBy))}
        {posts.length === 0 && <tr><td className={styles["results-table__empty"]} colSpan={8}>{copy.empty}</td></tr>}
      </tbody>
    </table>
  </div>;
}
