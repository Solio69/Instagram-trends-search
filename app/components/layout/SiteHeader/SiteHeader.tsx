import { BRAND } from "../../../constants/brand";
import { HEADER_COPY } from "./constants";
import styles from "./SiteHeader.module.scss";

export function SiteHeader() {
  return <header className={styles["site-header"]}>
    <a className={styles["site-header__brand"]} href="#top" aria-label={HEADER_COPY.brandAria}>
      <span className={styles["site-header__mark"]} aria-hidden="true">✳</span>{BRAND.first}<span className={styles["site-header__accent"]}>{BRAND.second}</span>
    </a>
  </header>;
}
