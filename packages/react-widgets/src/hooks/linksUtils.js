export function getLinksToSource(links, sourceId) {
  return links.filter(({ linkedSourceId }) => linkedSourceId === sourceId);
}

export function addRemoteLinkedSourceFilter(source, links) {
  const linkFilters = links.reduce((res, link) => {
    if (!link.originSource.filters) {
      return res;
    }
    return {
      ...res,
      [link.linkedColumn]: {
        in_foreign_key_filter: {
          values: [
            {
              foreignSource: link.originSource.data,
              foreignSourceType: link.originSource.type,
              foreignColumn: link.originColumn,
              foreignFilter: {
                filters: link.originSource.filters
              }
            }
          ]
        }
      }
    };
  }, {});

  return {
    ...source,
    filters: {
      ...source.filters,
      ...linkFilters
    }
  };
}
