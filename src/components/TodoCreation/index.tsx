import { useDialog } from "@/hooks/useDialog";
import { Dialog } from "../Dialog";
import { useTodos } from "@/hooks/useTodos";
import { FormEvent } from "react";

export const TodoCreation = () => {
  const { todosIsValidating, mutateTodos } = useTodos();
  const { ref, showDialog, closeDialog } = useDialog();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title") as string;

    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    mutateTodos();
  };
  return (
    <>
      <button onClick={showDialog}>新規作成</button>
      <Dialog title="新規作成" ref={ref} onClose={closeDialog}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">タスク名</label>
          <input type="text" id="title" name="title" />
          <button type="button" onClick={closeDialog}>
            キャンセル
          </button>
          <button type="submit">作成</button>
        </form>
      </Dialog>
    </>
  );
};
