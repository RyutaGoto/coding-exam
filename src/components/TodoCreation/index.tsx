import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import { notifications } from "@mantine/notifications";
import { Button, Flex, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

/**
 * TodoCreationコンポーネントは、新しいタスクの作成を行うためのUIコンポーネントです。
 *
 * @remarks
 * このコンポーネントでは以下の機能が提供されます:
 * - 新規タスクの作成: テキスト入力欄にタスクのタイトルを入力、更新ボタンによって新しいタスクを作成します。
 * - エラーメッセージ表示: 作成失敗時にエラーメッセージを表示します。
 */
export const TodoCreation = () => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const { triggerCreate, isCreating } = useTodos();
  const isDisabledClickSubmit = title === "" || isCreating;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await triggerCreate({ title });
      notifications.show({ message: "タスクを作成しました" });
      setTitle("");
      closeModal();
    } catch (error) {
      setErrorMessage("タスクの作成に失敗しました");
    } finally {
    }
  };

  const handleCancel = () => {
    setTitle("");
    closeModal();
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <Button onClick={openModal}>新規作成</Button>
      <Modal opened={isModalOpen} onClose={closeModal} title="新規作成">
        <LoadingOverlay visible={isCreating} />
        <form onSubmit={handleSubmit}>
          <TextInput
            label="タイトル"
            value={title}
            onChange={handleTitleChange}
          />
          <Flex gap={8} justify="end" mt={24}>
            <Button type="button" onClick={handleCancel} variant="outline">
              キャンセル
            </Button>
            <Button type="submit" disabled={isDisabledClickSubmit}>
              作成
            </Button>
          </Flex>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </Modal>
    </>
  );
};
