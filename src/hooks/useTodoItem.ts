import { useState, ChangeEvent, FormEvent } from "react";
import { useTodos } from "@/hooks/useTodos";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import type { TodoType } from "@/schema";

type UseTodoItemReturn = {
  titleState: string;
  errorMessage: string;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleClickCancel: () => void;
  handleChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChangeCompleted: (
    event: ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  handleClickDelete: () => Promise<void>;
  isUpdating: boolean;
  isDeleting: boolean;
};

export const useTodoItem = ({
  id,
  title,
  completed,
}: TodoType): UseTodoItemReturn => {
  const [titleState, setTitleState] = useState(title);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const { todos, triggerUpdate, triggerDelete, isUpdating, isDeleting } =
    useTodos();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await triggerUpdate(
        { id, title: titleState, completed },
        {
          optimisticData: todos?.map((todo) =>
            todo.id === id ? { ...todo, title: titleState } : todo
          ),
        }
      );
      notifications.show({
        message: "タスクを更新しました",
      });
      closeModal();
    } catch (error) {
      setErrorMessage("タスクの更新に失敗しました");
    }
  };

  const handleClickCancel = () => {
    closeModal();
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleState(event.target.value);
  };

  const handleChangeCompleted = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
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
      notifications.show({
        message: "タスクを更新しました",
      });
    } catch (error) {
      notifications.show({
        message: "タスクの更新に失敗しました",
        color: "red",
      });
    }
  };

  const handleClickDelete = async () => {
    try {
      await triggerDelete({ id });
      notifications.show({
        message: "タスクを削除しました",
      });
    } catch (error) {
      notifications.show({
        message: "タスクの削除に失敗しました",
        color: "red",
      });
    }
  };

  return {
    titleState,
    errorMessage,
    isModalOpen,
    openModal,
    closeModal,
    handleSubmit,
    handleClickCancel,
    handleChangeTitle,
    handleChangeCompleted,
    handleClickDelete,
    isUpdating,
    isDeleting,
  };
};
