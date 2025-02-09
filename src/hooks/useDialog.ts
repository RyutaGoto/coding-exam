import { useCallback, useRef } from "react";

export const useDialog = () => {
  const ref = useRef<HTMLDialogElement>(null);

  const showDialog = useCallback(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, []);

  const closeDialog = useCallback(() => {
    if (ref.current) {
      ref.current.close();
    }
  }, []);

  return { ref, showDialog, closeDialog };
};
