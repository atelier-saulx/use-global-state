import { useEffect, useState } from "react";

const store = {};
let cnt = 0;

const addGlobalStateEntry = (key, defaultValue) => {
  store[key] = {
    setState: (val) => setGlobalState(key, val),
    listeners: new Set(),
    state: typeof defaultValue === "function" ? defaultValue() : defaultValue,
  };
};

export const setGlobalState = (key, val, dontEmit = false) => {
  if (key in store) {
    if (store[key].state !== val) {
      store[key].state = val;
      if (!dontEmit) {
        cnt++;
        store[key].listeners.forEach((fn) => fn(cnt));
      }
    }
  } else {
    addGlobalStateEntry(key, val);
  }
};

export const getGlobalState = (key) => {
  return (key in store && store[key].state) || undefined;
};

const useGlobalState = (key, defaultValue) => {
  if (!(key in store)) {
    addGlobalStateEntry(key, defaultValue);
  }

  useEffect(() => {
    return () => {
      store[key].listeners.delete(setState);
    };
  }, [key]);

  const [, setState] = useState(cnt);
  store[key].listeners.add(setState);

  return [store[key].state, store[key].setState];
};

export default useGlobalState;
