import { useEffect, useState } from "react";
import { Input } from "@/shared/ui/input";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";

type TodoSearchProps = {
  onSearchChange: (value: string) => void;
  delay?: number;
  placeholder?: string;
};

export function TodoSearch({
  onSearchChange,
  delay = 300,
  placeholder = "Поиск по названию…",
}: TodoSearchProps) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebouncedValue(value, delay);

  useEffect(() => {
    onSearchChange(debouncedValue.trim());
  }, [debouncedValue, onSearchChange]);

  return (
    <Input
      type="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      aria-label="Поиск задач по названию"
    />
  );
}
