export function sumArray(arr) {
  return arr.reduce((prev, cur) => prev + cur, 0);
}

export const isEqualArray = (arr1, arr2) => {
  if (arr1?.length !== arr2?.length) return false;
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

export function sortNumberAscending(arr) {
  return [...arr].sort((a, b) => {
    return a - b;
  });
}
