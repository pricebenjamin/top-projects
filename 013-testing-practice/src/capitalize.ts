export function capitalize(text: string) {
  const firstLetter = text.charAt(0);
  return firstLetter.toUpperCase() + text.slice(1);
}
