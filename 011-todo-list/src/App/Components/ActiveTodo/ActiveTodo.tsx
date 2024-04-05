import { Todo } from "@components/Todo";
import "./ActiveTodo.css";

interface ActiveTodoProps {
  todo: Todo;
}

export function ActiveTodo({ todo }: ActiveTodoProps) {
  return (
    <div className={"card active-todo" + (todo.finished ? " finished" : "")}>
      <h2 className="title">{todo.title}</h2>
      <p>{todo.description}</p>
      <p className="priority">Priority: {todo.priority}</p>
      {todo.dueDate && (
        <p className="due-date">
          Due: {new Date(todo.dueDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
