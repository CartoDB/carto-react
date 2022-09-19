function isEmptyObject(value) {
  return Object.keys(value).length === 0 && value.constructor === Object;
}

export function setRemoteForeignSourceFilter(source, foreignSource) {
  const { column, foreignColumn } = source.foreignFilteringSource;

  if (!foreignSource.filters || isEmptyObject(foreignSource)) {
    return source;
  }

  const foreignFilter = {
    [column]: {
      in_foreign_key_filter: {
        values: [
          {
            foreignSource: foreignSource.data,
            foreignSourceType: foreignSource.type,
            foreignColumn,
            foreignFilter: {
              filters: foreignSource.filters
            }
          }
        ]
      }
    }
  };

  return {
    ...source,
    filters: {
      ...source.filters,
      ...foreignFilter
    }
  };
}
