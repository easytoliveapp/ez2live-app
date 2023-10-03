const useDateFormater = (date: string) => {
  const data = new Date(date);
  const dataFormated = `${data.getDate()}/${
    data.getMonth() + 1
  }/${data.getFullYear()}`;
  return dataFormated;
};
export default useDateFormater;
