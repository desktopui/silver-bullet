import { useState } from "react";

export default function useLocalStorage<T>(
  key: string
): [T | null, ((item: T) => void)] {
  const [item, setValue] = useState(() => {
    const serialized = window.localStorage.getItem(key);
    if (serialized) {
      return JSON.parse(serialized) as T;
    } else {
      return null;
    }
  });

  const setItem = (item: T) => {
    setValue(item);
    window.localStorage.setItem(key, JSON.stringify(item));
  };

  return [item, setItem];
}
