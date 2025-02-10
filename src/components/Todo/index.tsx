import { useDialog } from "@/hooks/useDialog";
import styles from "./styles.module.scss";
import { Dialog } from "../Dialog";
import useSWRMutation from "swr/mutation";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Toast } from "../Toast";

type TodoProps = {
  id: number;
  title: string;
  completed: number;
};

const updateTodo = async (
  url: string,
  { arg }: { arg: { id: number; title: string; completed: boolean } }
) => {
  const { id, title, completed } = arg;
  try {
    await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, completed: completed }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const Todo = ({ id, title, completed }: TodoProps) => {
  const [titleState, setTitleState] = useState(title);
  const [toastMessage, setToastMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { dialogRef, showDialog, closeDialog } = useDialog();
  const { toastRef, showToast } = useToast();
  const { trigger, isMutating } = useSWRMutation(`api/todos`, updateTodo);
  const isDisabledClickSubmit = useMemo(
    () => title === "" || isMutating,
    [title, isMutating]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await trigger({ id, title: titleState, completed: completed === 1 });
      setToastMessage("タスクを作成しました");
      showToast();
      closeDialog();
    } catch (error) {
      setErrorMessage("タスクの作成に失敗しました");
      showToast();
    }
  };

  const handleCandel = () => {
    closeDialog();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleState(event.target.value);
  };

  return (
    <>
      <div className={styles.todo}>
        <input
          className={styles.checkbox}
          type="checkbox"
          defaultChecked={completed === 1}
        />
        <span className={styles.title}>{title}</span>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={showDialog}>
            編集
          </button>
          <button className={styles.button}>削除</button>
        </div>
      </div>
      <Dialog title="編集" ref={dialogRef} onClose={closeDialog}>
        {isMutating && <p>更新中...</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            value={titleState}
            onChange={handleChange}
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
