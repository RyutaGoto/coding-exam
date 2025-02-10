import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import type { TodoType } from "@/schema";
import { useTodos } from "@/hooks/useTodos";
import { Button, Checkbox, Flex, Grid } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { TodoEditModal } from "../TodoEditModal";
import { useTodoItem } from "@/hooks/useTodoItem";

/**
 * TodoItemコンポーネントは、タスクの表示、編集、完了状態の切り替え、削除を行うUIコンポーネントです。
 *
 * @remarks
 * このコンポーネントでは以下の機能が提供されます:
 * - タスクの完了状態の切り替え: チェックボックスによるトグルで完了/未完了状態を更新します。
 * - タスクの編集: モーダルを使用してタイトルを編集し、更新ボタンによってタスクの情報を更新します。
 * - エラーメッセージ表示: 更新失敗時にエラーメッセージを表示します。
 * - タスクの削除: 削除ボタンを使用してタスクの削除を行い、結果を通知します。
 *
 * @param props
 * @param {number} props.id - タスクの一意な識別子です。
 * @param {string} props.title - タスクのタイトルを表す文字列です。
 * @param {number} props.completed - タスクの完了状態を示します。1は完了、0は未完了を表します。
 *
 * @example
 * // TodoItemコンポーネントの基本的な使用例
 * <TodoItem id={1} title="買い物に行く" completed={0} />
 */
export const TodoItem = ({ id, title, completed }: TodoType) => {
  const {
    titleState,
    errorMessage,
    isModalOpen,
    openModal,
    handleSubmit,
    handleClickCancel,
    handleChangeTitle,
    handleChangeCompleted,
    handleClickDelete,
    isUpdating,
    isDeleting,
  } = useTodoItem({ id, title, completed });

  return (
    <>
      <Grid>
        <Grid.Col span={8}>
          <Flex gap={8}>
            <Checkbox
              checked={completed === 1}
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
      <TodoEditModal
        title={titleState}
        isOpen={isModalOpen}
        isUpdating={isUpdating}
        errorMessage={errorMessage}
        handleChangeTitle={handleChangeTitle}
        handleSubmit={handleSubmit}
        handleClickCancel={handleClickCancel}
      />
    </>
  );
};
