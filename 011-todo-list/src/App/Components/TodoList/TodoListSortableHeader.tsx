import { Todo } from "@components/Todo";

export type SortableTodoAttribute = "title" | "dueDate" | "priority";

export interface SortSpec {
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

interface TodoListSortableHeaderProps {
  text: string;
  attribute: SortableTodoAttribute;
  sort?: SortSpec;
  colSpan?: number;
  onChange: (sort: SortSpec | undefined) => void;
}

export function TodoListSortableHeader({
  text,
  attribute,
  sort,
  colSpan,
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
    <th
      className="sortable"
      onClick={() => toggleSort(attribute)}
      colSpan={colSpan ?? 1}
    >
      {text}&nbsp;{sort?.attribute === attribute && sortIndicator}
    </th>
  );
}
