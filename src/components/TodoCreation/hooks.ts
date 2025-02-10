import { useState, ChangeEvent, FormEvent } from "react";
import { useTodos } from "@/hooks/useTodos";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

type UseTodoCreationReturn = {
  title: string;
  errorMessage: string;
  isModalOpen: boolean;
  isCreating: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleClickCancel: () => void;
};

export const useTodoCreation = (): UseTodoCreationReturn => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const { triggerCreate, isCreating } = useTodos();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await triggerCreate({ title });
      notifications.show({ message: "タスクを作成しました" });
      setTitle("");
      closeModal();
    } catch (error) {
      setErrorMessage("タスクの作成に失敗しました");
    }
  };

  const handleClickCancel = () => {
    setTitle("");
    closeModal();
  };

  return {
    title,
    errorMessage,
    isModalOpen,
    isCreating,
    openModal,
    closeModal,
    handleTitleChange,
    handleSubmit,
    handleClickCancel,
  };
};
