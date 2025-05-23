import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the delay
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup the timer when the value or delay changes
    return () => clearTimeout(handler);
  }, [value, delay]);

  // Return the debounced value
  return debouncedValue;
}
