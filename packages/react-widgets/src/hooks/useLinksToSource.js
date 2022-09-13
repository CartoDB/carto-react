import { useSelector } from 'react-redux';
import { selectSourceById } from '@carto/react-redux/';
import { getLinksToSource } from './linksUtils';

export default function useLinksToSource(dataSourceId) {
  const originSources = useSelector((state) => {
    const links = getLinksToSource(state.carto.dataSourceLinks, dataSourceId);

    return links.map((link) => ({
      ...link,
      originSource: selectSourceById(state, link.originSourceId)
    }));
  });

  return originSources;
}
