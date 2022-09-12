import {getRandomInteger} from './util.js';
//import { getObjectsArray} from './data.js';
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

const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
  EVENT: 'sort-event',
  OFFER: 'sort-offer'
};

const SortData = [
  { item: 'day', id: SortType.DAY, name: 'Day', checked: true, disabled: false },
  { item: 'event', id: SortType.EVENT, name: 'Event', checked: false, disabled: true },
  { item: 'time', id: SortType.TIME, name: 'Time', checked: false, disabled: false },
  { item: 'price', id: SortType.PRICE, name: 'Price', checked: false, disabled: false },
  { item: 'offer', id: SortType.OFFER, name: 'Offers', checked: false, disabled: true },
];

const pictures = [
  'https://placekitten.com/g/247/153',
  'https://placekitten.com/g/249/151',
  'https://placekitten.com/g/250/152',
  'https://placekitten.com/g/247/153',
  'https://placekitten.com/g/248/152',
  'https://placekitten.com/g/248/152',
  'https://placekitten.com/g/249/151',
  'https://placekitten.com/g/248/152',
  'https://placekitten.com/g/247/153',
];



export {KEYS,OFFERS_LIST, OFFERS_PRICES, FILTER_TYPE, DESCRIPTIONS, SortData, SortType, pictures};
