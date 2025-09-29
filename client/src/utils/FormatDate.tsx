import React from "react";

type Formatdateprops = {
  eventdate: string;
};

const FormatDate: React.FC<Formatdateprops> = ({ eventdate }) => {
  const date = new Date(eventdate);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const daySuffix = (d: number) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <>
      {day}
      {daySuffix(day)} {month}, {year}
    </>
  );
};

export default FormatDate;
