debugger;
debugger;
debugger;
debugger;

export const FilterTypes = Object.freeze({
  IN: 'in',
  BETWEEN: 'between'
});

export const getApplicableFilters = (filters = {}, owner) => {
  const filtersCopy = {};
  Object.entries(filters).forEach(([column, filter]) => {
    const filterCopy = {};
    Object.keys(filter)
      .filter((operator) => filter[operator].owner !== owner)
      .forEach((operator) => (filterCopy[operator] = { ...filter[operator] }));

    if (Object.keys(filterCopy).length) {
      filtersCopy[column] = filterCopy;
    }
  });

  return filtersCopy;
};

export const filtersToSQL = (filters = {}) => {
  const result = [];

  Object.entries(filters).forEach(([column, filter]) => {
    Object.entries(filter).forEach(([operator, params]) => {
      switch (operator) {
        case FilterTypes.IN:
          result.push(
            `${column} ${operator}(${params.values.map((v) => `'${v}'`).join(',')})`
          );
          break;
        case FilterTypes.BETWEEN:
          result.push(
            `(${params.values
              .map(
                ([left, right]) =>
                  `${left ? `${column} >= ${left}` : ``} ${
                    left && right ? ' and ' : ''
                  } ${right ? `${column} < ${right}` : ``}`
              )
              .join(') OR (')})`
          );
          break;
        default:
          throw new Error(`Not valid operator has provided: ${operator}`);
      }
    });
  });

  return result.length ? `WHERE (${result.join(') AND (')})` : '';
};

/* export const viewportToSQL = (viewport) => {
  const bboxes = getBoundingBoxes(viewport);

  const queries = bboxes.map((bbox) => {
    return `ST_Intersects(
      the_geom_webmercator,
      ST_Transform(ST_MakeEnvelope(${bbox.join(',')}, 4326), 3857)
    )`;
  });

  return queries.join(' OR ');
};

function getBoundingBoxes([west, south, east, north]) {
  var bboxes = [];

  if (east - west >= 360) {
    bboxes.push([-180, south, 180, north]);
  } else if (west >= -180 && east <= 180) {
    bboxes.push([west, south, east, north]);
  } else {
    bboxes.push([west, south, 180, north]);
    // here we assume west,east have been adjusted => west >= -180 => east > 180
    bboxes.push([-180, south, east - 360, north]);
  }

  return bboxes;
} */

/**
 * Returns a SQL query applying a set of filters
 *
 * @param { string } data - Dataset name or SQL query
 * @param { Object } filters - Filters to be applied
 * @returns { string } - SQL query
 */
/* export const buildQueryFilters = ({ data, filters }) => {
  return `
    SELECT *
    FROM (${data}) as q
    ${filtersToSQL(filters)}
  `;
}; */
