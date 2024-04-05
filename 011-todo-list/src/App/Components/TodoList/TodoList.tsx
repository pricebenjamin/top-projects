import moment from "moment";
import { Todo } from "@components/Todo";
import "./TodoList.css";

interface TodoListProps {
  todos: Todo[];
  onTodoEdit: (id: string, changes: Partial<Todo>) => void;
}

export function TodoList({ todos, onTodoEdit }: TodoListProps) {
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
            {todos.map((todo) => (
              <TodoListRow key={todo.id} {...todo} onTodoEdit={onTodoEdit} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

interface TodoListRowProps extends Todo {
  onTodoEdit: (id: string, changes: Partial<Todo>) => void;
}

function TodoListRow({
  id,
  title,
  dueDate,
  priority,
  finished,
  onTodoEdit,
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
    </tr>
  );
}
