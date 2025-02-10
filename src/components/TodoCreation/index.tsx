import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import { notifications } from "@mantine/notifications";
import { Button, Flex, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export const TodoCreation = () => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [visible, { open: openLoader, close: closeLoader }] =
    useDisclosure(false);
  const { triggerCreate, isCreating } = useTodos();
  const isDisabledClickSubmit = useMemo(
    () => title === "" || isCreating,
    [title, isCreating]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      openLoader();
      await triggerCreate({ title });
      notifications.show({ message: "タスクを作成しました" });
      setTitle("");
      closeModal();
    } catch (error) {
      setErrorMessage("タスクの作成に失敗しました");
    } finally {
      closeLoader();
    }
  };

  const handleCancel = () => {
    setTitle("");
    closeModal();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <Button onClick={openModal}>新規作成</Button>
      <Modal opened={opened} onClose={closeModal} title="新規作成">
        <LoadingOverlay visible={visible} />
        <form onSubmit={handleSubmit}>
          <TextInput label="タイトル" value={title} onChange={handleChange} />
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
      </Modal>{" "}
    </>
  );
};
