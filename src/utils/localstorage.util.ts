export const get = <T>(key: string): (T | null) => {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const set = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const remove = (key: string) => window.localStorage.removeItem(key);

export const clear = () => window.localStorage.clear();
