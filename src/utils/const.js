const KEYS = {
  ESCAPE: ['Esc', 'Escape']
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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};


export {KEYS, FILTER_TYPE, SortData, SortType, UserAction, UpdateType};
