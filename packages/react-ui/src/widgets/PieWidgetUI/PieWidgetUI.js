import React, { useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import ReactEcharts from '../../custom-components/echarts-for-react';
import { Box, Grid, Link, styled, useTheme } from '@mui/material';
import { disableSerie, setColor } from '../utils/chartUtils';
import { OTHERS_CATEGORY_NAME, ORDER_TYPES } from '../utils/chartConstants';
import { processFormatterRes } from '../utils/formatterUtils';
import PieSkeleton from './components/PieSkeleton';
import PieCentralText from './components/PieCentralText';
import usePieCategories from './hooks/usePieCategories';
import ChartLegend from '../ChartLegend';
import Typography from '../../components/atoms/Typography';
import useImperativeIntl from '../../hooks/useImperativeIntl';
import useSkeleton from '../useSkeleton';

const CHART_SIZE = '232px';

const OptionsBar = styled(Grid)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(0.5)
}));

const ChartContent = styled(Box, {
  shouldForwardProp: (prop) => !['height', 'width'].includes(prop)
})(({ height, width, theme }) => ({
  position: 'relative',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: width || '100%',
  height: height || '100%'
}));

const Chart = styled(ReactEcharts)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0
}));

function PieWidgetUI({
  name,
  data = [],
  formatter,
  tooltipFormatter,
  height,
  width,
  labels,
  colors,
  animation,
  filterable,
  selectedCategories,
  onSelectedCategoriesChange,
  isLoading,
  maxItems,
  order
}) {
  const theme = useTheme();
  const processedData = usePieCategories(data, order, maxItems, colors);

  const { showSkeleton } = useSkeleton(isLoading);
  const intl = useIntl();
  const intlConfig = useImperativeIntl(intl);

  // Tooltip
  const tooltipOptions = useMemo(
    () => ({
      padding: [theme.spacingValue * 0.5, theme.spacingValue],
      backgroundColor: theme.palette.black[90],
      borderColor: 'transparent',
      textStyle: { color: theme.palette.common.white },
      confine: true,
      formatter:
        !!tooltipFormatter && ((params) => tooltipFormatter({ ...params, formatter }))
    }),
    [
      theme.spacingValue,
      theme.palette.black,
      theme.palette.common.white,
      tooltipFormatter,
      formatter
    ]
  );

  // Series
  const seriesOptions = useMemo(
    () => [
      {
        type: 'pie',
        name,
        animation,
        data: processedData.map((item) => {
          // Avoid modifying data item
          const clonedItem = { ...item };

          const disabled =
            selectedCategories?.length && !selectedCategories.includes(clonedItem.name);

          if (labels?.[clonedItem.name]) {
            clonedItem.name = labels[clonedItem.name];
          }

          if (disabled) {
            disableSerie(clonedItem, theme);
            return clonedItem;
          }

          setColor(clonedItem);

          return clonedItem;
        }),
        radius: ['74%', '90%'],
        selectedOffset: 0,
        bottom: theme.spacingValue * 1.5,
        label: { show: false },
        emphasis: {
          focus: 'series',
          scaleSize: 5
        },
        itemStyle: {
          borderColor: theme.palette.background.paper,
          borderWidth: 1
        }
      }
    ],
    [name, animation, processedData, labels, selectedCategories, theme]
  );

  const options = useMemo(
    () => ({
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      tooltip: tooltipOptions,
      legend: {
        show: false
      },
      series: seriesOptions
    }),
    [tooltipOptions, seriesOptions]
  );

  const handleChartClick = useCallback(
    (params) => {
      if (onSelectedCategoriesChange) {
        const newSelectedCategories = [...selectedCategories];
        const { name } = processedData[params.dataIndex];

        // Avoid clicking if the category name is "Others"
        if (name === OTHERS_CATEGORY_NAME) {
          return;
        }

        const selectedCategoryIdx = newSelectedCategories.indexOf(name);

        if (selectedCategoryIdx === -1) {
          newSelectedCategories.push(name);
        } else {
          newSelectedCategories.splice(selectedCategoryIdx, 1);
        }

        onSelectedCategoriesChange(newSelectedCategories);
      }
    },
    [processedData, onSelectedCategoriesChange, selectedCategories]
  );

  const handleLegendClick = useCallback(
    (category) => {
      if (onSelectedCategoriesChange) {
        const newSelectedCategories = [...selectedCategories];
        const selectedCategoryIdx = newSelectedCategories.indexOf(category);

        if (selectedCategoryIdx === -1) {
          newSelectedCategories.push(category);
        } else {
          newSelectedCategories.splice(selectedCategoryIdx, 1);
        }

        onSelectedCategoriesChange(newSelectedCategories);
      }
    },
    [onSelectedCategoriesChange, selectedCategories]
  );

  const onEvents = {
    ...(filterable && { click: handleChartClick })
  };

  const handleClearSelectedCategories = () => {
    onSelectedCategoriesChange([]);
  };
  const handleClearPress = (e) => {
    if (e.keyCode === 13) {
      handleClearSelectedCategories();
    }
  };

  if (showSkeleton) return <PieSkeleton height={height} />;

  return (
    <>
      {filterable && (
        <OptionsBar container>
          <Typography variant='caption' color='textSecondary'>
            {selectedCategories.length
              ? intlConfig.formatMessage(
                  { id: 'c4r.widgets.pie.selectedItems' },
                  { items: selectedCategories.length }
                )
              : intlConfig.formatMessage({ id: 'c4r.widgets.pie.allSelected' })}
          </Typography>
          {selectedCategories.length > 0 && (
            <Link
              variant='caption'
              onClick={handleClearSelectedCategories}
              onKeyDown={handleClearPress}
              tabIndex={0}
            >
              {intlConfig.formatMessage({ id: 'c4r.widgets.pie.clear' })}
            </Link>
          )}
        </OptionsBar>
      )}

      <ChartContent height={height} width={width}>
        <PieCentralText data={processedData} selectedCategories={selectedCategories} />

        <Chart
          option={options}
          onEvents={onEvents}
          lazyUpdate={true}
          style={{ height: height, width: width }}
        />
      </ChartContent>

      {processedData.length > 0 && (
        <ChartLegend
          series={processedData}
          selectedCategories={selectedCategories}
          onCategoryClick={onSelectedCategoriesChange && handleLegendClick}
        />
      )}
    </>
  );
}

