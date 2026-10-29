import { BRAND } from "../../../constants/brand";
import { FOOTER_COPY } from "./constants";
import styles from "./SiteFooter.module.scss";

export function SiteFooter() {
  return <footer className={styles["site-footer"]}>
    <strong className={styles["site-footer__brand"]}>{BRAND.first}<span>{BRAND.second}</span></strong>
    <p className={styles["site-footer__note"]}>{FOOTER_COPY.note}</p>
  </footer>;
}
