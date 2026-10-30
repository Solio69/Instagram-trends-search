import type { DemoPost } from "../../../constants/demo";
import {
  ARIA_HIDDEN_PROPS,
  BUTTON_TYPE,
  ROLE_PROPS,
} from "../../../constants/dom";
import { ICONS } from "../../../constants/icons";
import { METRIC_LABELS, NUMERIC_METRICS } from "../../../constants/options";
import { SPACE } from "../../../constants/text";
import { SORT_METRIC, type SortMetric } from "../../../lib/results";
import { PostRow } from "../PostRow";
import {
  RESULTS_TABLE_COPY,
  SORT_ARIA_STATE,
  TABLE_HEADER_SCOPE,
} from "./constants";
import styles from "./ResultsTable.module.scss";

type ResultsTableProps = {
  posts: readonly DemoPost[];
  sortBy: SortMetric;
  onSort: (metric: SortMetric) => void;
};

const {
  region,
  index,
  post,
  format,
  date,
  match,
  dateSortAria,
  metricSortAria,
  sortDescending,
  empty,
} = RESULTS_TABLE_COPY;
const { DESCENDING, NONE } = SORT_ARIA_STATE;
const { DOWN_ARROW, SORT_BOTH } = ICONS;
const { BUTTON } = BUTTON_TYPE;

function renderSortHeader(
  metric: SortMetric,
  label: string,
  sortBy: SortMetric,
  onSort: ResultsTableProps["onSort"],
) {
  const isActive = sortBy === metric;
  const isDate = metric === SORT_METRIC.DATE;
  const className = [
    styles["results-table__sort"],
    isDate && styles["results-table__sort--date"],
    isActive && styles["results-table__sort--active"],
  ]
    .filter(Boolean)
    .join(SPACE);
  const ariaLabel = isDate
    ? dateSortAria
    : `${metricSortAria} «${label}» ${sortDescending}`;

  return (
    <th
      scope={TABLE_HEADER_SCOPE}
      className={isDate ? undefined : styles["results-table__numeric"]}
      key={metric}
      aria-sort={isActive ? DESCENDING : NONE}
    >
      <button
        type={BUTTON}
        className={className}
        onClick={() => onSort(metric)}
        aria-label={ariaLabel}
      >
        {label}
        {SPACE}
        <span {...ARIA_HIDDEN_PROPS}>{isActive ? DOWN_ARROW : SORT_BOTH}</span>
      </button>
    </th>
  );
}

function renderPostRow(post: DemoPost, index: number, sortBy: SortMetric) {
  return <PostRow key={post.url} post={post} index={index} sortBy={sortBy} />;
}

function renderEmptyRow() {
  return (
    <tr>
      <td className={styles["results-table__empty"]} colSpan={8}>
        {empty}
      </td>
    </tr>
  );
}

export function ResultsTable({ posts, sortBy, onSort }: ResultsTableProps) {
  return (
    <div
      className={styles["results-table__scroll"]}
      {...ROLE_PROPS.REGION}
      aria-label={region}
      tabIndex={0}
    >
      <table className={styles["results-table"]}>
        <thead>
          <tr>
            <th
              scope={TABLE_HEADER_SCOPE}
              className={styles["results-table__index"]}
            >
              {index}
            </th>
            <th
              scope={TABLE_HEADER_SCOPE}
              className={styles["results-table__post"]}
            >
              {post}
            </th>
            <th scope={TABLE_HEADER_SCOPE}>{format}</th>
            {renderSortHeader(SORT_METRIC.DATE, date, sortBy, onSort)}
            <th scope={TABLE_HEADER_SCOPE}>{match}</th>
            {NUMERIC_METRICS.map((metric) =>
              renderSortHeader(metric, METRIC_LABELS[metric], sortBy, onSort),
            )}
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => renderPostRow(post, index, sortBy))}
          {posts.length === 0 && renderEmptyRow()}
        </tbody>
      </table>
    </div>
  );
}
