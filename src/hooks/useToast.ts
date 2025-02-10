import { useCallback, useRef } from "react";

/**
 * useToastは、Toastコンポーネントを使用するためのhooksです。
 *
 * @example
 * const { toastRef, showToast } = useToast();
 *
 * return (
 *   <Toast ref={toastRef}>
 *     <p>This is a toast!</p>
 *   </Toast>
 * );
 */
export const useToast = () => {
  const toastRef = useRef<HTMLDialogElement>(null);
  const duration = 1500;

  const showToast = useCallback(() => {
    if (toastRef.current) {
      toastRef.current.showModal();
      setTimeout(() => {
        toastRef.current?.close();
      }, duration);
    }
  }, []);

  return { toastRef, showToast };
};
