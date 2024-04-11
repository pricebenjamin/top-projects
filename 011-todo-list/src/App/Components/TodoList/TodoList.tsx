import moment from "moment";
import { useState } from "react";
import { Todo } from "@components/Todo";
import { TodoPriorityInput } from "@components/TodoInputs";
import "./TodoList.css";
import trashIcon from "@icons/trash-can-outline.svg";

interface TodoListProps {
  title: string;
  todos: Todo[];
  activeTodoId?: string;
  onTodoEdit: (id: string, changes: Partial<Todo>) => void;
  onTodoDelete: (id: string) => void;
  onSetActiveTodo: (id: string) => void;
}

export function TodoList({
  title,
  todos,
  activeTodoId,
  onTodoEdit,
  onTodoDelete,
  onSetActiveTodo,
}: TodoListProps) {
  const [sort, setSort] = useState<SortSpec>();

  const sortedTodos =
    sort === undefined ? todos : [...todos].sort(createSortFn(sort));

  return (
    todos.length > 0 && (
      <div className="todo-list">
        <h2 className="title">{title}</h2>
        <div className="card">
          <table>
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
                <TodoListSortableHeader
                  text="Title"
                  attribute="title"
                  sort={sort}
                  onChange={setSort}
                />
                <TodoListSortableHeader
                  text="Due"
                  attribute="dueDate"
                  sort={sort}
                  onChange={setSort}
                />
                <TodoListSortableHeader
                  text="Priority"
                  attribute="priority"
                  sort={sort}
                  onChange={setSort}
                />
                <th>{/* delete */}</th>
              </tr>
            </thead>

            <tbody>
              {sortedTodos.map((todo, idx) => (
                <TodoListRow
                  key={todo.id}
                  {...todo}
                  active={todo.id === activeTodoId}
                  onTodoEdit={onTodoEdit}
                  onTodoDelete={(id: string) => {
                    // set adjacent todo as active, if possible
                    const prevTodo = sortedTodos[idx - 1]?.id;
                    const nextTodo = sortedTodos[idx + 1]?.id;

                    if (nextTodo) onSetActiveTodo(nextTodo);
                    else if (prevTodo) onSetActiveTodo(prevTodo);

                    onTodoDelete(id);
                  }}
                  onRowClick={onSetActiveTodo}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}

type SortableTodoAttribute = "title" | "dueDate" | "priority";

interface SortSpec {
  attribute: SortableTodoAttribute;
  direction: "normal" | "reverse";
  // Note(ben): Why not use "ascending" | "descending"?
  //
  // When I click to sort by "dueDate", I would expect soonest
  // dates first (similar to "ascending"). However, when I click
  // to sort by priority, I would expect highest priority first
  // (similar to "descending").
  //
  // "normal" and "reverse" allow each attribute to be opinionated
  // about the initial sort order.
}

function createSortFn(sort: SortSpec) {
  function compare(a: Todo, b: Todo) {
    // when sorting by due date, undefined should always be last
    const last = sort.direction === "normal" ? Infinity : -Infinity;
    const dueA = a.dueDate ?? last;
    const dueB = b.dueDate ?? last;

    switch (sort.attribute) {
      case "title":
        // normal behavior: A-Z
        return a.title.localeCompare(b.title);
      case "dueDate":
        // normal behavior: earlier dates first
        if (dueA === dueB) return 0;
        return dueA > dueB ? 1 : -1;
      case "priority":
        // normal behavior: higher priority first
        if (a.priority === b.priority) return 0;
        return a.priority === "high" || b.priority === "low" ? -1 : 1;
    }
  }

  return (a: Todo, b: Todo) => {
    const result = compare(a, b);
    return sort.direction === "normal" ? result : -result;
  };
}

interface TodoListSortableHeaderProps {
  text: string;
  attribute: SortableTodoAttribute;
  sort?: SortSpec;
  onChange: (sort: SortSpec | undefined) => void;
}

function TodoListSortableHeader({
  text,
  attribute,
  sort,
  onChange,
}: TodoListSortableHeaderProps) {
  function toggleSort(attribute: SortableTodoAttribute) {
    // toggle order: off -> normal -> reverse -> off
    if (!sort || sort.attribute !== attribute) {
      onChange({
        attribute,
        direction: "normal",
      });
    } else if (sort.direction === "normal") {
      onChange({
        attribute,
        direction: "reverse",
      });
    } else {
      onChange(undefined);
    }
  }

  const sortIndicator =
    sort === undefined ? "" : sort.direction === "normal" ? "↑" : "↓";

  return (
    <th className="sortable" onClick={() => toggleSort(attribute)}>
      {text}&nbsp;{sort?.attribute === attribute && sortIndicator}
    </th>
  );
}

interface TodoListRowProps extends Todo {
  active: boolean;
  onTodoEdit: (id: string, changes: Partial<Todo>) => void;
  onTodoDelete: (id: string) => void;
  onRowClick: (id: string) => void;
}

function TodoListRow({
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
      <td>
        <input
          type="text"
          value={title}
          onChange={(event) => onTodoEdit(id, { title: event.target.value })}
        />
      </td>
      <td>{dueDate && moment(dueDate).fromNow()}</td>
      <td>
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
