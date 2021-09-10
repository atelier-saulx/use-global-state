import { useEffect, useState } from "react";

const store = {};

const addGlobalStateEntry = (key) => {
  store[key] = {
    setState: (val) => setGlobalState(key, val),
    listeners: new Set(),
  };
};

export const setGlobalState = (key, val, dontEmit = false) => {
  if (key in store) {
    store[key].state = val;
    if (!dontEmit) {
      store[key].listeners.forEach((fn) => fn(val));
    }
  } else {
    addGlobalStateEntry(key);
  }
};

export const getGlobalState = (key) => {
  return (key in store && store[key].state) || undefined;
};

const useGlobalState = (key) => {
  if (!(key in store)) {
    addGlobalStateEntry(key);
  }

  useEffect(() => {
    return () => {
      store[key].listeners.delete(setState);
    };
  }, [key]);

  const [, setState] = useState(store[key].state);
  store[key].listeners.add(setState);

  return [store[key].state, store[key].setState];
};

export default useGlobalState;
