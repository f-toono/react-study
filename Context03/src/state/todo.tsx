import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Todo } from "src/types";

const TODOS: Todo[] = [
  { id: 1, text: "foo", isDone: false },
  { id: 2, text: "bar", isDone: true },
];

export const TodosContext = createContext(TODOS);

export const TodosDispatchContext = createContext<{
  toggleIsDone: (id: Todo["id"]) => void;
  addTodo: (text: Todo["text"]) => void;
}>({
  toggleIsDone: () => {
    throw Error("no default value!");
  },
  addTodo: () => {
    throw Error("no default value!");
  },
});

export const TodosProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(TODOS);

  const toggleIsDone = useCallback((id: Todo["id"]) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
          // isDone以外はそのまま渡す
        }
        return todo;
      });
    });
  }, []);

  const addTodo = useCallback((text: Todo["text"]) => {
    setTodos((prevTodos) => {
      const newTodo = { id: prevTodos.length + 1, text, isDone: false };
      return [...prevTodos, newTodo];
      // 配列の後ろに追加
    });
  }, []);

  const todosDispatchValue = useMemo(() => {
    return {
      toggleIsDone,
      addTodo,
    };
  }, [toggleIsDone, addTodo]);

  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={todosDispatchValue}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};

export const useTodosDispatch = () => {
  return useContext(TodosDispatchContext);
};
