import type { InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({ className = "", ...props }: CheckboxProps) {
  return (
    <label
      className={`relative inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center ${className}`}
    >
      <input type="checkbox" className="peer sr-only" {...props} />
      <span
        className="h-4 w-4 rounded border border-zinc-300 bg-white transition-colors peer-checked:border-zinc-900 peer-checked:bg-zinc-900 peer-focus-visible:ring-2 peer-focus-visible:ring-zinc-500 peer-focus-visible:ring-offset-1 dark:border-zinc-600 dark:bg-zinc-900 dark:peer-checked:border-zinc-50 dark:peer-checked:bg-zinc-50"
      />
      <svg
        viewBox="0 0 12 12"
        fill="none"
        className="pointer-events-none absolute h-2.5 w-2.5 text-white opacity-0 peer-checked:opacity-100 dark:text-zinc-900"
      >
        <path
          d="M2 6l2.5 2.5L10 3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
}
