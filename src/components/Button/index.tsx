import { ComponentProps } from "react";
import styles from "./styles.module.scss";

type ButtonProps = ComponentProps<"button">;

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
};
