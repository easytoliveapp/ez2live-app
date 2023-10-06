import React from "react";
import dayjs from "dayjs";

const getDateDiffInDays = (date: string) => {
  const today = dayjs();
  const validity = dayjs(date);

  const dateDiff = validity.diff(today, "day");

  return <div className="mx-1">{dateDiff + 1}</div>;
};

export default getDateDiffInDays;
