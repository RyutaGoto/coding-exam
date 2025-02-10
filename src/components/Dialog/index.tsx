import { forwardRef, ReactNode } from "react";
import styles from "./styles.module.scss";

type DialogProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

// react19への移行に伴い、forwardRefを廃止して修正する必要がある
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
