import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { WrapperWidgetUI, TableWidgetUI } from '@carto/react-ui';
import { getTable, paginateTable, TABLE_HARD_LIMIT } from '../models';
import useWidgetFetch from '../hooks/useWidgetFetch';
import WidgetWithAlert from './utils/WidgetWithAlert';
import { _FeatureFlags, _hasFeatureFlag } from '@carto/react-core';

/**
 * Renders a <TableWidget /> component
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {{ field: string, headerName?: string, align?: string, type?: string }[]} props.columns - List of data columns to display.
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default).
 * @param  {Object} [props.noDataAlertProps] - Extra props to pass to [NoDataAlert]().
 * @param  {number} [props.initialPageSize] - Initial number of rows per page.
 * @param  {Function} [props.onPageSizeChange] - Function called when the page size is changed internally.
 * @param  {boolean} [props.global] - Enable/disable the viewport filtering in the data fetching.
 * @param  {string} [props.height] - Static widget height, required for scrollable table content.
 * @param  {boolean} [props.dense] - Whether the table should use a compact layout with smaller cell paddings.
 * @param  {Object} [props.droppingFeaturesAlertProps] - Extra props to pass to [NoDataAlert]() when dropping feature.
 * @param  {number} [props.pageSize] - Number of rows per page. This is used to manage internal state externally.
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
  global,
  height,
  dense,
  droppingFeaturesAlertProps,
  // Internal state
  pageSize
}) {
  const [rowsPerPage, setRowsPerPage] = useState(initialPageSize);
  const [page, setPage] = useState(0);

  const [sortBy, setSortBy] = useState(undefined);
  const [sortByColumnType, setSortByColumnType] = useState(undefined);
  const [sortDirection, setSortDirection] = useState('asc');

  const {
    data = { rows: [], totalCount: 0, hasData: false, isDataComplete: true },
    isLoading,
    warning
  } = useWidgetFetch(getTable, {
    id,
    dataSource,
    params: {
      columns: columns.map((c) => c.field),
      sortBy,
      sortDirection,
      sortByColumnType
    },
    global,
    onError,
    attemptRemoteCalculation: _hasFeatureFlag(_FeatureFlags.REMOTE_WIDGETS)
  });

  const { totalCount, hasData, isDataComplete } = data;
  const { rows, pages } = paginateTable(data, page, rowsPerPage);

  const lastPageTooltip = isDataComplete
    ? undefined
    : `This view is limited to ${TABLE_HARD_LIMIT} rows`;

  useEffect(() => {
    if (pageSize !== undefined) setRowsPerPage(pageSize);
  }, [pageSize]);

  useEffect(() => {
    // force reset to page 0 when the total number of pages changes
    setPage(0);
  }, [dataSource, pages]);

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    if (onPageSizeChange) onPageSizeChange(newRowsPerPage);
  };

  const handleSortBy = (newSortBy) => {
    setSortBy(newSortBy);
    const column = columns.find((c) => c.field === newSortBy);
    setSortByColumnType(column?.type);
  };

  return (
    <WrapperWidgetUI title={title} {...wrapperProps} isLoading={isLoading}>
      <WidgetWithAlert
        dataSource={dataSource}
        warning={warning}
        global={global}
        droppingFeaturesAlertProps={droppingFeaturesAlertProps}
        noDataAlertProps={noDataAlertProps}
      >
        {(hasData || isLoading) && (
          <TableWidgetUI
            columns={columns}
            rows={rows}
            pagination
            totalCount={totalCount}
            page={page}
            onSetPage={setPage}
            onSetRowsPerPage={handleRowsPerPageChange}
            rowsPerPage={rowsPerPage}
            sorting
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSetSortBy={handleSortBy}
            onSetSortDirection={setSortDirection}
            height={height}
            dense={dense}
            isLoading={isLoading}
            lastPageTooltip={lastPageTooltip}
          />
        )}
      </WidgetWithAlert>
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
  droppingFeaturesAlertProps: PropTypes.object,
  initialPageSize: PropTypes.number,
  onPageSizeChange: PropTypes.func,
  height: PropTypes.string,
  dense: PropTypes.bool,
  // Internal state
  pageSize: PropTypes.number
};

export default TableWidget;
