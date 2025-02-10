import { useDialog } from "@/hooks/useDialog";
import { Dialog } from "../Dialog";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Toast } from "../Toast";
import { useTodos } from "@/hooks/useTodos";
import styles from "./styles.module.scss";
import { Button } from "../Button";
import { TextInput } from "../TextInput";
import { Spinner } from "../Spinner";

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
      <Button onClick={showDialog} className={styles.create}>
        新規作成
      </Button>
      <Dialog title="新規作成" ref={dialogRef} onClose={closeDialog}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="title">タイトル</label>
          <TextInput
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
          />
          <div className={styles.buttons}>
            <Button
              type="button"
              onClick={handleCandel}
              className={styles.cancel}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              disabled={isDisabledClickSubmit}
              className={styles.submit}
            >
              {isCreating ? (
                <div>
                  <Spinner isShow={isCreating} label="作成中..." />
                </div>
              ) : (
                "作成"
              )}
            </Button>
          </div>
        </form>
      </Dialog>
      <Toast ref={toastRef} message={toastMessage} />
    </>
  );
};
