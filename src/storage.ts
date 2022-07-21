export const setStorageItem = (name: string, value: string) => {
  return localStorage.setItem(name, value);
};

export const getStorageItem = (name: string) => {
  return localStorage.getItem(name);
};
