export function convertCoordinates(originalCoordinates) {
  const cp = [...originalCoordinates];
  const newArr = [];
  while (cp.length) newArr.push(cp.splice(0, 2));

  return newArr;
}
