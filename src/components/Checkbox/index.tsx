import { ComponentProps } from "react";
import styles from "./styles.module.scss";

type CheckboxProps = ComponentProps<"input">;

export const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <input
      {...props}
      type="checkbox"
      className={`${styles.checkbox} ${className}`}
    />
  );
};
