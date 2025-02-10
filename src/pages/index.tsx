import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import { useTodos } from "@/hooks/useTodos";
import { Todo } from "@/components/Todo";
import { TodoCreation } from "@/components/TodoCreation";
import { Spinner } from "@/components/Spinner";

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
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Todoアプリ</h1>
        <div className={styles.todos}>
          {todosError && <p>エラーが発生しました</p>}
          {!todos || (todos.length === 0 && <p>タスクなし</p>)}
          {todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}
        </div>
        <div className={styles.creation}>
          <TodoCreation />
        </div>
        <div className={styles.spinnerWrapper}>
          <Spinner isShow={todosIsValidating} label="Refreshing..." />
        </div>
      </main>
    </>
  );
}
