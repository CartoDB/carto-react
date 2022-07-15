import { useEffect, useState } from 'react';
import { _getStats } from '@carto/react-api/';
import { InvalidColumnError } from '@carto/react-core/';
import useWidgetSource from './useWidgetSource';
import { DEFAULT_INVALID_COLUMN_ERR } from '../widgets/utils/constants';

/**
 * Hook to obtain column stats
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.column - Name of the data source's column to get the stats.
 * @param  {string} props.dataSource - ID of the data source to get the stats from.
 * @param  {boolean} props.customStats - If we are using custom stats is not necessary to do the request
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 */
export default function useStats({ id, column, dataSource, customStats, onError }) {
  const [stats, setStats] = useState();
  const [warning, setWarning] = useState('');
  const source = useWidgetSource({ dataSource, id });

  useEffect(() => {
    if (!customStats && source) {
      setWarning('');

      _getStats({ column, source })
        .then((res) => {
          setStats(res);
        })
        .catch((err) => {
          if (InvalidColumnError.is(err)) {
            setWarning(DEFAULT_INVALID_COLUMN_ERR);
          } else if (onError) {
            onError(err);
          }
        });
    }
  }, [column, source, onError, customStats]);

  return { stats, warning };
}
