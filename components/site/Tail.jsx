// Binds an inline icon to the last word, so a wrapping line never leaves the icon alone below it.
export default function Tail({ text, children }) {
  const i = text.lastIndexOf(' ') + 1;
  return <>{text.slice(0, i)}<span className="whitespace-nowrap">{text.slice(i)}{children}</span></>;
}
