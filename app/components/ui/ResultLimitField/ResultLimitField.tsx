import { RESULT_LIMIT_COPY } from "./constants";
import styles from "./ResultLimitField.module.scss";

type ResultLimitFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onCommit: () => void;
};

export function ResultLimitField({ value, onChange, onCommit }: ResultLimitFieldProps) {
  return <label className={styles["result-limit"]} htmlFor="result-limit">
    <span className={styles["result-limit__title"]}>{RESULT_LIMIT_COPY.label}</span>
    <span className={styles["result-limit__field"]}>
      <input
        id="result-limit"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onFocus={(event) => event.currentTarget.select()}
        onChange={(event) => { if (/^\d*$/.test(event.target.value)) onChange(event.target.value); }}
        onBlur={onCommit}
        aria-describedby="limit-hint"
        className={styles["result-limit__input"]}
      />
      <span className={styles["result-limit__max"]} aria-hidden="true">{RESULT_LIMIT_COPY.max}</span>
    </span>
    <span className={styles["result-limit__hint"]} id="limit-hint">{RESULT_LIMIT_COPY.hint}</span>
  </label>;
}
