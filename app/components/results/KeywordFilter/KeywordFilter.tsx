import type { FormalizationTopic } from "../../../constants/demo";
import { ActionButton } from "../../ui/ActionButton";
import { KEYWORD_COPY as copy } from "./constants";
import styles from "./KeywordFilter.module.scss";

type KeywordFilterProps = {
  topics: readonly FormalizationTopic[];
  selected: readonly string[];
  onToggle: (term: string) => void;
  onClear: () => void;
};

export function KeywordFilter({ topics, selected, onToggle, onClear }: KeywordFilterProps) {
  function renderTerm(term: string) {
    return <label className={styles["keyword-filter__option"]} key={term}>
      <input className={styles["keyword-filter__checkbox"]} type="checkbox" checked={selected.includes(term)} onChange={() => onToggle(term)} />
      <span>{term}</span>
    </label>;
  }

  function renderTopic(topic: FormalizationTopic) {
    return <fieldset className={styles["keyword-filter__group"]} key={topic.name}>
      <legend className={styles["keyword-filter__group-title"]}>{topic.name}</legend>
      {topic.terms.map(renderTerm)}
    </fieldset>;
  }

  return <div className={styles["keyword-filter"]}>
    <details className={styles["keyword-filter__details"]}>
      <summary className={styles["keyword-filter__summary"]}>
        {copy.title}
        <strong className={styles["keyword-filter__count"]}>{selected.length === 0 ? copy.all : `${copy.selected}: ${selected.length}`}</strong>
        <span className={styles["keyword-filter__arrow"]} aria-hidden="true">▾</span>
      </summary>
      <div className={styles["keyword-filter__content"]}>
        <p className={styles["keyword-filter__hint"]}>{copy.hint}</p>
        <div className={styles["keyword-filter__groups"]}>
          {topics.map(renderTopic)}
        </div>
        {selected.length > 0 && <ActionButton variant="text" onClick={onClear}>{copy.clear}</ActionButton>}
      </div>
    </details>
  </div>;
}
