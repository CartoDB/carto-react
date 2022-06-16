/**
 * Sorts a list of objects based on a property values
 * @param {object[]} array list of objects to sort
 * @param {unknown[]} values values to sort by
 * @param {string} prop property to sort by
 * @returns sorted array
 */
export default function sortArrayByPropValues(array, values, prop) {
  if (values?.length && prop) {
    const uniqueValues = [...new Set(values)];
    const elementsWithProp = array.filter(
      (element) => element.hasOwnProperty(prop) && element[prop]
    );
    return [
      ...array.filter((element) => !element.hasOwnProperty(prop)),
      ...elementsWithProp.filter((item) => uniqueValues.indexOf(item[prop]) === -1),
      ...elementsWithProp
        .filter((item) => uniqueValues.indexOf(item[prop]) !== -1)
        .sort((a, b) => uniqueValues.indexOf(b[prop]) - uniqueValues.indexOf(a[prop]))
    ];
  }

  return array;
}
