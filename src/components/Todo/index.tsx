import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import type { TodoType } from "@/schema";
import { useTodos } from "@/hooks/useTodos";
import {
  Button,
  Checkbox,
  Flex,
  Grid,
  LoadingOverlay,
  Modal,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

export const Todo = ({ id, title, completed }: TodoType) => {
  const [titleState, setTitleState] = useState(title);
  const [errorMessage, setErrorMessage] = useState("");
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [visible, { open: openLoader, close: closeLoader }] =
    useDisclosure(false);
  const { todos, triggerUpdate, triggerDelete, isUpdating, isDeleting } =
    useTodos();
  const isDisabledClickSubmit = useMemo(
    () => titleState === "" || isUpdating,
    [titleState, isUpdating]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      openLoader();
      await triggerUpdate(
        { id, title: titleState, completed: completed },
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
    } finally {
      closeLoader();
    }
  };

  const handleCancel = () => {
    closeModal();
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

  return (
    <>
      <Grid>
        <Grid.Col span={8}>
          <Flex gap={8}>
            <Checkbox
              checked={completed === 1}
              defaultChecked={completed === 1}
              onChange={handleChangeCompleted}
              mt={4}
            />
            <span>{title}</span>
          </Flex>
        </Grid.Col>
        <Grid.Col span={4}>
          <Flex gap={6} justify="end">
            <Button size="compact-sm" onClick={openModal} variant="outline">
              編集
            </Button>
            <Button
              size="compact-sm"
              onClick={handleClickDelete}
              disabled={isDeleting}
              variant="outline"
            >
              削除
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
      <Modal opened={opened} onClose={closeModal} title="編集">
        <LoadingOverlay visible={visible} />
        <form onSubmit={handleSubmit}>
          <TextInput
            label="タイトル"
            value={titleState}
            onChange={handleChangeTitle}
          />
          <Flex gap={8} justify="end" mt={24}>
            <Button type="button" onClick={handleCancel} variant="outline">
              キャンセル
            </Button>
            <Button type="submit" disabled={isDisabledClickSubmit}>
              更新
            </Button>
          </Flex>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </Modal>
    </>
  );
};
