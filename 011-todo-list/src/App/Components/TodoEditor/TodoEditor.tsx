import { Todo } from "@interfaces/Todo";
import { TodoPriorityInput, TodoDueDateInput } from "@components/TodoInputs";
import "./TodoEditor.css";

interface TodoEditorProps extends Todo {
  onTodoEdit: (id: string, changes: Partial<Todo>) => void;
  onTodoClose: () => void;
}

export function TodoEditor({
  id,
  title,
  description,
  dueDate,
  priority,
  finished,
  onTodoEdit,
  onTodoClose,
}: TodoEditorProps) {
  return (
    <div className="todo-editor">
      <textarea
        className="title"
        value={title}
        autoComplete="off"
        onChange={(event) => {
          onTodoEdit(id, { title: event.target.value });
        }}
      />
      <textarea
        className="description"
        value={description}
        placeholder="Add a description..."
        autoComplete="off"
        onChange={(event) => {
          onTodoEdit(id, { description: event.target.value });
        }}
      />
      <div className="flex-wrap">
        <div className="input-row">
          <label>Due: </label>
          <TodoDueDateInput
            dueDate={dueDate}
            onChange={(dueDate) => onTodoEdit(id, { dueDate })}
          />
        </div>
        <div className="input-row">
          <label>Priority: </label>
          <TodoPriorityInput
            priority={priority}
            onChange={(priority) => onTodoEdit(id, { priority })}
          />
        </div>
      </div>
      <div className="flex-wrap buttons">
        <button onClick={() => onTodoEdit(id, { finished: !finished })}>
          Mark as {finished ? "In Progress" : "Complete"}
        </button>
        <button onClick={onTodoClose}>Close</button>
      </div>
    </div>
  );
}
