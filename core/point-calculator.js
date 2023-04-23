import { sumArray, isEqualArray, sortNumberAscending } from '~/utils';

export const calcPoint = (category, diceEyes) => {
  switch (category) {
    case 'aces':
      return getAcesPoint(diceEyes);
    case 'dual':
      return getDualPoint(diceEyes);
    case 'triple':
      return getTriplePoint(diceEyes);
    case 'quadruple':
      return getQuadruplePoint(diceEyes);
    case 'penta':
      return getPentaPoint(diceEyes);
    case 'hexa':
      return getHexaPoint(diceEyes);
    case 'choice':
      return getChoicePoint(diceEyes);
    case 'fourKind':
      return getFourKindPoint(diceEyes);
    case 'fullHouse':
      return getFullHousePoint(diceEyes);
    case 'smallStr':
      return getSmallStrPoint(diceEyes);
    case 'largeStr':
      return getLargeStrPoint(diceEyes);
    case 'yacht':
      return getYachtPoint(diceEyes);
  }
};

// mission
const getAcesPoint = (diceEyes) => {
  return diceEyes.reduce((a, b) => {
    return b === 1 ? a + b : a;
  }, 0);
};
const getDualPoint = (diceEyes) => {
  return diceEyes.reduce((a, b) => {
    return b === 2 ? a + b : a;
  }, 0);
};
const getTriplePoint = (diceEyes) => {
  return diceEyes.reduce((a, b) => {
    return b === 3 ? a + b : a;
  }, 0);
};
const getQuadruplePoint = (diceEyes) => {
  return diceEyes.reduce((a, b) => {
    return b === 4 ? a + b : a;
  }, 0);
};
const getPentaPoint = (diceEyes) => {
  return diceEyes.reduce((a, b) => {
    return b === 5 ? a + b : a;
  }, 0);
};
const getHexaPoint = (diceEyes) => {
  return diceEyes.reduce((a, b) => {
    return b === 6 ? a + b : a;
  }, 0);
};

// combination
const getChoicePoint = (diceEyes) => {
  return sumArray(diceEyes);
};
const getFourKindPoint = (diceEyes) => {
  let eyeCountMap = {};
  for (const eye of diceEyes) {
    eyeCountMap[eye] = (eyeCountMap[eye] || 0) + 1;
  }
  const isFourKind = Object.values(eyeCountMap).includes(4);
  const isYacht = diceEyes.every((v) => v === dice[0]);
  return isFourKind || isYacht ? sumArray(diceEyes) : 0;
};
const getFullHousePoint = (diceEyes) => {
  let eyeCountMap = {};
  for (const eye of diceEyes) {
    eyeCountMap[eye] = (eyeCountMap[eye] || 0) + 1;
  }
  const isFullHouse =
    Object.values(eyeCountMap).includes(3) && Object.values(eyeCountMap).includes(2);
  const isYacht = diceEyes.every((v) => v === dice[0]);
  return isFullHouse || isYacht ? sumArray(diceEyes) : 0;
};
const getSmallStrPoint = (diceEyes) => {
  const diceSet = new Set(diceEyes);
  if (!diceSet.has(3) || !diceSet.has(4)) {
    return 0;
  } else {
    const isSmallStr =
      (diceSet.has(1) && diceSet.has(2)) ||
      (diceSet.has(2) && diceSet.has(5)) ||
      (diceSet.has(5) && diceSet.has(6));
    return isSmallStr ? 15 : 0;
  }
};
const getLargeStrPoint = (diceEyes) => {
  const LARGE_STR_COMBINATIONS = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
  ];
  const sortedEyes = sortNumberAscending(diceEyes);
  if (LARGE_STR_COMBINATIONS.some((comb) => isEqualArray(sortedEyes, comb))) {
    return 30;
  } else return 0;
};
const getYachtPoint = (diceEyes) => {
  const isYacht = diceEyes.every((v) => v === dice[0]);
  return isYacht && dice[0] !== 0 ? 50 : 0;
};
