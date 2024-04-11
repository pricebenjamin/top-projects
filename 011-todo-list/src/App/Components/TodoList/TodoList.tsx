import { useState } from "react";
import { Todo } from "@components/Todo";
import {
  SortSpec,
  createSortFn,
  TodoListSortableHeader,
} from "./TodoListSortableHeader";
import { TodoListRow } from "./TodoListRow";
import "./TodoList.css";

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
            <thead>
              <tr>
                <TodoListSortableHeader
                  text="Title"
                  attribute="title"
                  sort={sort}
                  colSpan={2}
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
                  colSpan={2}
                  onChange={setSort}
                />
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
