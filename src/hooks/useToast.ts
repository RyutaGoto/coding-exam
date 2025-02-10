import { useCallback, useRef } from "react";

export const useToast = () => {
  const toastRef = useRef<HTMLDialogElement>(null);

  const showToast = useCallback(() => {
    if (toastRef.current) {
      toastRef.current.showModal();
      setTimeout(() => {
        toastRef.current?.close();
      }, 1500);
    }
  }, []);

  return { toastRef, showToast };
};
