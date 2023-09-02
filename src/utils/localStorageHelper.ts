const setItemToLocalStorage = <T>(key: string, data: T) =>
  window?.localStorage.setItem(key, JSON.stringify(data));

const getItemByLocalStorage = (key: string) => {
  const storageValues = window?.localStorage.getItem(key);

  if (storageValues) {
    return JSON.parse(storageValues);
  }
  return;
};

const removeItemFromLocalStorage = (key: string) => {
  window?.localStorage.removeItem(key);
};

export {
  setItemToLocalStorage,
  getItemByLocalStorage,
  removeItemFromLocalStorage,
};
