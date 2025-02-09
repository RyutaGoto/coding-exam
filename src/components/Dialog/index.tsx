import { forwardRef, ReactNode, Ref } from "react";
import styles from "./styles.module.scss";

type DialogProps = {
  onClose: () => void;
  children: ReactNode;
};

// react19への移行に伴い、forwardRefを廃止して修正する必要がある
export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ onClose, children }, ref) => {
    return (
      <dialog ref={ref} className={styles.dialog} onClick={onClose}>
        <button onClick={onClose}>閉じる</button>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </dialog>
    );
  }
);
