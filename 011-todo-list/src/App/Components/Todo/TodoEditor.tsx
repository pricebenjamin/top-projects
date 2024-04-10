import { Todo } from "@components/Todo";
import { TodoPriorityInput, TodoDueDateInput } from "./Inputs";
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
      <div className="sticky">
        <textarea
          className="title"
          value={title}
          autoComplete="off"
          onChange={(event) => {
            onTodoEdit(id, { title: event.target.value });
          }}
        ></textarea>
        <textarea
          className="description"
          value={description}
          autoComplete="off"
          onChange={(event) => {
            onTodoEdit(id, { description: event.target.value });
          }}
        ></textarea>
        <TodoDueDateInput
          dueDate={dueDate}
          onChange={(dueDate) => onTodoEdit(id, { dueDate })}
        />
        <TodoPriorityInput
          priority={priority}
          onChange={(priority) => onTodoEdit(id, { priority })}
        />
        <p>Status: {finished ? "finished" : "in progress"}</p>
        <button onClick={onTodoClose}>Close</button>
      </div>
    </div>
  );
}
