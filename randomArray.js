export const createRandomArray = (numberOfElement) => {
  let newArray = [];
  for (let i = 0; i < numberOfElement; i++) {
    newArray.push(getRandomInt(0, 100));
  }
  return newArray;
};

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
