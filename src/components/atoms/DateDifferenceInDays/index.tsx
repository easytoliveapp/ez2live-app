import React from "react";

const DateDiffInDays = (date: string) => {
  const newDate = new Date();
  const validity = new Date(date);

  const DiffInMilliseconds = Math.abs(validity.getTime() - newDate.getTime());

  const DiffInDays = Math.ceil(DiffInMilliseconds / (1000 * 60 * 60 * 24));

  return <div className="mx-1">{DiffInDays}</div>;
};

export default DateDiffInDays;
