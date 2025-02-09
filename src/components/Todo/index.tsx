type TodoProps = {
  id: number;
  title: string;
  completed: number;
};

export const Todo = ({ id, title, completed }: TodoProps) => {
  return (
    <div>
      <input type="checkbox" checked={completed === 1} />
      <span>{title}</span>
      <button>編集</button>
      <button>削除</button>
    </div>
  );
};
