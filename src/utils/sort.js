import dayjs from 'dayjs';

export const sortByDay = (pointA, pointB ) => dayjs(pointA.dateFrom).diff(pointB.dateFrom);

export const sortByTime = (timeA, timeB) => {
  const timeADuration = dayjs(timeA.dateTo).diff(dayjs(timeA.dateFrom));
  const timeBDuration = dayjs(timeB.dateTo).diff(dayjs(timeB.dateFrom));
  return timeBDuration - timeADuration;
};

export const sortByPrice = (pointA, pointB) => {
  pointA = pointA.basePrice;
  pointB = pointB.basePrice;
  return (pointB - pointA);
};

