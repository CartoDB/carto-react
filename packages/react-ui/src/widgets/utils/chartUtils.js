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
  serie.itemStyle = { color: theme.palette.black[25] };
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

// Sort data from largest to smallest
export function sortDataDescending(data) {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    return b.value - a.value;
  });

  return sortedData;
}
