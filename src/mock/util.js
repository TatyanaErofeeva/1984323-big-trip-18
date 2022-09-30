import { KEYS } from './const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const addZeroToNumber = (number) => (number < 10) ? `0${number}` : number;

const isFutureDate = (dateFrom) => dayjs().isBefore(dayjs(dateFrom)) || dayjs().isSame(dayjs(dateFrom), 'day');

const isPastDate = (date) => dayjs().isAfter(dayjs(date));


const getDateDiff = (start, finish) => {
  const diffTimeInMs = finish.diff(start);
  const timeDuration = dayjs.duration(diffTimeInMs);
  const months = timeDuration.months();
  const days = timeDuration.days();
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();
  const time = `${(months > 0) ? `${addZeroToNumber(months) }M ` : ''}${(days >= 0) ? `${addZeroToNumber(days) }D ` : ''}${(hours >= 0) ? `${addZeroToNumber(hours) }H ` : ''}${(minutes >= 0) ? `${addZeroToNumber(minutes) }M` : ''}`;
  return time;
};


const isEscKey = (evt) => KEYS.ESCAPE.includes(evt.key);

const formatToDateWithTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const formatToTime = (date) => dayjs(date).format('HH:mm');
const formatToFullDate = (date) => dayjs(date).format('YYYY-MM-DD');
const formatToDateMonthsAndDay = (date) => dayjs(date).format('MMM-DD');
const formatToDayMonth = (date) => dayjs(date).format('D MMMM');

const getSumElements = (elements) => {
  const sumElements = elements.reduce(
    (priceA, priceB) => priceA + priceB
  );
  return sumElements;
};
const dateString = (start, finish) => (dayjs(start).format('MMM') === dayjs(finish).format('MMM')) ? `${dayjs(start).format('DD MMM')} &mdash; ${dayjs(finish).format('DD')}` : `${dayjs(start).format('DD MMM')} &mdash; ${dayjs(finish).format('DD MMM')}`;

const getUpperCaseFirstLetter = (str) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

export {getDateDiff, isFutureDate, isPastDate, formatToDateMonthsAndDay, formatToDateWithTime, formatToFullDate, formatToTime, formatToDayMonth, getSumElements, dateString, getUpperCaseFirstLetter, isEscKey};
