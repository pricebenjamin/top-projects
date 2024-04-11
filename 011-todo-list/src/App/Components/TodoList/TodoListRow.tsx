import moment from "moment";
import { Todo } from "@components/Todo";
import { TodoPriorityInput } from "@components/TodoInputs";
import trashIcon from "@icons/trash-can-outline.svg";

interface TodoListRowProps extends Todo {
  active: boolean;
  onTodoEdit: (id: string, changes: Partial<Todo>) => void;
  onTodoDelete: (id: string) => void;
  onRowClick: (id: string) => void;
}

export function TodoListRow({
  id,
  title,
  dueDate,
  priority,
  finished,
  active,
  onTodoEdit,
  onTodoDelete,
  onRowClick,
}: TodoListRowProps) {
  return (
    <tr
      onClickCapture={() => onRowClick(id)}
      className={active ? "active" : ""}
    >
      <td className="todo-status">
        <input
          type="checkbox"
          onClick={() => onTodoEdit(id, { finished: !finished })}
          defaultChecked={finished}
        />
      </td>
      <td className="todo-title">
        <input
          type="text"
          value={title}
          onChange={(event) => onTodoEdit(id, { title: event.target.value })}
        />
      </td>
      <td className="todo-due">{dueDate && moment(dueDate).fromNow()}</td>
      <td className="todo-priority">
        <TodoPriorityInput
          priority={priority}
          onChange={(priority) => onTodoEdit(id, { priority })}
        />
      </td>
      <td className="todo-delete" onClick={() => onTodoDelete(id)}>
        <img src={trashIcon} alt="Delete" className="icon" />
      </td>
    </tr>
  );
}
