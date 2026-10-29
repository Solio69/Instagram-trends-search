import type { DemoPost } from "../../../constants/demo";
import { NUMERIC_METRICS, POST_FORMAT_LABELS } from "../../../constants/options";
import { formatDate, numberFormat } from "../../../lib/format";
import type { SortMetric } from "../../../lib/results";
import { POST_ROW_COPY as copy } from "./constants";
import styles from "./PostRow.module.scss";

type PostRowProps = { post: DemoPost; index: number; sortBy: SortMetric };
type NumericMetric = (typeof NUMERIC_METRICS)[number];

function renderNumericCell(post: DemoPost, metric: NumericMetric, sortBy: SortMetric) {
  const className = [styles["post-row__numeric"], sortBy === metric && styles["post-row__numeric--emphasized"]]
    .filter(Boolean)
    .join(" ");

  return <td key={metric} className={className}>{numberFormat.format(post[metric])}</td>;
}

export function PostRow({ post, index, sortBy }: PostRowProps) {
  const formatModifier = post.contentType === "carousel" ? styles["post-row__format--carousel"] : post.contentType === "image" ? styles["post-row__format--image"] : "";

  return <tr className={styles["post-row"]}>
    <td className={styles["post-row__index"]}>{index + 1}</td>
    <td className={styles["post-row__post"]}>
      <a className={styles["post-row__link"]} href={post.url} target="_blank" rel="noopener noreferrer"><span className={styles["post-row__caption"]}>{post.caption}</span><span className={styles["post-row__arrow"]} aria-hidden="true">↗</span></a>
      <span className={styles["post-row__author"]}>@{post.username}</span>
    </td>
    <td><span className={`${styles["post-row__format"]} ${formatModifier}`}>{POST_FORMAT_LABELS[post.contentType] ?? post.contentType}</span></td>
    <td className={styles["post-row__date"]}>{formatDate(post.publishedAt)}</td>
    <td><div className={styles["post-row__match"]}><span className={styles["post-row__matched-term"]}>{post.matchedTerms.join(" · ")}</span><span className={styles["post-row__discovery"]}>{post.discoveryType === "hashtag" ? copy.hashtag : copy.keyword}</span></div></td>
    {NUMERIC_METRICS.map((metric) => renderNumericCell(post, metric, sortBy))}
  </tr>;
}
