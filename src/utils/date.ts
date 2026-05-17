type DateInput = Date | string | number;

const shortMonthDayFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' });
const shortMonthDayYearFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
const shortMonthYearFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });

export const toDate = (date: DateInput): Date => (date instanceof Date ? date : new Date(date));

export const getDateTime = (date: DateInput): number => toDate(date).getTime();

export const formatShortMonthDay = (date: DateInput): string => shortMonthDayFormatter.format(toDate(date));

export const formatShortMonthDayYear = (date: DateInput): string => shortMonthDayYearFormatter.format(toDate(date));

export const formatShortMonthYear = (date: DateInput): string => shortMonthYearFormatter.format(toDate(date));

export const isUpcomingDate = (date: DateInput): boolean => {
  const parsedDate = toDate(date);
  const endOfCalendarDay = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), 23, 59, 59, 999);

  return endOfCalendarDay.getTime() > Date.now();
};

export const getParkHoursForDate = (date: DateInput = new Date()) => {
  const currentMonth = toDate(date).getMonth() + 1;
  const isWinter = currentMonth >= 11 || currentMonth <= 4;

  return {
    season: isWinter ? 'Winter' : 'Summer',
    hours: isWinter ? '5AM to 9PM' : '5AM to 10PM',
  };
};

export const isDateInList = (date: Date, dateList: Date[]): boolean => {
  return dateList.some((eventDate) => eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear());
};
