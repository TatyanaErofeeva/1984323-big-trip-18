import dayjs from 'dayjs';

const getWeightForNull = (dateA, dateB ) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortByDay = (pointA, pointB ) => {
  const dayADuration = pointA.dates.start;
  const dayBDuration = pointB.dates.start;
  return dayjs(dayADuration).diff(dayBDuration);};

export const sortByTime = (timeA, timeB) => {
  const timeADuration = dayjs(timeA.dates.finish).diff(dayjs(timeA.dates.start));
  const timeBDuration = dayjs(timeB.dates.finish).diff(dayjs(timeB.dates.start));
  return timeBDuration - timeADuration;
};

export const sortByPrice = (pointA, pointB) => {
  pointA = pointA.type.price;
  pointB = pointB.type.price;
  const weight = getWeightForNull(pointA, pointB);

  return weight ?? (pointB - pointA);
};


