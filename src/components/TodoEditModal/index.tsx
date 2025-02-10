import { ChangeEvent, FormEvent } from "react";
import { Modal, TextInput, Button, Flex, LoadingOverlay } from "@mantine/core";

export type TodoEditModalProps = {
  title: string;
  isOpen: boolean;
  isUpdating: boolean;
  errorMessage: string;
  handleChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleClickCancel: () => void;
};

export const TodoEditModal = ({
  title,
  isOpen,
  isUpdating,
  errorMessage,
  handleChangeTitle,
  handleSubmit,
  handleClickCancel,
}: TodoEditModalProps) => {
  const isDisabledClickSubmit = title === "" || isUpdating;
  return (
    <Modal opened={isOpen} onClose={handleClickCancel} title="編集">
      <LoadingOverlay visible={isUpdating} />
      <form onSubmit={handleSubmit}>
        <TextInput
          label="タイトル"
          value={title}
          onChange={handleChangeTitle}
        />
        <Flex gap={8} justify="end" mt={24}>
          <Button type="button" onClick={handleClickCancel} variant="outline">
            キャンセル
          </Button>
          <Button type="submit" disabled={isDisabledClickSubmit}>
            更新
          </Button>
        </Flex>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </Modal>
  );
};
