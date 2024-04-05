import moment from "moment";
import { Todo } from "@components/Todo";
import "./TodoList.css";

interface TodoListProps {
  todos: Todo[];
  onTodoStatusChange: (id: string) => void;
}

export function TodoList({ todos, onTodoStatusChange }: TodoListProps) {
  function renderDate(timestamp: number | null) {
    if (timestamp === null) {
      return "Not set";
    }
    return moment(timestamp).fromNow();
  }

  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <div className="is-empty">Nothing to do...</div>
      ) : (
        <table>
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
            {todos.map(({ id, title, dueDate, priority, finished }) => (
              <tr key={id}>
                <td className="todo-status">
                  <input
                    type="checkbox"
                    onChange={() => onTodoStatusChange(id)}
                    checked={finished}
                  />
                </td>
                <td>{title}</td>
                <td>{dueDate && renderDate(dueDate)}</td>
                <td>{priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
