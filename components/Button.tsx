import { JSX } from "preact";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={props.disabled}
      class="px-2 py-1 rounded border(gray-100 2) hover:bg-gray-200 disabled:bg-gray-200 disabled:pointer-events-none disabled:opacity-60"
    />
  );
}
