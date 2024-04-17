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
        // convert unix timestamp (milliseconds) to local time string
        dueDate === undefined ? "" : moment(dueDate).format("YYYY-MM-DDTHH:mm")
      }
      onChange={(event) => {
        const timestamp =
          event.target.value === ""
            ? undefined
            : // convert local time string to unix timestamp (milliseconds)
              moment(event.target.value).valueOf();
        onChange(timestamp);
      }}
    />
  );
}
