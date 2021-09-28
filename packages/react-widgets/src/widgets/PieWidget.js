import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addFilter, removeFilter, selectSourceById } from '@carto/react-redux';
import { WrapperWidgetUI, PieWidgetUI } from '@carto/react-ui';
import {
  _FilterTypes as FilterTypes,
  _getApplicableFilters as getApplicableFilters,
  AggregationTypes
} from '@carto/react-core';
import { getCategories } from '../models';

/**
 * Renders a <PieWidget /> component
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column to get the data from.
 * @param  {string} [props.operationColumn] - Name of the data source's column to operate with. If not defined it will default to the one defined in `column`.
 * @param  {string} props.operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
 * @param  {Function} [props.formatter] - Function to format the value that appears in the tooltip.
 * @param  {Function} [props.tooltipFormatter] - Function to return the HTML of the tooltip.
 * @param  {string} props.height - Height of the chart
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 */
function PieWidget({
  id,
  title,
  height,
  dataSource,
  column,
  operationColumn,
  operation,
  formatter,
  tooltipFormatter,
  onError,
  wrapperProps
}) {
  const dispatch = useDispatch();

  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isSourceReady = useSelector(
    (state) => state.carto.viewportFeaturesReady[dataSource]
  );
  const { filters } = useSelector((state) => selectSourceById(state, dataSource) || {});

  useEffect(() => {
    setIsLoading(true);

    if (isSourceReady) {
      const _filters = getApplicableFilters(filters, id);

      getCategories({
        column,
        operation,
        operationColumn,
        filters: _filters,
        dataSource
      })
        .then((data) => {
          if (data) {
            setIsLoading(false);
            setCategoryData(data);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (onError) onError(error);
        });
    }
  }, [
    id,
    column,
    operationColumn,
    operation,
    filters,
    dataSource,
    setIsLoading,
    onError,
    isSourceReady
  ]);

  const handleSelectedCategoriesChange = useCallback(
    (categories) => {
      setSelectedCategories(categories);

      if (categories && categories.length) {
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: FilterTypes.IN,
            values: categories,
            owner: id
          })
        );
      } else {
        dispatch(
          removeFilter({
            id: dataSource,
            column
          })
        );
      }
    },
    [column, dataSource, id, setSelectedCategories, dispatch]
  );

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading} {...wrapperProps}>
      <PieWidgetUI
        data={categoryData}
        formatter={formatter}
        height={height}
        tooltipFormatter={tooltipFormatter}
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
  onError: PropTypes.func,
  wrapperProps: PropTypes.object
};

PieWidget.defaultProps = {
  wrapperProps: {}
};

export default PieWidget;
