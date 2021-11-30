import { processFormatterRes } from './formatterUtils';

export function isDataEqual(optionPrev, optionNext) {
  const dataPrev = optionPrev.series[0]?.data;
  const dataNext = optionNext.series[0].data;
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

export function defaultTooltipFormatter(xAxisFormatter, yAxisFormatter, params) {
  if (Array.isArray(params)) {
    if (params.length) {
      let message = '';
      message += `${processFormatterRes(xAxisFormatter(params[0].axisValueLabel))}`;
      params.forEach((param) => {
        const seriesName =
          params.length > 1 && param.seriesName ? param.seriesName + ': ' : '';
        const value = processFormatterRes(yAxisFormatter(param.value));
        const item = `<div style="margin-left: 8px; display: inline">${seriesName}${value}${
          param.data.unit || ''
        }</div>`;
        message += `<div style="margin-top: 4px">${param.marker}${item}</div>`;
      });
      return message;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
