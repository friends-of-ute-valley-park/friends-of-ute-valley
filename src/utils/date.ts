type DateInput = Date | string | number;

type ParkHoursTime = {
  hour: number;
  minute: number;
};

export type SeasonalParkHours = {
  season: 'Winter' | 'Summer';
  starts: {
    month: number;
    day: number;
  };
  ends: {
    month: number;
    day: number;
  };
  opensAt: ParkHoursTime;
  closesAt: ParkHoursTime;
};

export const seasonalParkHours = [
  {
    season: 'Winter',
    starts: { month: 11, day: 1 },
    ends: { month: 4, day: 30 },
    opensAt: { hour: 5, minute: 0 },
    closesAt: { hour: 21, minute: 0 },
  },
  {
    season: 'Summer',
    starts: { month: 5, day: 1 },
    ends: { month: 10, day: 31 },
    opensAt: { hour: 5, minute: 0 },
    closesAt: { hour: 22, minute: 0 },
  },
] as const satisfies readonly SeasonalParkHours[];

const shortMonthDayFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' });
const shortMonthDayYearFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
const shortMonthYearFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });

const toDate = (date: DateInput): Date => (date instanceof Date ? date : new Date(date));

export const getDateTime = (date: DateInput): number => toDate(date).getTime();

export const formatShortMonthDay = (date: DateInput): string => shortMonthDayFormatter.format(toDate(date));

export const formatShortMonthDayYear = (date: DateInput): string => shortMonthDayYearFormatter.format(toDate(date));

export const formatShortMonthYear = (date: DateInput): string => shortMonthYearFormatter.format(toDate(date));

export const isUpcomingDate = (date: DateInput): boolean => {
  const parsedDate = toDate(date);
  const endOfCalendarDay = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), 23, 59, 59, 999);

  return endOfCalendarDay.getTime() > Date.now();
};

const toMonthDay = (month: number, day: number): number => month * 100 + day;

const isMonthDayInRange = (monthDay: number, starts: SeasonalParkHours['starts'], ends: SeasonalParkHours['ends']): boolean => {
  const startMonthDay = toMonthDay(starts.month, starts.day);
  const endMonthDay = toMonthDay(ends.month, ends.day);

  return startMonthDay <= endMonthDay ? monthDay >= startMonthDay && monthDay <= endMonthDay : monthDay >= startMonthDay || monthDay <= endMonthDay;
};

const formatCompactHour = ({ hour, minute }: ParkHoursTime): string => {
  const hourOnTwelveHourClock = hour % 12 || 12;
  const minuteText = minute === 0 ? '' : `:${String(minute).padStart(2, '0')}`;
  const meridiem = hour < 12 ? 'AM' : 'PM';

  return `${hourOnTwelveHourClock}${minuteText}${meridiem}`;
};

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
const formatMonth = (month: number): string => monthFormatter.format(new Date(2000, month - 1, 1));

const formatTwentyFourHourTime = ({ hour, minute }: ParkHoursTime): string => `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

const formatTwelveHourTime = ({ hour, minute }: ParkHoursTime, meridiemStyle: 'upper' | 'punctuated'): string => {
  const hourOnTwelveHourClock = hour % 12 || 12;
  const minuteText = meridiemStyle === 'upper' || minute !== 0 ? `:${String(minute).padStart(2, '0')}` : '';
  const meridiem = meridiemStyle === 'upper' ? (hour < 12 ? 'AM' : 'PM') : hour < 12 ? 'a.m.' : 'p.m.';

  return `${hourOnTwelveHourClock}${minuteText} ${meridiem}`;
};

export const parkHoursFaqAnswer = seasonalParkHours
  .map(
    ({ season, starts, ends, opensAt, closesAt }) =>
      `${season.toUpperCase()} (${formatMonth(starts.month)} ${starts.day} — ${formatMonth(ends.month)} ${ends.day}): ${formatTwelveHourTime(opensAt, 'punctuated')} to ${formatTwelveHourTime(closesAt, 'punctuated')}`,
  )
  .join(' ');

export const parkHoursRulesRows = seasonalParkHours.map(({ season, starts, ends, opensAt, closesAt }) => ({
  label: `${season} (${formatMonth(starts.month)}-${formatMonth(ends.month)})`,
  hours: `${formatTwentyFourHourTime(opensAt)} — ${formatTwentyFourHourTime(closesAt)}`,
}));

export const parkHoursVisitLines = seasonalParkHours.map(({ season, opensAt, closesAt }) => `${formatTwelveHourTime(opensAt, 'upper')} — ${formatTwelveHourTime(closesAt, 'upper')} ${season}`);

export const getParkHoursForDate = (date: DateInput = new Date()) => {
  const parsedDate = toDate(date);
  const monthDay = toMonthDay(parsedDate.getMonth() + 1, parsedDate.getDate());
  const hours = seasonalParkHours.find(({ starts, ends }) => isMonthDayInRange(monthDay, starts, ends));

  if (!hours) {
    throw new RangeError('Park hours are not configured for this date.');
  }

  return {
    ...hours,
    hours: `${formatCompactHour(hours.opensAt)} to ${formatCompactHour(hours.closesAt)}`,
  };
};

export const isDateInList = (date: Date, dateList: Date[]): boolean => {
  return dateList.some((eventDate) => eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear());
};
