import type { NextPage } from "next";
import { ComponentProps, Dispatch, SetStateAction } from "react";
import { Todo } from "src/types";

type Props = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

const Add: NextPage<Props> = ({ setTodos }) => {
  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    const text = event.currentTarget.text.value;
    setTodos((prevTodos) => {
      const newTodo = { id: prevTodos.length + 1, text, isDone: false };
      return [...prevTodos, newTodo];
      // 配列の後ろに追加
    });
    event.currentTarget.reset();
  };
  return (
    <div>
      <h3>TODO追加</h3>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="text" autoComplete="off" required />
        <button>追加</button>
      </form>
    </div>
  );
};

export default Add;
