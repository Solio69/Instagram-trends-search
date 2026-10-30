import styles from "./SummaryItem.module.scss";

type SummaryItemProps = { label: string; value: string };

export function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className={styles["summary-item"]}>
      <span className={styles["summary-item__label"]}>{label}</span>
      <strong className={styles["summary-item__value"]}>{value}</strong>
    </div>
  );
}
