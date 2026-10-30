import { BRAND } from "../../../constants/brand";
import { FOOTER_COPY } from "./constants";
import styles from "./SiteFooter.module.scss";

const { first, second } = BRAND;
const { note } = FOOTER_COPY;

export function SiteFooter() {
  return (
    <footer className={styles["site-footer"]}>
      <strong className={styles["site-footer__brand"]}>
        {first}
        <span>{second}</span>
      </strong>
      <p className={styles["site-footer__note"]}>{note}</p>
    </footer>
  );
}
