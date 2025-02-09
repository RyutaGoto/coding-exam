import { useCallback, useRef } from "react";

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
