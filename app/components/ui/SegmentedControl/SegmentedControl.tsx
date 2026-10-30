import { BUTTON_TYPE } from "../../../constants/dom";
import { SPACE } from "../../../constants/text";
import styles from "./SegmentedControl.module.scss";

const { BUTTON } = BUTTON_TYPE;

type SegmentValue = string | number;
type SegmentOption<T extends SegmentValue> = { value: T; label: string };
type SegmentedControlProps<T extends SegmentValue> = {
  legend: string;
  options: ReadonlyArray<SegmentOption<T>>;
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends SegmentValue>({
  legend,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  function renderOption({ value: optionValue, label }: SegmentOption<T>) {
    const isSelected = value === optionValue;

    return (
      <button
        key={String(optionValue)}
        type={BUTTON}
        className={[
          styles["segmented-control__option"],
          isSelected && styles["segmented-control__option--selected"],
        ]
          .filter(Boolean)
          .join(SPACE)}
        aria-pressed={isSelected}
        onClick={() => onChange(optionValue)}
      >
        {label}
      </button>
    );
  }

  return (
    <fieldset className={styles["segmented-control"]}>
      <legend className={styles["segmented-control__legend"]}>{legend}</legend>
      <div className={styles["segmented-control__options"]}>
        {options.map(renderOption)}
      </div>
    </fieldset>
  );
}
