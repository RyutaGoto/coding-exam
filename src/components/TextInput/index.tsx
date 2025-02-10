import { ComponentProps } from "react";
import styles from "./styles.module.scss";

type TextInput = ComponentProps<"input">;

export const TextInput = ({ className, ...props }: TextInput) => {
  return (
    <input type="text" className={`${styles.input} ${className}`} {...props} />
  );
};
