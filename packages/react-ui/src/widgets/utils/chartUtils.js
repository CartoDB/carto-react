import { processFormatterRes } from './formatterUtils';

export function areChartPropsEqual(optionPrev, optionNext) {
  const tooltipFormatterPrev = optionPrev?.tooltip?.formatter;
  const tooltipFormatterNext = optionNext.tooltip?.formatter;
  const dataPrev = optionPrev.series[0]?.data;
  const dataNext = optionNext.series[0].data;

  if (tooltipFormatterPrev !== tooltipFormatterNext) {
    return false;
  }

  if (dataPrev && dataNext && dataPrev.length === dataNext.length) {
    return !dataNext.some(({ value }, index) => {
      return !(value === dataPrev[index].value);
    });
  }
  return false;
}

export function disableSerie(serie, theme) {
  serie.disabled = true;
  serie.itemStyle = { color: theme.palette.charts.disabled };
}

export function clearFilter(serie) {
  serie.data.forEach((item) => {
    item.disabled = false;
    setColor(item);
  });
}

export function setColor(item) {
  if (item.color) {
    item.itemStyle = { ...item.itemStyle, color: item.color };
  }
}

export function applyChartFilter(serie, clickedSerieIndex, theme) {
  const anyDisabled = serie.data.find((d) => d.disabled);

  if (!anyDisabled) {
    serie.data.forEach((d, index) => {
      if (index !== clickedSerieIndex) {
        disableSerie(d, theme);
      }
    });
  } else {
    const clickedData = serie.data[clickedSerieIndex];
    clickedData.disabled = !clickedData.disabled;
    if (clickedData.disabled) {
      disableSerie(clickedData, theme);

      const anyActive = serie.data.find((d) => !d.disabled);

      if (!anyActive) {
        clearFilter(serie);
      }
    } else {
      setColor(clickedData);
    }
  }

  return serie;
}

export function getChartSerie(chart, index) {
  const option = chart.getOption();
  const serie = option.series[index];

  return { option, serie };
}

export function getChartData(chart) {
  let data = [];
  if (chart) {
    const option = chart.getOption();
    data = option.series[0]?.data;
  }
  return data;
}

export function getElementComputedSize(text, id, fontSize = 8) {
  let span = document.getElementById(id);
  if (!span) {
    span = document.createElement('span');
    span.id = id;
    span.style.cssText = 'visibility:hidden;position: absolute;left: -999em;top:-999em;';
    document.body.appendChild(span);
  }
  span.style.fontSize = `${fontSize}px`;
  span.innerHTML = text;
  const elementWidthAndHeight = { width: span.offsetWidth, height: span.offsetHeight };
  span.remove();

  return elementWidthAndHeight;
}

// Tooltip formatter
const TOOLTIP_FORMATTER_BY_CHART_TYPE = {
  pie: () => {}
};

export function defaultTooltipFormatter(params) {
  if (!params || !params?.length) {
    return null;
  }

  if (Array.isArray(params) && params.length) {
    let message = '';
    const valueLabel = params[0].axisValueLabel || params[0].name;
    message += `${processFormatterRes(
      params.titleFormatter?.(valueLabel) ?? valueLabel
    )}`;
    message += params
      .map(({ seriesName, value, data, marker }) => {
        const formattedSeriesName = seriesName ? seriesName + ': ' : '';
        const formattedValue = processFormatterRes(
          params.valueFormatter?.(value) ?? value
        );
        const item = `<div style="margin-left: 8px; display: inline">
        ${formattedSeriesName}${formattedValue}${data.unit || ''}
        </div>`;
        return `<div style="margin-top: 4px">${marker}${item}</div>`;
      })
      .join(' ');
    return message;
  }
}
