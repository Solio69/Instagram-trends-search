import {
  ARIA_HIDDEN_PROPS,
  ARIA_LIVE_POLITE_PROPS,
  ROLE_PROPS,
} from "../../../constants/dom";
import { LOADING_COPY, LOADING_STAGE } from "./constants";
import styles from "./LoadingStatus.module.scss";

type LoadingStatusProps = {
  stage: (typeof LOADING_STAGE)[keyof typeof LOADING_STAGE];
};

export function LoadingStatus({ stage }: LoadingStatusProps) {
  return (
    <div
      className={styles["loading-status"]}
      {...ROLE_PROPS.STATUS}
      {...ARIA_LIVE_POLITE_PROPS}
    >
      <span
        className={styles["loading-status__spinner"]}
        {...ARIA_HIDDEN_PROPS}
      />
      {LOADING_COPY[stage]}
    </div>
  );
}
