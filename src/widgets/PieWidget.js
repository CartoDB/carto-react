import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addFilter, removeFilter, selectSourceById } from '../redux/cartoSlice';
import { WrapperWidgetUI, PieWidgetUI } from '../ui';
import { FilterTypes, getApplicableFilters } from '../api/FilterQueryBuilder';
import { getCategories } from './models';
import { AggregationTypes } from './AggregationTypes';

/**
  * Renders a <PieWidget /> component
  * @param  props
  * @param  {string} id - ID for the widget instance.
  * @param  {string} title - Title to show in the widget header.
  * @param  {string} dataSource - ID of the data source to get the data from.
  * @param  {string} column - Name of the data source's column to get the data from.
  * @param  {string} [operationColumn] - Name of the data source's column to operate with. If not defined it will default to the one defined in `column`.
  * @param  {string} operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
  * @param  {formatterCallback} [formatter] - Function to format the value that appears in the tooltip.
  * @param  {formatterCallback} [tooltipFormatter] - Function to return the HTML of the tooltip.
  * @param  {boolean} [viewportFilter=false] - Defines whether filter by the viewport or not.
  * @param  {string} height - Height of the chart
  * @param  {errorCallback} [onError] - Function to handle error messages from the widget.
  */
 function PieWidget({ id, title, height, dataSource, column, operationColumn, operation, formatter, tooltipFormatter, viewportFilter  = false, onError }) {
  const dispatch = useDispatch();
  const viewport = useSelector((state) => viewportFilter && state.carto.viewport);
  const source = useSelector((state) => selectSourceById(state, dataSource) || {});

  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    if (
      source.data &&
      source.credentials &&
      (!viewportFilter || (viewportFilter && viewport))
    ) {
      const filters = getApplicableFilters(source.filters, id);
      setLoading(true);
      getCategories({
        column,
        operation,
        operationColumn,
        data: source.data,
        filters,
        credentials: source.credentials,
        viewport,
        opts: { abortController },
      })
        .then((data) => {
          setCategoryData(data);
          setLoading(false);
        })
        .catch((error) => {
          if (error.name === 'AbortError') return;
          if (onError) onError(error);
        });
    } else {
      setCategoryData([]);
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [
    source.credentials,
    source.data,
    source.filters,
    viewport,
    viewportFilter,
    column,
    operation,
    operationColumn,
    dispatch,
    id,
    onError,
  ]);

  const handleSelectedCategoriesChange = (categories) => {
    setSelectedCategories(categories);
    if (categories && categories.length) {
      dispatch(
        addFilter({
          id: dataSource,
          column,
          type: FilterTypes.IN,
          values: categories,
          owner: id,
        })
      );
    } else {
      dispatch(
        removeFilter({
          id: dataSource,
          column,
        })
      );
    }
  };

  return (
    <WrapperWidgetUI title={title} loading={loading}>
      <PieWidgetUI
        data={categoryData}
        formatter={formatter}
        height={height}
        tooltipFormatter={tooltipFormatter}
        loading={loading}
        selectedCategories={selectedCategories}
        onSelectedCategoriesChange={handleSelectedCategoriesChange}
      />
    </WrapperWidgetUI>
  );
}

PieWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.number,
  dataSource: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  operationColumn: PropTypes.string,
  operation: PropTypes.oneOf(Object.values(AggregationTypes)).isRequired,
  formatter: PropTypes.func,
  tooltipFormatter: PropTypes.func,
  viewportFilter: PropTypes.bool,
  onError: PropTypes.func
};

PieWidget.defaultProps = {
  viewportFilter: false
};

export default PieWidget;
