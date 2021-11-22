export function concatTypedArrays(a, b) {
  var c = new a.constructor(a.length + b.length);
  c.set(a, 0);
  c.set(b, a.length);
  return c;
}

export function convertCoordinates(originalCoordinates) {
  const cp = [...originalCoordinates];
  const newArr = [];
  while (cp.length) newArr.push(cp.splice(0, 2));

  return newArr;
}
