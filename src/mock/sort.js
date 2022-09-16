import dayjs from 'dayjs';

export const sortByDay = (pointA, pointB ) => dayjs(pointA.dates.start).diff(pointB.dates.start);

export const sortByTime = (timeA, timeB) => {
  const timeADuration = dayjs(timeA.dates.finish).diff(dayjs(timeA.dates.start));
  const timeBDuration = dayjs(timeB.dates.finish).diff(dayjs(timeB.dates.start));
  return timeBDuration - timeADuration;
};

export const sortByPrice = (pointA, pointB) => {
  pointA = pointA.basePrice;
  pointB = pointB.basePrice;
  return (pointB - pointA);
};

