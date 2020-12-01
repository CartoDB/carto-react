
export function dataEqual(optionPrev, optionNext) {
  const dataPrev = optionPrev.series[0].data;
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

export function clearFilter (serie) {
  serie.data.forEach((d) => {
    d.disabled = false;
    setColor(d);
  });
}

export function setColor(d) {
  if (d.color) {
    d.itemStyle = { ...d.itemStyle, color: d.color };
  } else {
    delete d.itemStyle;
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