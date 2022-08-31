import dayjs from 'dayjs';
const getDuration = (start, finish) => dayjs(finish).diff(dayjs(start));

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

export const sortByDay = (pointA, pointB) => {
  pointA = pointA.dateFrom;
  pointB = pointB.dateFrom;
  const weight = getWeightForNull(pointA, pointB);

  return weight ?? getDuration(pointA, pointB);
};

export const sortByTime = (pointA, pointB) => {
  pointA = getDuration(pointA.dateFrom, pointA.dateTo);
  pointB = getDuration(pointB.dateFrom, pointB.dateTo);
  const weight = getWeightForNull(pointA, pointB);

  return weight ?? (pointB - pointA);
};

export const sortByPrice = (pointA, pointB) => {
  pointA = pointA.basePrice;
  pointB = pointB.basePrice;
  const weight = getWeightForNull(pointA, pointB);

  return weight ?? (pointB - pointA);
};

