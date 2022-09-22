import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

const getRandomArray = (count, arr) => {
  const pointArray = [];
  const arrLength = arr.length;
  for (let i = 0; i < count; i++) {
    pointArray.push(arr[getRandomInteger(0, arrLength - 1)]);
  }
  const newSet = new Set(pointArray);
  return [...newSet];
};

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

export {getRandomInteger, getRandomArrayElement, getRandomArray, getDateDiff, isFutureDate, isPastDate, formatToDateMonthsAndDay, formatToDateWithTime, formatToFullDate, formatToTime, formatToDayMonth, getSumElements, dateString};
