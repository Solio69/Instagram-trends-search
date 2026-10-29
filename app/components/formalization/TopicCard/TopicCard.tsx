import type { FormalizationTopic } from "../../../constants/demo";
import styles from "./TopicCard.module.scss";

type TopicCardProps = { topic: FormalizationTopic };

function renderTerm(term: string) {
  return <span className={styles["topic-card__term"]} key={term}>{term}</span>;
}

export function TopicCard({ topic }: TopicCardProps) {
  return <div className={styles["topic-card"]}>
    <h4 className={styles["topic-card__title"]}>{topic.name}</h4>
    <div className={styles["topic-card__terms"]}>{topic.terms.map(renderTerm)}</div>
  </div>;
}
