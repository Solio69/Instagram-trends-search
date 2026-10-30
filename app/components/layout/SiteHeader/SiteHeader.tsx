import { BRAND } from "../../../constants/brand";
import { ARIA_HIDDEN_PROPS } from "../../../constants/dom";
import { ICONS } from "../../../constants/icons";
import { HEADER_COPY } from "./constants";
import styles from "./SiteHeader.module.scss";

const { first, second } = BRAND;
const { brandAria } = HEADER_COPY;
const { BRAND_MARK } = ICONS;

export function SiteHeader() {
  return (
    <header className={styles["site-header"]}>
      <a
        className={styles["site-header__brand"]}
        href="#top"
        aria-label={brandAria}
      >
        <span className={styles["site-header__mark"]} {...ARIA_HIDDEN_PROPS}>
          {BRAND_MARK}
        </span>
        {first}
        <span className={styles["site-header__accent"]}>{second}</span>
      </a>
    </header>
  );
}
