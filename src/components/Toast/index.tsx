import { forwardRef } from "react";
import styles from "./styles.module.scss";

type ToastProps = {
  message: string;
};

// react19への移行に伴い、forwardRefを廃止して修正する必要がある
export const Toast = forwardRef<HTMLDialogElement, ToastProps>(
  ({ message }, ref) => {
    return (
      <dialog ref={ref} className={styles.toast}>
        <p>{message}</p>
      </dialog>
    );
  }
);
