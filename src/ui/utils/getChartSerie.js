import { func } from "prop-types";

export default function getChartSerie (chart, index) {
  const option = chart.getOption();
  const serie =  option.series[index];

  return { option, serie };
};