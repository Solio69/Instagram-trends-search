import { ARIA_LIVE_POLITE_PROPS } from "../../../constants/dom";
import { limitNicheInput, NICHE_MAX_LENGTH } from "../../../lib/results";
import { NICHE_COPY } from "./constants";
import styles from "./NicheInput.module.scss";

type NicheInputProps = { value: string; onChange: (value: string) => void };

const { label, placeholder, hint } = NICHE_COPY;

export function NicheInput({ value, onChange }: NicheInputProps) {
  return (
    <div className={styles["niche-input"]}>
      <label className={styles["niche-input__label"]} htmlFor="niche">
        {label}
      </label>
      <textarea
        id="niche"
        name="niche"
        maxLength={NICHE_MAX_LENGTH}
        rows={3}
        value={value}
        onChange={(event) => onChange(limitNicheInput(event.target.value))}
        placeholder={placeholder}
        aria-describedby="niche-hint niche-count"
        className={styles["niche-input__field"]}
      />
      <div className={styles["niche-input__meta"]}>
        <span id="niche-hint">{hint}</span>
        <span id="niche-count" {...ARIA_LIVE_POLITE_PROPS}>
          {value.length} / {NICHE_MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
