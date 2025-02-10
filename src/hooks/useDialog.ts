import { useCallback, useRef } from "react";

/**
 * useDialogは、Dialogコンポーネントを使用するためのhooksです。
 *
 * @example
 * const { dialogRef, showDialog, closeDialog } = useDialog();
 *
 * return (
 *   <Dialog ref={dialogRef}>
 *     <p>This is a dialog!</p>
 *     <button onClick={closeDialog}>Close</button>
 *   </Dialog>
 * );
 */
export const useDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const showDialog = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  const closeDialog = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, []);

  return { dialogRef, showDialog, closeDialog };
};
