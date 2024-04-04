import moment from "moment";
import { Project } from "@components/Project";
import "./TodoList.css";

interface TodoListProps {
  project?: Project;
  onTodoStatusChange: (index: number) => void;
}

export function TodoList({ project, onTodoStatusChange }: TodoListProps) {
  const todos = project?.todos;

  function renderDate(timestamp: number | null) {
    if (timestamp === null) {
      return "Not set";
    }
    return moment(timestamp).fromNow();
  }

  return (
    <div className="todo-list">
      {todos === undefined || todos.length === 0 ? (
        <div className="is-empty">Nothing to do...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Due</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((t, idx) => (
              <tr key={idx}>
                <td className="todo-status">
                  <input
                    type="checkbox"
                    onChange={() => onTodoStatusChange(idx)}
                    checked={t.finished}
                  />
                </td>
                <td>{t.title}</td>
                <td>{renderDate(t.dueDate)}</td>
                <td>{t.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
