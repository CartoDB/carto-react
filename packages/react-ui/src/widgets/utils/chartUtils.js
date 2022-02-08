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

export function calculateTextSize(text, fontSize = 8) {
  let span = document.getElementById('computedTextWidth');
  if (!span) {
    span = document.createElement('span');
    span.id = 'computedTextWidth';
    span.style.cssText = 'visibility:hidden;position: absolute;left: -999em;top:-999em;';
    document.body.appendChild(span);
  }
  span.style.fontSize = `${fontSize}px`;
  span.innerHTML = text;
  return { width: span.offsetWidth, height: span.offsetHeight };
}
