import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ARIA_HIDDEN_PROPS, BUTTON_TYPE } from "../../../constants/dom";
import { EMPTY_STRING, SPACE } from "../../../constants/text";
import styles from "./ActionButton.module.scss";
import { BUTTON_ICON_POSITION, BUTTON_VARIANT } from "./constants";

const { START, END } = BUTTON_ICON_POSITION;
const { PRIMARY } = BUTTON_VARIANT;
const { BUTTON } = BUTTON_TYPE;

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: (typeof BUTTON_ICON_POSITION)[keyof typeof BUTTON_ICON_POSITION];
  variant?: (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];
  wide?: boolean;
};

export function ActionButton({
  children,
  icon,
  iconPosition = START,
  variant = PRIMARY,
  wide = false,
  type = BUTTON,
  className = EMPTY_STRING,
  ...buttonProps
}: ActionButtonProps) {
  const classes = [
    styles["action-button"],
    styles[`action-button--${variant}`],
    wide ? styles["action-button--wide"] : EMPTY_STRING,
    className,
  ]
    .filter(Boolean)
    .join(SPACE);

  const iconNode = icon && (
    <span className={styles["action-button__icon"]} {...ARIA_HIDDEN_PROPS}>
      {icon}
    </span>
  );
  return (
    <button type={type} className={classes} {...buttonProps}>
      {iconPosition === START && iconNode}
      {children}
      {iconPosition === END && iconNode}
    </button>
  );
}
