import type { FormalizationTopic } from "../../../constants/demo";
import { ARIA_HIDDEN_PROPS, INPUT_TYPE } from "../../../constants/dom";
import { ICONS } from "../../../constants/icons";
import { ActionButton, BUTTON_VARIANT } from "../../ui/ActionButton";
import { KEYWORD_COPY } from "./constants";
import styles from "./KeywordFilter.module.scss";

type KeywordFilterProps = {
  topics: readonly FormalizationTopic[];
  selected: readonly string[];
  onToggle: (term: string) => void;
  onClear: () => void;
};

const { title, all, selected: selectedLabel, hint, clear } = KEYWORD_COPY;
const { DISCLOSURE } = ICONS;
const { CHECKBOX } = INPUT_TYPE;

export function KeywordFilter({
  topics,
  selected,
  onToggle,
  onClear,
}: KeywordFilterProps) {
  const selectedCount = selected.length;

  function renderTerm(term: string) {
    return (
      <label className={styles["keyword-filter__option"]} key={term}>
        <input
          className={styles["keyword-filter__checkbox"]}
          type={CHECKBOX}
          checked={selected.includes(term)}
          onChange={() => onToggle(term)}
        />
        <span>{term}</span>
      </label>
    );
  }

  function renderTopic(topic: FormalizationTopic) {
    const { name, terms } = topic;

    return (
      <fieldset className={styles["keyword-filter__group"]} key={name}>
        <legend className={styles["keyword-filter__group-title"]}>
          {name}
        </legend>
        {terms.map(renderTerm)}
      </fieldset>
    );
  }

  return (
    <div className={styles["keyword-filter"]}>
      <details className={styles["keyword-filter__details"]}>
        <summary className={styles["keyword-filter__summary"]}>
          {title}
          <strong className={styles["keyword-filter__count"]}>
            {selectedCount === 0
              ? all
              : `${selectedLabel}: ${selectedCount}`}
          </strong>
          <span
            className={styles["keyword-filter__arrow"]}
            {...ARIA_HIDDEN_PROPS}
          >
            {DISCLOSURE}
          </span>
        </summary>
        <div className={styles["keyword-filter__content"]}>
          <p className={styles["keyword-filter__hint"]}>{hint}</p>
          <div className={styles["keyword-filter__groups"]}>
            {topics.map(renderTopic)}
          </div>
          {selectedCount > 0 && (
            <ActionButton variant={BUTTON_VARIANT.TEXT} onClick={onClear}>
              {clear}
            </ActionButton>
          )}
        </div>
      </details>
    </div>
  );
}
