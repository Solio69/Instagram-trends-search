import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./ActionButton.module.scss";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  variant?: "primary" | "download" | "text";
  wide?: boolean;
};

export function ActionButton({
  children,
  icon,
  iconPosition = "start",
  variant = "primary",
  wide = false,
  type = "button",
  className = "",
  ...buttonProps
}: ActionButtonProps) {
  const classes = [styles["action-button"], styles[`action-button--${variant}`], wide ? styles["action-button--wide"] : "", className]
    .filter(Boolean)
    .join(" ");

  const iconNode = icon && <span className={styles["action-button__icon"]} aria-hidden="true">{icon}</span>;
  return <button type={type} className={classes} {...buttonProps}>{iconPosition === "start" && iconNode}{children}{iconPosition === "end" && iconNode}</button>;
}
