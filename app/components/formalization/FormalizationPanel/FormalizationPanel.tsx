import { DEMO_FORMALIZATION, type FormalizationTopic } from "../../../constants/demo";
import type { ContentFilter } from "../../../lib/results";
import { SummaryItem } from "../SummaryItem";
import { TopicCard } from "../TopicCard";
import { FORMALIZATION_COPY as copy } from "./constants";
import styles from "./FormalizationPanel.module.scss";

type FormalizationPanelProps = { contentFilter: ContentFilter };
type SummaryRow = { key: string; label: string; value: string };

function renderSummaryItem({ key, label, value }: SummaryRow) {
  return <SummaryItem key={key} label={label} value={value} />;
}

function renderTopicCard(topic: FormalizationTopic) {
  return <TopicCard key={topic.name} topic={topic} />;
}

export function FormalizationPanel({ contentFilter }: FormalizationPanelProps) {
  const format = contentFilter === "reel" ? copy.reels : contentFilter === "post" ? copy.posts : DEMO_FORMALIZATION.contentTypes.join(" · ");
  const summaryItems: SummaryRow[] = [
    { key: "intent", label: copy.intent, value: DEMO_FORMALIZATION.intent },
    { key: "languages", label: copy.languages, value: DEMO_FORMALIZATION.languages.join(" + ") },
    { key: "format", label: copy.format, value: format },
  ];

  return <section className={styles["formalization-panel"]} aria-labelledby="formalization-title">
    <div className={styles["formalization-panel__top"]}>
      <div><p className={styles["formalization-panel__eyebrow"]}>{copy.eyebrow}</p><h3 className={styles["formalization-panel__title"]} id="formalization-title">{copy.title}</h3></div>
      <span className={styles["formalization-panel__badge"]}>{copy.badge}</span>
    </div>
    <p className={styles["formalization-panel__sample"]}>{copy.samplePrefix} «{DEMO_FORMALIZATION.exampleInput}»</p>
    <div className={styles["formalization-panel__summary"]}>
      {summaryItems.map(renderSummaryItem)}
    </div>
    <div className={styles["formalization-panel__topics"]}>{DEMO_FORMALIZATION.topics.map(renderTopicCard)}</div>
  </section>;
}