PieWidgetUI.defaultProps = {
  name: null,
  formatter: (v) => v,
  tooltipFormatter,
  colors: [],
  labels: {},
  height: CHART_SIZE,
  width: CHART_SIZE,
  animation: true,
  filterable: true,
  selectedCategories: [],
  maxItems: 11,
  order: ORDER_TYPES.RANKING
};

PieWidgetUI.propTypes = {
  name: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number
    })
  ),
  labels: PropTypes.object,
  colors: PropTypes.array,
  formatter: PropTypes.func,
  tooltipFormatter: PropTypes.func,
  height: PropTypes.string,
  width: PropTypes.string,
  animation: PropTypes.bool,
  filterable: PropTypes.bool,
  selectedCategories: PropTypes.array,
  onSelectedCategoriesChange: PropTypes.func,
  isLoading: PropTypes.bool,
  maxItems: PropTypes.number,
  order: PropTypes.oneOf(Object.values(ORDER_TYPES))
};

export default PieWidgetUI;

// Aux
function tooltipFormatter(params) {
  const value = processFormatterRes(params.formatter(params.value));

  const markerColor = params.data.color || params.textStyle.color;
  const markerStyle = `display:inline-block;border-radius:4px;width:8px;height:8px;background-color:${markerColor}`;

  return `
    <div style="white-space:normal;"><p style="max-width:${CHART_SIZE};font-size:11px;font-weight:500;line-height:1.454;text-transform:uppercase;margin:0 0 4px 0;">${params.name}</p>
    <p style="display:flex;align-items:center;font-size: 11px;font-weight:500;line-height:1.454;margin:0;"><span style="${markerStyle}"></span> <span style="margin:0 4px;font-weight:400;">${value}</span> (${params.percent}%)</p></div>
  `.trim();
}
