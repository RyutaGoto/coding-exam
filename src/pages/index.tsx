import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useTodos } from "@/hooks/useTodos";
import { Todo } from "@/components/Todo";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { todos, todosError, todosIsLoading, todosIsValidating, mutateTodos } =
    useTodos();

  if (todosIsLoading) {
    return <div>Initial Loading...</div>;
  } else if (todosIsValidating) {
    return <div>Refreshing...</div>;
  } else if (todosError) {
    return <div>Failed to fetch todo lists</div>;
  } else if (!todos || todos.length === 0) {
    return <div>No data</div>;
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Todoアプリ</h1>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
        <button>新規作成</button>
      </main>
    </>
  );
}
