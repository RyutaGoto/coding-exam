import { useDialog } from "@/hooks/useDialog";
import styles from "./styles.module.scss";
import { Dialog } from "../Dialog";
import useSWRMutation from "swr/mutation";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Toast } from "../Toast";
import type { TodoType } from "@/schema";

const updateTodo = async (url: string, { arg }: { arg: TodoType }) => {
  const { id, title, completed } = arg;
  const requestBody = JSON.stringify({
    title: title,
    completed: completed === 1, // api側からnumberとして返ってくるが、リクエストの際はbooleanで送る
  });
  const res = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

const deleteTodo = async (url: string, { arg }: { arg: TodoType }) => {
  const { id } = arg;
  const res = await fetch(`${url}/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const Todo = ({ id, title, completed }: TodoType) => {
  const [titleState, setTitleState] = useState(title);
  const [toastMessage, setToastMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { dialogRef, showDialog, closeDialog } = useDialog();
  const { toastRef, showToast } = useToast();

  const { trigger: triggerUpdate, isMutating: isUpdating } = useSWRMutation(
    `api/todos`,
    updateTodo,
    {}
  );
  const { trigger: triggerDelete, isMutating: isDeleting } = useSWRMutation(
    `api/todos`,
    deleteTodo,
    {}
  );
  const isDisabledClickSubmit = useMemo(
    () => title === "" || isUpdating,
    [title, isUpdating]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await triggerUpdate({ id, title: titleState, completed: completed });
      setToastMessage("タスクを作成しました");
      showToast();
      closeDialog();
    } catch (error) {
      setErrorMessage("タスクの作成に失敗しました");
    }
  };

  const handleCandel = () => {
    closeDialog();
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleState(event.target.value);
  };

  const handleChangeCompleted = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    // 0(false) or 1(true)をトグルする
    const newCompleted = completed === 1 ? 0 : 1;
    try {
      await triggerUpdate({ id, title, completed: newCompleted });
      setToastMessage("タスクを更新しました");
      showToast();
    } catch (error) {
      setToastMessage("タスクの更新に失敗しました");
      showToast();
    }
  };

  const handleClickDelete = async () => {
    try {
      await triggerDelete({ id, title, completed });
      setToastMessage("タスクを削除しました");
      showToast();
    } catch (error) {
      setToastMessage("タスクの削除に失敗しました");
      showToast();
    }
  };

  return (
    <>
      <div className={styles.todo}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={completed === 1}
          defaultChecked={completed === 1}
          onChange={handleChangeCompleted}
        />
        <span className={styles.title}>{title}</span>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={showDialog}>
            編集
          </button>
          <button
            className={styles.button}
            onClick={handleClickDelete}
            disabled={isDeleting}
          >
            削除
          </button>
        </div>
      </div>
      <Dialog title="編集" ref={dialogRef} onClose={closeDialog}>
        {isUpdating && <p>更新中...</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            value={titleState}
            onChange={handleChangeTitle}
          />
          <button type="button" onClick={handleCandel}>
            キャンセル
          </button>
          <button type="submit" disabled={isDisabledClickSubmit}>
            更新
          </button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </Dialog>
      <Toast ref={toastRef} message={toastMessage} />
    </>
  );
};
