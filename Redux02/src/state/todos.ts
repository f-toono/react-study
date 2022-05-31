import { Reducer } from "redux";
import { Todo } from "src/types";

// const
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

// action
export const addTodo = (text: Todo["text"]) => {
  return {
    type: ADD_TODO, // どんなアクションか識別するために使う
    payload: { text }, // 何か情報を渡したいときに使う
  } as const;
};
export const toggleTodo = (id: Todo["id"]) => {
  return {
    type: TOGGLE_TODO, // どんなアクションか識別するために使う
    payload: { id }, // 何か情報を渡したいときに使う
  } as const;
};

type Action = ReturnType<typeof addTodo | typeof toggleTodo>;
// string リテラルタイプ

// initial state
const TODOS: Todo[] = [
  { id: 1, text: "foo", isDone: false },
  { id: 2, text: "bar", isDone: true },
];

// reducer
export const todosReducer: Reducer<Todo[], Action> = (
  state = TODOS,
  action
) => {
  switch (action.type) {
    case ADD_TODO: {
      const newTodo = {
        id: state.length + 1,
        text: action.payload.text,
        isDone: false,
      };
      return [...state, newTodo];
    }
    case TOGGLE_TODO: {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, isDone: !todo.isDone };
          // isDone以外はそのまま渡す
        }
        return todo;
      });
    }
    default: {
      return state;
    }
  }
};
