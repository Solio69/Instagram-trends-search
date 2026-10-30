import type { NicheNormalization } from "../../../lib/niche-normalization";
import { CONTENT_FILTER, type ContentFilter } from "../../../lib/results";
import { SummaryItem } from "../SummaryItem";
import { TopicCard } from "../TopicCard";
import { FORMALIZATION_COPY } from "./constants";
import styles from "./FormalizationPanel.module.scss";

type FormalizationPanelProps = {
  contentFilter: ContentFilter;
  input: string;
  data: NicheNormalization;
};

const {
  eyebrow,
  title,
  badge,
  samplePrefix,
  intent,
  format: formatLabel,
  allFormats,
  reels,
  posts,
} = FORMALIZATION_COPY;
const FORMAT_BY_FILTER: Record<ContentFilter, string> = {
  [CONTENT_FILTER.ALL]: allFormats,
  [CONTENT_FILTER.REEL]: reels,
  [CONTENT_FILTER.POST]: posts,
};

export function FormalizationPanel({
  contentFilter,
  input,
  data,
}: FormalizationPanelProps) {
  const { intent: normalizedIntent, topics } = data;
  const format = FORMAT_BY_FILTER[contentFilter];

  function renderTopic(topic: (typeof topics)[number]) {
    return <TopicCard key={topic.name} topic={topic} />;
  }

  return (
    <section
      className={styles["formalization-panel"]}
      aria-labelledby="formalization-title"
    >
      <div className={styles["formalization-panel__top"]}>
        <div>
          <p className={styles["formalization-panel__eyebrow"]}>{eyebrow}</p>
          <h3
            className={styles["formalization-panel__title"]}
            id="formalization-title"
          >
            {title}
          </h3>
        </div>
        <span className={styles["formalization-panel__badge"]}>{badge}</span>
      </div>
      <p className={styles["formalization-panel__sample"]}>
        {samplePrefix} «{input}»
      </p>
      <div className={styles["formalization-panel__summary"]}>
        <SummaryItem label={intent} value={normalizedIntent} />
        <SummaryItem label={formatLabel} value={format} />
      </div>
      <div className={styles["formalization-panel__topics"]}>
        {topics.map(renderTopic)}
      </div>
    </section>
  );
}
