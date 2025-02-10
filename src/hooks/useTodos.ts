import useSWR from "swr";
import { fetcher } from "../fetcher";
import { TodoType } from "@/schema";
import useSWRMutation from "swr/mutation";

const createTodo = async (url: string, { arg }: { arg: { title: string } }) => {
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: arg.title }),
    });
  } catch (error) {
    console.error(error);
  }
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
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

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
