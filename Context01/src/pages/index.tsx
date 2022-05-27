import type { NextPage } from "next";
import { Dispatch, SetStateAction, useState } from "react";
import { Todo } from "src/types";

type Props = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

// ジェネリクス
const Home: NextPage<Props> = ({ todos, setTodos }) => {
  const toggleIsDone = (id: Todo["id"]) => {
    console.log(id);
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
          // isDone以外はそのまま渡す
        }
        return todo;
      });
    });
  };
  return (
    <div>
      <h3>TODO一覧</h3>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <label style={{ fontSize: "2rem" }}>
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => toggleIsDone(todo.id)}
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
              {todo.text}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
