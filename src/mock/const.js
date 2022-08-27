import {getRandomInteger, getRandomArray} from './util.js';
import dayjs from 'dayjs';

const KEYS = {
  ESCAPE: ['Esc', 'Escape']
};

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const OFFERS_PRICES = [20, 200, 30, 100, 15, 5, 40, 50, 80];

const OFFERS_LIST = {
  orderUber: {
    id: 'order-uber',
    name: 'Order uber',
    price: OFFERS_PRICES[getRandomInteger(0, OFFERS_PRICES.length - 1)]
  },
  addLuggage: {
    id: 'add-luggage',
    name: 'Add luggage',
    price: OFFERS_PRICES[getRandomInteger(0, OFFERS_PRICES.length - 1)]
  },
  switchToComfort: {
    id: 'switch-to-comfort',
    name: 'Switch to comfort',
    price: OFFERS_PRICES[getRandomInteger(0, OFFERS_PRICES.length - 1)]
  },
  rentACar: {
    id: 'rent-a-car',
    name: 'Rent a car',
    price: OFFERS_PRICES[getRandomInteger(0, OFFERS_PRICES.length - 1)]
  },
  addBreakfast: {
    id: 'add-breakfast',
    name: 'Add breakfast',
    price: OFFERS_PRICES[getRandomInteger(0, OFFERS_PRICES.length - 1)]
  },
  bookTickets: {
    id: 'book-tickets',
    name: 'Book tickets',
    price: OFFERS_PRICES[getRandomInteger(0, OFFERS_PRICES.length - 1)]
  },
  lunchInCity: {
    id: 'lunch-in-city',
    name: 'Lunch in city',
    price: OFFERS_PRICES[getRandomInteger(0, OFFERS_PRICES.length - 1)]
  },
  addMeal: {
    id: 'add-meal',
    name: 'Add meal',
    price: OFFERS_PRICES[getRandomInteger(0, OFFERS_PRICES.length - 1)]
  },
  travelByTrain: {
    id: 'travel-by-train',
    name: 'Travel by train',
    price: OFFERS_PRICES[getRandomInteger(0, OFFERS_PRICES.length - 1)]
  },
  chooseSeats: {
    id: 'choose-seats',
    name: 'Choose seats',
    price: OFFERS_PRICES[getRandomInteger(0, OFFERS_PRICES.length - 1)]
  },
};

const ROUTE_POINT_TYPES = {
  taxi: {
    name: 'Taxi',
    offers: getRandomArray(getRandomInteger(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: '../img/icons/taxi.png',
    price: getRandomInteger(2, 20) * 20,
  },
  bus: {
    name: 'Bus',
    offers: getRandomArray(getRandomInteger(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: '../img/icons/bus.png',
    price: getRandomInteger(2, 20) * 20,
  },
  train: {
    name: 'Train',
    offers: getRandomArray(getRandomInteger(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: '../img/icons/train.png',
    price: getRandomInteger(2, 20) * 20,
  },
  ship: {
    name: 'Ship',
    offers: getRandomArray(getRandomInteger(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: '../img/icons/ship.png',
    price: getRandomInteger(2, 20) * 20,
  },
  drive: {
    name: 'Drive',
    offers: getRandomArray(getRandomInteger(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: '../img/icons/drive.png',
    price: getRandomInteger(2, 20) * 20,
  },
  flight: {
    name: 'Flight',
    offers: getRandomArray(getRandomInteger(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: '../img/icons/flight.png',
    price: getRandomInteger(2, 20) * 20,
  },
  checkIn: {
    name: 'Check-in',
    offers: getRandomArray(getRandomInteger(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: '../img/icons/check-in.png',
    price: getRandomInteger(2, 20) * 20,
  },
  sightseeng: {
    name: 'Sightseeng',
    offers: getRandomArray(getRandomInteger(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: '../img/icons/sightseeing.png',
    price: getRandomInteger(2, 20) * 20,
  },
  restaurant: {
    name: 'Restaurant',
    offers: getRandomArray(getRandomInteger(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: '../img/icons/restaurant.png',
    price: getRandomInteger(2, 20) * 20,
  },
};

const DESTINATIONS_ARRAY = [
  'Amsterdam',
  'Geneva',
  'Tver',
  'Berlin',
  'Moscow',
];

const formatToDateWithTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const formatToTime = (date) => dayjs(date).format('HH:mm');
const formatToFullDate = (date) => dayjs(date).format('YYYY-MM-DD');
const formatToDateMonthsAndDay = (date) => dayjs(date).format('MMM-DD');
export {KEYS,OFFERS_LIST, OFFERS_PRICES, ROUTE_POINT_TYPES, DESTINATIONS_ARRAY, DESCRIPTIONS, formatToDateWithTime, formatToTime, formatToFullDate, formatToDateMonthsAndDay};
