import {format} from "date-fns";
import ruLocale from "date-fns/locale/ru";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'd MMMM yyyy', {locale: ruLocale});
};