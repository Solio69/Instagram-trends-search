import type { NicheTopic } from "../../../lib/niche-normalization";
import styles from "./TopicCard.module.scss";

type TopicCardProps = { topic: NicheTopic };

export function TopicCard({ topic }: TopicCardProps) {
  const { name, terms } = topic;

  function renderTerm(term: string) {
    return (
      <span className={styles["topic-card__term"]} key={term}>
        {term}
      </span>
    );
  }

  return (
    <div className={styles["topic-card"]}>
      <h4 className={styles["topic-card__title"]}>{name}</h4>
      <div className={styles["topic-card__terms"]}>
        {terms.map(renderTerm)}
      </div>
    </div>
  );
}
