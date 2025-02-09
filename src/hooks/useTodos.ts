import useSWR from "swr";
import { fetcher } from "../fetcher";
import { Todo } from "@/schema";

export const useTodos = () => {
  const url = "api/todos";
  const { data, error, isLoading, isValidating, mutate } = useSWR<Todo[]>(
    url,
    fetcher
  );
  return {
    todos: data,
    todosError: error,
    todosIsLoading: isLoading,
    todosIsValidating: isValidating,
    mutateTodos: mutate,
  };
};
