import React from 'react';
import { Box, styled, Skeleton } from '@mui/material';

import { SkeletonBarsGrid } from '../../SkeletonWidgets';
import GraphLine from '../../../assets/images/GraphLine';
import { getSpacing } from '../../../theme/themeUtils';
import TimeSeriesLayout from './TimeSeriesLayout';

const Controls = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end'
}));

const Graph = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end'
}));

const MaxValue = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.25, 0, 0.5, 2)
}));

const GraphLineBox = styled(SkeletonBarsGrid)(({ theme }) => ({
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

//  display='flex' flexDirection='row' gap='20px' pt={1} pb={1}
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

const TimeSeriesSkeleton = ({ height, showControls, showLegend }) => {
  const header = (
    <Box pt={1.25} pb={0.75}>
      <Skeleton width={48} height={8} />
    </Box>
  );
  const controls = showControls && (
    <Controls>
      <Box>
        <Skeleton width={24} height={24} />
      </Box>
      <Box mt={2}>
        <Skeleton width={24} height={24} />
      </Box>
      <Box mt={1}>
        <Skeleton width={24} height={24} />
      </Box>
    </Controls>
  );

  const chart = (
    <Graph height={height || getSpacing(22)}>
      <MaxValue>
        <Skeleton width={24} height={8} />
      </MaxValue>
      <GraphLineBox height={`calc(100%-${getSpacing(4)})`}>
        <GraphLine preserveAspectRatio='none' />
      </GraphLineBox>
      <GraphXAxis>
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
      header={header}
      controls={controls}
      chart={chart}
      legend={showLegend && legend}
    />
  );
};

export default TimeSeriesSkeleton;
