import { Button, Flex, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import { useTodoCreation } from "./hooks";

/**
 * TodoCreationコンポーネントは、新しいタスクの作成を行うためのUIコンポーネントです。
 *
 * @remarks
 * このコンポーネントでは以下の機能が提供されます:
 * - 新規タスクの作成: テキスト入力欄にタスクのタイトルを入力、更新ボタンによって新しいタスクを作成します。
 * - エラーメッセージ表示: 作成失敗時にエラーメッセージを表示します。
 */
export const TodoCreation = () => {
  const {
    title,
    errorMessage,
    isModalOpen,
    isCreating,
    openModal,
    closeModal,
    handleTitleChange,
    handleSubmit,
    handleClickCancel,
  } = useTodoCreation();

  const isDisabledClickSubmit = title === "" || isCreating;

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
            <Button type="button" onClick={handleClickCancel} variant="outline">
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
