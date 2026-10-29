import styles from "./SegmentedControl.module.scss";

type SegmentValue = string | number;
type SegmentOption<T extends SegmentValue> = { value: T; label: string };
type SegmentedControlProps<T extends SegmentValue> = {
  legend: string;
  options: ReadonlyArray<SegmentOption<T>>;
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends SegmentValue>({ legend, options, value, onChange }: SegmentedControlProps<T>) {
  function renderOption(option: SegmentOption<T>) {
    const isSelected = value === option.value;

    return <button
      key={String(option.value)}
      type="button"
      className={[styles["segmented-control__option"], isSelected && styles["segmented-control__option--selected"]].filter(Boolean).join(" ")}
      aria-pressed={isSelected}
      onClick={() => onChange(option.value)}
    >{option.label}</button>;
  }

  return <fieldset className={styles["segmented-control"]}>
    <legend className={styles["segmented-control__legend"]}>{legend}</legend>
    <div className={styles["segmented-control__options"]}>
      {options.map(renderOption)}
    </div>
  </fieldset>;
}
