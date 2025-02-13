import useSWR from "swr";
import { fetcher } from "../fetcher";
import { TodoType } from "@/schema";
import useSWRMutation from "swr/mutation";
import { delay } from "@/utils/delay";

const delayTime = 500;

const createTodo = async (url: string, { arg }: { arg: { title: string } }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: arg.title }),
  });
  const data = await res.json();
  await delay(delayTime);
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

const updateTodo = async (url: string, { arg }: { arg: TodoType }) => {
  const { id, title, completed } = arg;
  const requestBody = JSON.stringify({
    title: title,
    completed: completed === 1, // api側からnumberとして返ってくるが、リクエストの際はbooleanで送る
  });
  const res = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  });
  const data = await res.json();
  await delay(delayTime);
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

const deleteTodo = async (
  url: string,
  { arg }: { arg: Pick<TodoType, "id"> }
) => {
  const { id } = arg;
  const res = await fetch(`${url}/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  await delay(delayTime);
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

/**
 * Todoリストを取得、作成、更新、削除するためのカスタムフックです。
 * @returns {
 *   todos - Todoリストのデータ。
 *   todosError - Todoリスト取得時のエラー。
 *   todosIsValidating - Todoリスト取得中かどうかのフラグ。
 *   triggerCreate - Todoを作成するための関数。
 *   isCreating - Todoを作成中かどうかのフラグ。
 *   triggerUpdate - Todoを更新するための関数。
 *   isUpdating - Todoを更新中かどうかのフラグ。
 *   triggerDelete - Todoを削除するための関数。
 *   isDeleting - Todoを削除中かどうかのフラグ。
 *  }
 *
 */
export const useTodos = () => {
  const url = "/api/todos";
  const { data, error, isValidating } = useSWR<TodoType[]>(url, fetcher);
  const { trigger: triggerCreate, isMutating: isCreating } = useSWRMutation(
    url,
    createTodo
  );
  const { trigger: triggerUpdate, isMutating: isUpdating } = useSWRMutation(
    url,
    updateTodo
  );
  const { trigger: triggerDelete, isMutating: isDeleting } = useSWRMutation(
    url,
    deleteTodo
  );

  return {
    todos: data,
    todosError: error,
    todosIsValidating: isValidating,
    triggerCreate,
    isCreating,
    triggerUpdate,
    isUpdating,
    triggerDelete,
    isDeleting,
  };
};
