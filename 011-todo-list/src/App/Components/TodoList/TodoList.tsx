import moment from "moment";
import { useState } from "react";
import { Todo } from "@components/Todo";
import "./TodoList.css";

interface TodoListProps {
  todos: Todo[];
  activeTodo?: Todo;
  onTodoSelect: (todo: Todo) => void;
}

export function TodoList({ todos, activeTodo, onTodoSelect }: TodoListProps) {
  return (
    <div className="todo-list">
      {todos && todos.length > 0 ? (
        <table className="card">
          <colgroup>
            <col span={1} className="status" />
            <col span={1} className="title" />
            <col span={1} className="due-date" />
            <col span={1} className="priority" />
          </colgroup>

          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Due</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>
            {todos.map((todo) => (
              <TodoListItem
                key={todo.id}
                todo={todo}
                isActive={todo.id === activeTodo?.id}
                onClick={() => onTodoSelect(todo)}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="is-empty">Nothing to do...</div>
      )}
    </div>
  );
}

interface TodoListItemProps {
  todo: Todo;
  isActive: boolean;
  onClick: () => void;
}

function TodoListItem({ todo, isActive, onClick }: TodoListItemProps) {
  const [status, setStatus] = useState(todo.finished);

  function toggleStatus(event: React.MouseEvent) {
    event.stopPropagation();
    todo.finished = !todo.finished;
    setStatus(todo.finished);
  }

  function renderDate(timestamp: number | null) {
    if (timestamp === null) {
      return "Not set";
    }
    return moment(timestamp).fromNow();
  }

  return (
    <tr onClick={onClick} className={isActive ? "active" : ""}>
      <td className="todo-status" onClick={toggleStatus}>
        <input type="checkbox" checked={status} readOnly />
      </td>
      <td>{todo.title}</td>
      <td>{renderDate(todo.dueDate)}</td>
      <td>{todo.priority}</td>
    </tr>
  );
}
