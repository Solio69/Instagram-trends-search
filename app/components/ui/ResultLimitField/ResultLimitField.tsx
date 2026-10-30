import { ARIA_HIDDEN_PROPS, INPUT_TYPE } from "../../../constants/dom";
import { RESULT_LIMIT_COPY } from "./constants";
import styles from "./ResultLimitField.module.scss";

type ResultLimitFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onCommit: () => void;
};

const { label, max, hint } = RESULT_LIMIT_COPY;
const { TEXT } = INPUT_TYPE;
const DIGITS_ONLY_PATTERN = /^\d*$/;

export function ResultLimitField({
  value,
  onChange,
  onCommit,
}: ResultLimitFieldProps) {
  return (
    <label className={styles["result-limit"]} htmlFor="result-limit">
      <span className={styles["result-limit__title"]}>{label}</span>
      <span className={styles["result-limit__field"]}>
        <input
          id="result-limit"
          type={TEXT}
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onFocus={(event) => event.currentTarget.select()}
          onChange={(event) => {
            const { value: nextValue } = event.target;
            if (DIGITS_ONLY_PATTERN.test(nextValue)) onChange(nextValue);
          }}
          onBlur={onCommit}
          aria-describedby="limit-hint"
          className={styles["result-limit__input"]}
        />
        <span className={styles["result-limit__max"]} {...ARIA_HIDDEN_PROPS}>
          {max}
        </span>
      </span>
      <span className={styles["result-limit__hint"]} id="limit-hint">
        {hint}
      </span>
    </label>
  );
}
