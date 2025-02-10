import { forwardRef, ReactNode } from "react";
import styles from "./styles.module.scss";

type DialogProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Dialogコンポーネントは、モーダルダイアログを表示するためのコンポーネントです。
 * forwardRefを使用しているため、react19への移行に伴い修正が必要です。(https://ja.react.dev/reference/react/forwardRef)
 *
 * @param title - ダイアログのタイトル。
 * @param onClose - ダイアログを閉じるためのコールバック関数。
 * @param children - ダイアログ内に表示するコンテンツ。
 *
 * @example
 * <Dialog title="Dialog Title" onClose={() => console.log("Dialog closed!")}>
 *   <p>Dialog content goes here...</p>
 * </Dialog>
 */
export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ title, onClose, children }, ref) => {
    return (
      <dialog ref={ref} className={styles.dialog} onClick={onClose}>
        <h2 className={styles.title}>{title}</h2>
        <div onClick={(e) => e.stopPropagation()} className={styles.content}>
          {children}
        </div>
      </dialog>
    );
  }
);
