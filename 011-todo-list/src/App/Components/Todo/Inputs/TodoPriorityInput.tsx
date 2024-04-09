import { TodoPriority } from "@components/Todo";
import "./Inputs.css";

interface TodoPriorityInputProps {
  priority: TodoPriority;
  onPriorityChange: (priority: TodoPriority) => void;
}

export function TodoPriorityInput({
  priority,
  onPriorityChange,
}: TodoPriorityInputProps) {
  return (
    <select
      value={priority}
      onChange={(event) => onPriorityChange(event.target.value)}
      className="todo-priority"
    >
      <option value="high">High</option>
      <option value="normal">Normal</option>
      <option value="low">Low</option>
    </select>
  );
}
