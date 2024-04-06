import moment from "moment";
import { Todo } from "@components/Todo";
import "./TodoList.css";
import trashIcon from "@icons/trash-can-outline.svg";

interface TodoListProps {
  title: string;
  todos: Todo[];
  onTodoEdit: (id: string, changes: Partial<Todo>) => void;
  onTodoDelete: (id: string) => void;
}

export function TodoList({
  title,
  todos,
  onTodoEdit,
  onTodoDelete,
}: TodoListProps) {
  return (
    todos.length > 0 && (
      <div className="todo-list">
        <table>
          <caption>{title}</caption>
          <colgroup>
            <col span={1} className="status" />
            <col span={1} className="title" />
            <col span={1} className="due-date" />
            <col span={1} className="priority" />
            <col span={1} className="delete" />
          </colgroup>

          <thead>
            <tr>
              <th>{/* status */}</th>
              <th>Title</th>
              <th>Due</th>
              <th>Priority</th>
              <th>{/* delete */}</th>
            </tr>
          </thead>

          <tbody>
            {todos.map((todo) => (
              <TodoListRow
                key={todo.id}
                {...todo}
                onTodoEdit={onTodoEdit}
                onTodoDelete={onTodoDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}

interface TodoListRowProps extends Todo {
  onTodoEdit: (id: string, changes: Partial<Todo>) => void;
  onTodoDelete: (id: string) => void;
}

function TodoListRow({
  id,
  title,
  dueDate,
  priority,
  finished,
  onTodoEdit,
  onTodoDelete,
}: TodoListRowProps) {
  function renderDate(timestamp: number | null) {
    if (timestamp === null) {
      return "Not set";
    }
    return moment(timestamp).fromNow();
  }

  return (
    <tr>
      <td className="todo-status">
        <input
          type="checkbox"
          onChange={() => onTodoEdit(id, { finished: !finished })}
          checked={finished}
        />
      </td>
      <td>
        <input
          type="text"
          value={title}
          onChange={(event) => onTodoEdit(id, { title: event.target.value })}
        />
      </td>
      <td>{dueDate && renderDate(dueDate)}</td>
      <td>{priority}</td>
      <td className="todo-delete" onClick={() => onTodoDelete(id)}>
        <img src={trashIcon} alt="Delete" className="icon" />
      </td>
    </tr>
  );
}
