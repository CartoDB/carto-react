import { useSelector } from 'react-redux';
import { selectSourceById } from '@carto/react-redux';

function isEmptyObject(value) {
  return Object.keys(value).length === 0 && value.constructor === Object;
}

// For global widgets, sets proper filter expression for back-end filtering from foreign source
export default function useRemoteForeignFilterSource(source, global) {
  const foreignSource = useSelector(
    (state) =>
      global && selectSourceById(state, source?.foreignFilteringSource?.foreignSourceId)
  );

  if (!global) {
    return source;
  }

  if (!foreignSource?.filters || isEmptyObject(foreignSource?.filters)) {
    return (
      source && {
        ...source,
        // @TODO: remove only the local foreign filter
        filters: {}
      }
    );
  }

  const { column, foreignColumn } = source?.foreignFilteringSource;

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
