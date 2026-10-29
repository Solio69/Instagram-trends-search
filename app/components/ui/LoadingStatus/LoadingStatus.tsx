import { LOADING_COPY } from "./constants";
import styles from "./LoadingStatus.module.scss";

type LoadingStatusProps = { stage: "breakdown" | "posts" };

export function LoadingStatus({ stage }: LoadingStatusProps) {
  return <div className={styles["loading-status"]} role="status" aria-live="polite">
    <span className={styles["loading-status__spinner"]} aria-hidden="true" />
    {LOADING_COPY[stage]}
  </div>;
}
