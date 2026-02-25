export const isDateInList = (date: Date, dateList: Date[]): boolean => {
  return dateList.some((eventDate) => eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear());
};
