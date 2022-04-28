import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { WrapperWidgetUI, TableWidgetUI, NoDataAlert } from '@carto/react-ui';
import { getTable } from '../models';
import useSourceFilters from '../hooks/useSourceFilters';
import { selectAreFeaturesReadyForSource, selectSourceById } from '@carto/react-redux';

/**
 * Renders a <TableWidget /> component
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {object[]} props.columns - List of data columns to display. If not specified, all the columns in the data source will be displayed.
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 * @param  {Object} [props.noDataAlertProps] - Extra props to pass to [NoDataAlert]()
 * @param  {number} [props.initialPageSize] - Initial number of rows per page
 * @param  {Function} [props.onPageSizeChange] - Function called when the page size is changed internally
 * @param  {string} [props.height] - Static widget height, required for scrollable table content
 * @param  {boolean} [props.dense] - Whether the table should use a compact layout with smaller cell paddings
 */
function TableWidget({
  id,
  title,
  dataSource,
  columns,
  wrapperProps,
  noDataAlertProps,
  onError,
  initialPageSize = 10,
  onPageSizeChange,
  height,
  dense
}) {
  const source = useSelector((state) => selectSourceById(state, dataSource))
  const isDroppingFeatures = source?.isDroppingFeatures

  const [rowsPerPage, setRowsPerPage] = useState(initialPageSize);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [sortBy, setSortBy] = useState(undefined);
  const [sortDirection, setSortDirection] = useState('asc');

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { filters, filtersLogicalOperator } = useSourceFilters({ dataSource, id });
  const isSourceReady = useSelector((state) =>
    selectAreFeaturesReadyForSource(state, dataSource)
  );

  useEffect(() => {
    // force reset the page to 0 when the viewport or filters change
    setPage(0);
  }, [dataSource, isSourceReady, filters]);

  useEffect(() => {
    if (onPageSizeChange) {
      onPageSizeChange(rowsPerPage);
    }
  }, [onPageSizeChange, rowsPerPage]);

  useEffect(() => {
    if (isSourceReady) {
      setIsLoading(true);
      getTable({
        filters,
        filtersLogicalOperator,
        dataSource,
        rowsPerPage,
        page,
        sortBy,
        sortDirection
      })
        .then((data) => {
          if (data) {
            setRows(data.data);
            setTotalCount(data.totalCount);
          }
        })
        .catch((error) => {
          if (onError) onError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [
    id,
    dataSource,
    filters,
    filtersLogicalOperator,
    sortBy,
    sortDirection,
    page,
    rowsPerPage,
    onError,
    isSourceReady
  ]);

  return (
    <WrapperWidgetUI title={title} {...wrapperProps} isLoading={isLoading}>
      {(rows.length && !isDroppingFeatures) || isLoading ? (
        <TableWidgetUI
          columns={columns}
          rows={rows}
          pagination
          totalCount={totalCount}
          page={page}
          onSetPage={setPage}
          onSetRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
          sorting
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSetSortBy={setSortBy}
          onSetSortDirection={setSortDirection}
          height={height}
          dense={dense}
        />
      ) : (
        <NoDataAlert {...noDataAlertProps} {...(isDroppingFeatures ? { body: 'Some rows have been filtered at this zoom level. Zoom in to ensure you see all rows in the map.' } : {})}/>
      )}
    </WrapperWidgetUI>
  );
}

TableWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      align: PropTypes.oneOf(['left', 'right'])
    })
  ).isRequired,
  onError: PropTypes.func,
  wrapperProps: PropTypes.object,
  noDataAlertProps: PropTypes.object,
  initialPageSize: PropTypes.number,
  onPageSizeChange: PropTypes.func,
  height: PropTypes.string,
  dense: PropTypes.bool
};

export default TableWidget;
