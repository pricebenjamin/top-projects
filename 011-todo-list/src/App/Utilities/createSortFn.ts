import { Todo } from "@interfaces/Todo";
import { SortSpec } from "@interfaces/SortSpec";

export function createSortFn(sort: SortSpec) {
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
