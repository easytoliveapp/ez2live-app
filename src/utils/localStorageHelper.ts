const setItemToLocalStorage = <T>(key: string, data: T) =>
  window?.localStorage.setItem(key, JSON.stringify(data));

const getItemByLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const storageValues = window.localStorage.getItem(key);

    if (storageValues) {
      return JSON.parse(storageValues);
    }
  }
  return null;
};

const removeItemFromLocalStorage = (key: string) => {
  window?.localStorage.removeItem(key);
};

const localStorageHandler = {
  setItemToLocalStorage,
  getItemByLocalStorage,
  removeItemFromLocalStorage,
};

export default localStorageHandler;
