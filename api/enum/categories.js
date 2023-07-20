const ageRange = Object.freeze({
  '20~29': 1,
  '30~39': 2,
  '40~49': 3,
  '50~59': 4,
  '60~69': 5,
  '70~79': 6,
  '80~89': 7,
  all: 8,
  unknown: 9,
});

const genderType = Object.freeze({
  male: 1,
  female: 2,
  all: 3,
  unknown: 4,
});

const orderStatus = Object.freeze({
  CREATED: 1,
  FULL: 2,
  PURCHASED: 3,
  DONE: 4,
});

export { ageRange, genderType, orderStatus };
