import React from 'react';
import { Box, styled, Skeleton } from '@mui/material';

import { SkeletonBarsGrid } from '../../SkeletonWidgets';
import GraphLine from '../../../assets/images/GraphLine';
import TimeSeriesLayout from './TimeSeriesLayout';
import { CHART_HEIGHT_DEFAULT, CHART_HEIGHT_FITHEIGHT } from './TimeSeriesChart';

const Controls = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end'
}));

const Graph = styled(Box)(() => ({
  position: 'relative',
  height: '100%',
  alignSelf: 'normal',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end'
}));

const MaxValue = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.25, 0, 0.5, 2)
}));

const GraphLineBox = styled(SkeletonBarsGrid)(({ theme }) => ({
  flexDirection: 'column',
  flex: 1,
  height: '100%',
  overflow: 'hidden',
  svg: {
    height: '100%',
    width: '100%',
    fontSize: 'initial',
    fill: 'none',

    path: {
      stroke: theme.palette.black[8]
    }
  }
}));

const GraphXAxis = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: theme.spacing(1.25, 0.5, 0.75, 0.5)
}));

const Legend = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(2),
  margin: 0,
  padding: theme.spacing(2.25, 0.5)
}));

const LegendItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1)
}));

const TimeSeriesSkeleton = ({
  fitHeight,
  height: heightProp,
  showControls,
  showLegend
}) => {
  const header = (
    <Box pt={1.25} pb={0.75}>
      <Skeleton width={48} height={8} />
    </Box>
  );
  const controls = showControls && (
    <Controls>
      <Box p={0.5}>
        <Skeleton width={16} height={16} />
      </Box>
      <Box mt={2} p={0.5}>
        <Skeleton width={16} height={16} />
      </Box>
      <Box mt={1} p={0.5}>
        <Skeleton width={16} height={16} />
      </Box>
    </Controls>
  );

  const height = fitHeight ? CHART_HEIGHT_FITHEIGHT : heightProp || CHART_HEIGHT_DEFAULT;

  const chart = (
    <Graph style={{ height }}>
      <MaxValue flex={0}>
        <Skeleton width={24} height={8} />
      </MaxValue>
      <GraphLineBox flex={1}>
        <GraphLine preserveAspectRatio='none' />
      </GraphLineBox>
      <GraphXAxis flex={0}>
        <Skeleton width={32} height={8} />
        <Skeleton width={32} height={8} />
      </GraphXAxis>
    </Graph>
  );

  const legend = showLegend && (
    <Legend>
      <LegendItem>
        <Skeleton width={8} height={8} />
        <Skeleton width={48} height={8} />
      </LegendItem>
      <LegendItem>
        <Skeleton width={8} height={8} />
        <Skeleton width={48} height={8} />
      </LegendItem>
    </Legend>
  );
  return (
    <TimeSeriesLayout
      fitHeight={fitHeight}
      header={header}
      controls={controls}
      chart={chart}
      legend={showLegend && legend}
    />
  );
};

export default TimeSeriesSkeleton;
