import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addFilter, removeFilter, selectSourceById } from '../redux/cartoSlice';
import { WrapperWidgetUI, CategoryWidgetUI } from '../ui';
import { FilterTypes, getApplicableFilters } from '../api/FilterQueryBuilder';
import { getCategories } from './models';
import { AggregationTypes } from './AggregationTypes';
import {groupValuesByColumn} from './operations/grouping';

/**
  * Renders a <CategoryWidget /> component
  * @param  props
  * @param  {string} props.id - ID for the widget instance.
  * @param  {string} props.title - Title to show in the widget header.
  * @param  {string} props.dataSource - ID of the data source to get the data from.
  * @param  {string} props.column - Name of the data source's column to get the data from.
  * @param  {string} [props.operationColumn] - Name of the data source's column to operate with. If not defined it will default to the one defined in `column`.
  * @param  {string} props.operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
  * @param  {formatterCallback} [props.formatter] - Function to format each value returned.
  * @param  {boolean} [props.viewportFilter=false] - Defines whether filter by the viewport or not. 
  * @param  {errorCallback} [props.onError] - Function to handle error messages from the widget.
  * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
  */
 function CategoryWidget(props) {
  const { column } = props;
  const [categoryData, setCategoryData] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const viewport = useSelector((state) => props.viewportFilter && state.carto.viewport);
  const source = useSelector((state) => selectSourceById(state, props.dataSource) || {});
  const vF = useSelector((state) => state.carto.viewportFeatures);
  const { data, credentials, sourceType: dataExtractMode } = source;

  useEffect(() => {
    if (dataExtractMode === 'TileLayer' && props.viewportFilter) {
      throw new Error(`"viewportFilter" should be false if Source Type is "${AggregationTypes.TILE_LAYER}"`);
    }
  }, [props.viewportFilter]);

  useEffect(() => {
    const {dataSource, operation, operationColumn, column} = props;

    if (dataExtractMode === 'TileLayer') {
      const targetFeatures = vF[dataSource];
 
      if (targetFeatures) {
        const groups = groupValuesByColumn(targetFeatures, operationColumn, column, operation);
        setCategoryData(groups);
      }
    }

    return () => setCategoryData(null);
  }, [dataExtractMode, props, vF]);

  useEffect(() => {
    if (dataExtractMode === 'SQL') {
      const abortController = new AbortController();
      if (
        data &&
        credentials &&
        (!props.viewportFilter || (props.viewportFilter && viewport))
      ) {
        const filters = getApplicableFilters(source.filters, props.id);
        setLoading(true);
        getCategories({
          ...props,
          data,
          filters,
          credentials,
          viewport,
          opts: { abortController },
        })
          .then((data) => {
            setCategoryData(data);
            setLoading(false);
          })
          .catch((error) => {
            if (error.name === 'AbortError') return;
            if (props.onError) props.onError(error);
          });
      } else {
        setCategoryData(null);
      }
  
      return function cleanup() {
        abortController.abort();
      };
    }
  }, [credentials, data, source.filters, viewport, props, dataExtractMode]);

  const handleSelectedCategoriesChange = useCallback((categories) => {
    setSelectedCategories(categories);
    
    if (categories && categories.length) {
      dispatch(
        addFilter({
          id: props.dataSource,
          column,
          type: FilterTypes.IN,
          values: categories,
          owner: props.id,
        })
      );
    } else {
      dispatch(
        removeFilter({
          id: props.dataSource,
          column,
        })
      );
    }
  }, [setSelectedCategories, dispatch, addFilter, removeFilter, dataExtractMode]);

  return (
    <WrapperWidgetUI title={props.title} loading={loading} {...props.wrapperProps}>
      <CategoryWidgetUI
        data={categoryData}
        formatter={props.formatter}
        labels={props.labels}
        loading={loading}
        selectedCategories={selectedCategories}
        onSelectedCategoriesChange={handleSelectedCategoriesChange}
      />
    </WrapperWidgetUI>
  );
}

CategoryWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  dataLayer: PropTypes.string,
  column: PropTypes.string.isRequired,
  operationColumn: PropTypes.string,
  operation: PropTypes.oneOf(Object.values(AggregationTypes)).isRequired,
  formatter: PropTypes.func,
  viewportFilter: PropTypes.bool,
  onError: PropTypes.func
};

CategoryWidget.defaultProps = {
  viewportFilter: false,
  wrapperProps: {}
};

export default CategoryWidget;