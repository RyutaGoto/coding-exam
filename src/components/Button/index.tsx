import { ComponentProps } from "react";
import styles from "./styles.module.scss";

type ButtonProps = ComponentProps<"button">;

/**
 * Buttonコンポーネントは、通常の<button>タグと同様にプロパティを受け取ることができます。
 *
 * このコンポーネントは、標準のHTMLボタンの全てのプロパティをサポートし、追加のCSSクラスを適用するためのclassNameプロパティも受け取ります。
 *
 * @param className - ボタンに適用する追加のCSSクラス名。
 * @param children - ボタン内に表示するコンテンツ。
 * @param props - その他のHTMLボタンプロパティ。
 *
 * @example
 * <Button onClick={() => console.log("Clicked!")}>Click Me</Button>
 */
export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
};
