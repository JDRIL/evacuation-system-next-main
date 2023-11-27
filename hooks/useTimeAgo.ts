import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

const useTimeAgo = (date: string | Date) => {
  return date
    ? timeAgo.format(typeof date === "string" ? new Date(date) : date)
    : undefined;
};

export default useTimeAgo;
