import React from 'react';
import TimeSeriesWidgetUI from '../../../src/widgets/TimeSeriesWidgetUI/TimeSeriesWidgetUI';
import { GroupDateTypes } from '@carto/react-core';
import { TIME_SERIES_CHART_TYPES } from '@carto/react-ui';
import { Label, ThinContainer } from '../../utils/storyStyles';

const data = [
  { name: 1514761200000, value: 310 },
  { name: 1515366000000, value: 406 },
  { name: 1515970800000, value: 387 },
  { name: 1516575600000, value: 471 },
  { name: 1517180400000, value: 394 },
  { name: 1517785200000, value: 324 },
  { name: 1518390000000, value: 374 },
  { name: 1518994800000, value: 285 },
  { name: 1519599600000, value: 424 },
  { name: 1520204400000, value: 368 },
  { name: 1520809200000, value: 353 },
  { name: 1521414000000, value: 365 },
  { name: 1522015200000, value: 340 },
  { name: 1522620000000, value: 353 },
  { name: 1523224800000, value: 354 },
  { name: 1523829600000, value: 344 },
  { name: 1524434400000, value: 390 },
  { name: 1525039200000, value: 390 },
  { name: 1525644000000, value: 424 },
  { name: 1526248800000, value: 374 },
  { name: 1526853600000, value: 370 },
  { name: 1527458400000, value: 363 },
  { name: 1528063200000, value: 468 },
  { name: 1528668000000, value: 339 },
  { name: 1529272800000, value: 338 },
  { name: 1529877600000, value: 354 },
  { name: 1530482400000, value: 280 },
  { name: 1531087200000, value: 401 },
  { name: 1531692000000, value: 495 },
  { name: 1532296800000, value: 343 },
  { name: 1532901600000, value: 337 },
  { name: 1533506400000, value: 396 },
  { name: 1534111200000, value: 367 },
  { name: 1534716000000, value: 295 },
  { name: 1535320800000, value: 318 },
  { name: 1535925600000, value: 316 },
  { name: 1536530400000, value: 369 },
  { name: 1537135200000, value: 411 },
  { name: 1537740000000, value: 374 },
  { name: 1538344800000, value: 391 },
  { name: 1538949600000, value: 359 },
  { name: 1539554400000, value: 387 },
  { name: 1540159200000, value: 462 },
  { name: 1540767600000, value: 404 },
  { name: 1541372400000, value: 377 },
  { name: 1541977200000, value: 402 },
  { name: 1542582000000, value: 241 },
  { name: 1543186800000, value: 413 },
  { name: 1543791600000, value: 406 },
  { name: 1544396400000, value: 452 },
  { name: 1545001200000, value: 351 },
  { name: 1545606000000, value: 229 },
  { name: 1546210800000, value: 298 },
  { name: 1546815600000, value: 27 },
  { name: 1547420400000, value: 6 },
  { name: 1548025200000, value: 4 },
  { name: 1548630000000, value: 6 },
  { name: 1549234800000, value: 5 },
  { name: 1549839600000, value: 12 }
];

const dataSplitByCategory = data.reduce((acc, { name, value }) => {
  acc.push({ name, value, category: 'Mars' });
  acc.push({ name, value: Math.sin(name / 10000) * 30 + 30, category: 'Venus' });
  acc.push({ name, value: Math.cos(name / 700000 + 10) * 100 + 100, category: 'Earth' });
  acc.push({ name, value: Math.cos(name / 200000 + 10) * 100 + 100, category: 'Foobar - only for test' });
  acc.push({ name, value: Math.cos(name / 900000 + 10) * 100 + 100, category: 'Very long category to test for scroll support' });
  return acc;
}, []);

const options = {
  title: 'Widgets/TimeSeriesWidgetUI',
  component: TimeSeriesWidgetUI,
  argTypes: {
    data: {
      type: { required: true }
    },
    stepSize: {
      type: { required: true },
      options: Object.values(GroupDateTypes),
      control: {
        type: 'select',
        labels: Object.entries(GroupDateTypes).reduce((acc, [key, value]) => {
          acc[value] = key;
          return acc;
        }, {})
      }
    },
    chartType: {
      options: Object.values(TIME_SERIES_CHART_TYPES),
      control: {
        type: 'select',
        labels: Object.entries(TIME_SERIES_CHART_TYPES).reduce((acc, [key, value]) => {
          acc[value] = key;
          return acc;
        }, {})
      }
    },
    tooltip: {
      control: { type: 'boolean' }
    },
    tooltipFormatter: {},
    formatter: {},
    height: {},
    isPlaying: {
      description:
        '[Internal state] This prop is used to managed state outside of the component.'
    },
    onPlay: {
      description: 'Event emitted when play control is clicked.'
    },
    isPaused: {
      description:
        '[Internal state] This prop is used to managed state outside of the component.'
    },
    onPause: {
      description: 'Event emitted when pause control is clicked.'
    },
    onStop: {
      description:
        'Event emitted when stop raised. It can happen when the stop button is clicked or when animation comes to end.'
    },
    timelinePosition: {
      description: `Position (from 0 to data.length - 1) of the choosen date to filter the data.
        [Internal state] This prop is used to managed state outside of the component.`
    },
    onTimelineUpdate: {
      description:
        'Event emitted when timeline is updated. TimeSeriesWidget is responsible of applying the filter.'
    },
    timeWindow: {
      description: `Array of two UNIX timestamp (ms) that indicates the start and end of a frame to filter data. Example: [${data[0].name}, ${data[5].name}].
      [Internal state] This prop is used to managed state outside of the component.`,
      control: { type: 'array', expanded: true }
    },
    onTimeWindowUpdate: {
      description:
        'Event emitted when timeWindow is updated. TimeSeriesWidget is responsible of applying the filter.'
    },
    showLegend: {
      description:
        `Whether to show legend. By default it's shown only for if data contains multiple series.`
    }
  },
  parameters: {
    docs: {
      source: {
        type: 'auto'
      }
    }
  }
};

export default options;

const Template = (args) => {
  if (args.timeWindow && !Array.isArray(args.timeWindow)) {
    args.timeWindow = [];
  }

  const [selectedCategories, setSelectedCategories] = React.useState([]);

  return (
    <TimeSeriesWidgetUI
      {...args}
      selectedCategories={selectedCategories}
      onSelectedCategoriesChange={setSelectedCategories}
    />
  );
};

const LoadingTemplate = (args) => {
  if (args.timeWindow && !Array.isArray(args.timeWindow)) {
    args.timeWindow = [];
  }

  return (
    <>
      <Label variant='body1' mb={3}>
        {'Limited width'}
      </Label>
      <ThinContainer>
        <TimeSeriesWidgetUI {...args} />
      </ThinContainer>

      <Label variant='body1' mt={8} mb={3}>
        {'Responsive'}
      </Label>
      <TimeSeriesWidgetUI {...args} />
    </>
  );
};

const requiredProps = {
  data,
  stepSize: GroupDateTypes.WEEKS,
  timeWindow: []
};

export const Default = Template.bind({});
Default.args = requiredProps;

export const MultipleSeries = Template.bind({});
MultipleSeries.args = {
  ...requiredProps,
  data: dataSplitByCategory
};

export const Loading = LoadingTemplate.bind({});
Loading.args = { ...requiredProps, isLoading: true };
