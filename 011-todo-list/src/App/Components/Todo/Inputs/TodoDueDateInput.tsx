import moment from "moment";
import "./Inputs.css";

interface TodoDueDateInputProps {
  dueDate?: number;
  onChange: (dueDate?: number) => void;
}

export function TodoDueDateInput({ dueDate, onChange }: TodoDueDateInputProps) {
  return (
    <input
      className="todo-due-date"
      type="datetime-local"
      value={
        dueDate === undefined
          ? ""
          : moment(dueDate).utc().format("yyyy-MM-DDTHH:mm")
      }
      onChange={(event) => {
        const timestamp = event.target.valueAsNumber;
        const newDueDate = isNaN(timestamp) ? undefined : timestamp;
        onChange(newDueDate);
      }}
    />
  );
}
