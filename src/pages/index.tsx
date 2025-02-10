import Head from "next/head";
import { Inter } from "next/font/google";
import { useTodos } from "@/hooks/useTodos";
import { Todo } from "@/components/Todo";
import { TodoCreation } from "@/components/TodoCreation";
import { Flex, Loader, Stack } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { todos, todosError, todosIsValidating } = useTodos();

  return (
    <>
      <Head>
        <title>Todoアプリ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Stack
          maw={600}
          mx="auto"
          align="center"
          w="100%"
          justify="center"
          p={16}
        >
          <h1>Todoアプリ</h1>
          <Flex
            w="100%"
            direction="row-reverse"
            justify="space-between"
            align="center"
          >
            <TodoCreation />
            {todosIsValidating && (
              <Flex align="center">
                Refreshing...
                <Loader size={20} />
              </Flex>
            )}
          </Flex>
          <Stack w="100%" my={10} mx="auto">
            {todosError && <p>エラーが発生しました</p>}
            {!todos || (todos.length === 0 && <p>タスクなし</p>)}
            {todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}
          </Stack>
        </Stack>
      </main>
    </>
  );
}
