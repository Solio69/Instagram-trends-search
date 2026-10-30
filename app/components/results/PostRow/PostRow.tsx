import type { DemoPost } from "../../../constants/demo";
import { ARIA_HIDDEN_PROPS } from "../../../constants/dom";
import { ICONS } from "../../../constants/icons";
import { EXTERNAL_LINK_PROPS } from "../../../constants/links";
import {
  NUMERIC_METRICS,
  POST_FORMAT_LABELS,
} from "../../../constants/options";
import { EMPTY_STRING, SPACE } from "../../../constants/text";
import { formatDate, numberFormat } from "../../../lib/format";
import { POST_CONTENT_TYPE, type SortMetric } from "../../../lib/results";
import {
  DISCOVERY_TYPE,
  MATCHED_TERM_SEPARATOR,
  POST_ROW_COPY,
} from "./constants";
import styles from "./PostRow.module.scss";

type PostRowProps = { post: DemoPost; index: number; sortBy: SortMetric };
type NumericMetric = (typeof NUMERIC_METRICS)[number];

const { hashtag, keyword } = POST_ROW_COPY;
const { EXTERNAL_ARROW } = ICONS;
const DISCOVERY_LABEL_BY_TYPE: Record<string, string> = {
  [DISCOVERY_TYPE.HASHTAG]: hashtag,
  [DISCOVERY_TYPE.KEYWORD]: keyword,
};
const FORMAT_MODIFIER_BY_CONTENT_TYPE: Record<string, string> = {
  [POST_CONTENT_TYPE.CAROUSEL]: styles["post-row__format--carousel"],
  [POST_CONTENT_TYPE.IMAGE]: styles["post-row__format--image"],
};

function renderNumericCell(
  post: DemoPost,
  metric: NumericMetric,
  sortBy: SortMetric,
) {
  const className = [
    styles["post-row__numeric"],
    sortBy === metric && styles["post-row__numeric--emphasized"],
  ]
    .filter(Boolean)
    .join(SPACE);

  return (
    <td key={metric} className={className}>
      {numberFormat.format(post[metric])}
    </td>
  );
}

export function PostRow({ post, index, sortBy }: PostRowProps) {
  const {
    url,
    caption,
    username,
    contentType,
    publishedAt,
    matchedTerms,
    discoveryType,
  } = post;
  const formatModifier =
    FORMAT_MODIFIER_BY_CONTENT_TYPE[contentType] ?? EMPTY_STRING;
  const discoveryLabel = DISCOVERY_LABEL_BY_TYPE[discoveryType] ?? keyword;
  const matchedTermsLabel = matchedTerms.join(MATCHED_TERM_SEPARATOR);

  return (
    <tr className={styles["post-row"]}>
      <td className={styles["post-row__index"]}>{index + 1}</td>
      <td className={styles["post-row__post"]}>
        <a
          className={styles["post-row__link"]}
          href={url}
          {...EXTERNAL_LINK_PROPS}
        >
          <span className={styles["post-row__caption"]}>{caption}</span>
          <span className={styles["post-row__arrow"]} {...ARIA_HIDDEN_PROPS}>
            {EXTERNAL_ARROW}
          </span>
        </a>
        <span className={styles["post-row__author"]}>@{username}</span>
      </td>
      <td>
        <span className={`${styles["post-row__format"]} ${formatModifier}`}>
          {POST_FORMAT_LABELS[contentType] ?? contentType}
        </span>
      </td>
      <td className={styles["post-row__date"]}>{formatDate(publishedAt)}</td>
      <td>
        <div className={styles["post-row__match"]}>
          <span className={styles["post-row__matched-term"]}>
            {matchedTermsLabel}
          </span>
          <span className={styles["post-row__discovery"]}>
            {discoveryLabel}
          </span>
        </div>
      </td>
      {NUMERIC_METRICS.map((metric) => renderNumericCell(post, metric, sortBy))}
    </tr>
  );
}
