import React from "react";
import dayjs from "dayjs";

const DateDifferenceInDays = (date: string) => {
  const today = dayjs();
  const validity = dayjs(date);

  const DateDiff = validity.diff(today, "day");

  return <div className="mx-1">{DateDiff + 1}</div>;
};

export default DateDifferenceInDays;
