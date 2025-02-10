import useSWR from "swr";
import { fetcher } from "../fetcher";
import { TodoType } from "@/schema";

export const useTodos = () => {
  const url = "api/todos";
  const { data, error, isLoading, isValidating, mutate } = useSWR<TodoType[]>(
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
