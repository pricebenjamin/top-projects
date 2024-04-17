import type { SortableTodoAttribute } from "@app/Types/SortableTodoAttribute";

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
