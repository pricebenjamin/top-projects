import { SortSpec } from "@interfaces/SortSpec";
import type { SortableTodoAttribute } from "@app/Types/SortableTodoAttribute";

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
