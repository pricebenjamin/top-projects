import type { TodoPriority } from "@app/Types/TodoPriority";
import "./Inputs.css";

interface TodoPriorityInputProps {
  priority: TodoPriority;
  onChange: (priority: TodoPriority) => void;
}

export function TodoPriorityInput({
  priority,
  onChange,
}: TodoPriorityInputProps) {
  return (
    <select
      value={priority}
      onChange={(event) => onChange(event.target.value)}
      className="todo-priority"
    >
      <option value="high">High</option>
      <option value="normal">Normal</option>
      <option value="low">Low</option>
    </select>
  );
}
