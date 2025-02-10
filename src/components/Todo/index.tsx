import { useDialog } from "@/hooks/useDialog";
import styles from "./styles.module.scss";
import { Dialog } from "../Dialog";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Toast } from "../Toast";
import type { TodoType } from "@/schema";
import { useTodos } from "@/hooks/useTodos";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { TextInput } from "../TextInput";
import { Spinner } from "../Spinner";

export const Todo = ({ id, title, completed }: TodoType) => {
  const [titleState, setTitleState] = useState(title);
  const [toastMessage, setToastMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { dialogRef, showDialog, closeDialog } = useDialog();
  const { toastRef, showToast } = useToast();
  const { todos, triggerUpdate, triggerDelete, isUpdating, isDeleting } =
    useTodos();
  const isDisabledClickSubmit = useMemo(
    () => titleState === "" || isUpdating,
    [titleState, isUpdating]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await triggerUpdate(
        { id, title: titleState, completed: completed },
        {
          optimisticData: todos?.map((todo) =>
            todo.id === id ? { ...todo, title: titleState } : todo
          ),
        }
      );
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
      await triggerUpdate(
        { id, title, completed: newCompleted },
        {
          optimisticData: todos?.map((todo) =>
            todo.id === id ? { ...todo, completed: newCompleted } : todo
          ),
        }
      );
      setToastMessage("タスクを更新しました");
      showToast();
    } catch (error) {
      setToastMessage("タスクの更新に失敗しました");
      showToast();
    }
  };

  const handleClickDelete = async () => {
    try {
      await triggerDelete({ id });
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
        <Checkbox
          className={styles.checkbox}
          checked={completed === 1}
          defaultChecked={completed === 1}
          onChange={handleChangeCompleted}
        />
        <span className={styles.title}>{title}</span>
        <div className={styles.buttons}>
          <Button className={styles.button} onClick={showDialog}>
            編集
          </Button>
          <Button
            className={styles.button}
            onClick={handleClickDelete}
            disabled={isDeleting}
          >
            削除
          </Button>
        </div>
      </div>
      <Dialog title="編集" ref={dialogRef} onClose={closeDialog}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="title">タイトル</label>
          <TextInput
            id="title"
            value={titleState}
            onChange={handleChangeTitle}
          />
          {errorMessage && <p>{errorMessage}</p>}
          <div className={styles.spinnerWrapper}></div>
          <div className={styles.buttons}>
            <Button type="button" onClick={handleCandel}>
              キャンセル
            </Button>
            <Button
              type="submit"
              // disabled={true}
              disabled={isDisabledClickSubmit}
              className={styles.submit}
            >
              {isUpdating ? (
                <div>
                  <Spinner isShow={isUpdating} label="更新中..." />
                </div>
              ) : (
                "更新"
              )}
            </Button>
          </div>
        </form>
      </Dialog>
      <Toast ref={toastRef} message={toastMessage} />
    </>
  );
};
