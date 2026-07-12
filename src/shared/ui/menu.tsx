import { useState, type ReactNode } from "react";
import { Button } from "./button";

type MenuProps = {
  trigger: ReactNode;
  triggerLabel: string;
  children: ReactNode;
};

export function Menu({ trigger, triggerLabel, children }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={triggerLabel}
        className="cursor-pointer px-1 text-base leading-none text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200"
      >
        {trigger}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div
            onClick={() => setIsOpen(false)}
            className="absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}

type MenuItemProps = {
  onClick: () => void;
  variant?: "default" | "danger";
  children: ReactNode;
};

const menuItemVariantClasses: Record<"default" | "danger", string> = {
  default: "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
  danger: "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30",
};

export function MenuItem({ onClick, variant = "default", children }: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full cursor-pointer px-3 py-1.5 text-left text-xs font-normal ${menuItemVariantClasses[variant]}`}
    >
      {children}
    </button>
  );
}
