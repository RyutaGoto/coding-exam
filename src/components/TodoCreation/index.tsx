import { useDialog } from "@/hooks/useDialog";
import { Dialog } from "../Dialog";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Toast } from "../Toast";
import { useTodos } from "@/hooks/useTodos";

export const TodoCreation = () => {
  const [title, setTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const { dialogRef, showDialog, closeDialog } = useDialog();
  const { toastRef, showToast } = useToast();
  const { triggerCreate, isCreating } = useTodos();
  const isDisabledClickSubmit = useMemo(
    () => title === "" || isCreating,
    [title, isCreating]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await triggerCreate({ title });
      setTitle("");
      setToastMessage("タスクを作成しました");
      showToast();
      closeDialog();
    } catch (error) {
      setToastMessage("タスクの作成に失敗しました");
      showToast();
    }
  };

  const handleCandel = () => {
    setTitle("");
    closeDialog();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <button onClick={showDialog}>新規作成</button>
      <Dialog title="新規作成" ref={dialogRef} onClose={closeDialog}>
        {isCreating && <p>作成中...</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
          />
          <button type="button" onClick={handleCandel}>
            キャンセル
          </button>
          <button type="submit" disabled={isDisabledClickSubmit}>
            作成
          </button>
        </form>
      </Dialog>
      <Toast ref={toastRef} message={toastMessage} />
    </>
  );
};
