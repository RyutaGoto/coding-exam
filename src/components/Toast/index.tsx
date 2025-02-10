import { forwardRef } from "react";
import styles from "./styles.module.scss";

type ToastProps = {
  message: string;
};

/**
 * Toastコンポーネントは、ユーザーにメッセージを表示するためのコンポーネントです。
 *
 * forwardRefを使用しているため、react19への移行に伴い修正が必要です。(https://ja.react.dev/reference/react/forwardRef)
 *
 * @param message - 表示するメッセージ。
 *
 * @example
 * <Toast message="This is a toast message!" />
 */
export const Toast = forwardRef<HTMLDialogElement, ToastProps>(
  ({ message }, ref) => {
    return (
      <dialog ref={ref} className={styles.toast}>
        <p>{message}</p>
      </dialog>
    );
  }
);
