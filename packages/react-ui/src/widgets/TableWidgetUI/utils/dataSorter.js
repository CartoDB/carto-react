function descendingComparator(a, b, field) {
  if (b[field] < a[field]) {
    return 1;
  }
  if (b[field] > a[field]) {
    return -1;
  }
  return 0;
}

function getComparator(order, field) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, field)
    : (a, b) => -descendingComparator(a, b, field);
}

export function stableSort(array, { sortOrder, sortColumn }) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  const comparator = getComparator(sortOrder, sortColumn);
  stabilizedThis.sort(([valueA, indexA], [valueB, indexB]) => {
    const order = comparator(valueA, valueB);
    if (order !== 0) return order;
    return indexA - indexB;
  });
  return stabilizedThis.map((el) => el[0]);
}
