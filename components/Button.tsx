import { JSX } from "preact";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={props.disabled}
      class="px-2 py-1 rounded border(gray-100 2) bg(hover:gray-200 hover:dark:gray-500 disabled:gray-200 disabled:dark:gray-500) disabled:pointer-events-none disabled:opacity-60"
    />
  );
}
