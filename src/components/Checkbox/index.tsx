import { ComponentProps } from "react";
import styles from "./styles.module.scss";

type CheckboxProps = ComponentProps<"input">;

/**
 * Checkboxコンポーネントは、通常の<input type="checkbox">タグと同様にプロパティを受け取ることができます。
 *
 * このコンポーネントは、標準のHTMLチェックボックスの全てのプロパティをサポートし、追加のCSSクラスを適用するためのclassNameプロパティも受け取ります。
 *
 * @param className - チェックボックスに適用する追加のCSSクラス名。
 * @param props - その他のHTMLチェックボックスプロパティ。
 *
 * @example
 * <Checkbox id="checkbox" name="checkbox" />
 */
export const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <input
      {...props}
      type="checkbox"
      className={`${styles.checkbox} ${className}`}
    />
  );
};
