import { ComponentProps } from "react";
import styles from "./styles.module.scss";

type TextInput = ComponentProps<"input">;

/**
 * TextInputコンポーネントは、通常の<input type="text">タグと同様にプロパティを受け取ることができます。
 *
 * このコンポーネントは、標準のHTMLテキスト入力の全てのプロパティをサポートし、追加のCSSクラスを適用するためのclassNameプロパティも受け取ります。
 *
 * @param className - テキスト入力に適用する追加のCSSクラス名。
 * @param props - その他のHTMLテキスト入力プロパティ。
 *
 * @example
 * <TextInput placeholder="Enter your name" />
 */
export const TextInput = ({ className, ...props }: TextInput) => {
  return (
    <input type="text" className={`${styles.input} ${className}`} {...props} />
  );
};
