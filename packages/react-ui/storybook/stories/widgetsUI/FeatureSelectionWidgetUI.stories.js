import { Box, makeStyles, SvgIcon } from '@material-ui/core';
import React, { useState } from 'react';
import FeatureSelectionWidgetUI from '../../../src/widgets/FeatureSelectionWidgetUI';
import { buildReactPropsAsString } from '../../utils';

const options = {
  title: 'Widgets UI/FeatureSelectionWidgetUI',
  component: FeatureSelectionWidgetUI,
  argTypes: {
    activated: {
      control: { type: 'boolean' }
    }
  }
};

export default options;

// MODES

const CursorIcon = (
  <SvgIcon>
    <path d='m10.083 19.394.057.113a1 1 0 0 0 1.72.007l2.869-4.786 4.785-2.87a1 1 0 0 0-.12-1.777l-14-6c-.83-.356-1.669.483-1.313 1.313l6.002 14zM6.905 6.904l9.903 4.244-3.322 1.995-.102.069a1 1 0 0 0-.242.274l-1.992 3.321-4.245-9.903z' />
  </SvgIcon>
);

const PolygonIcon = (
  <SvgIcon>
    <path d='M4 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm16 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-2.829 1a2.995 2.995 0 0 0 0 2H6.829a2.995 2.995 0 0 0 0-2h10.342zm-2.463-5.707 3.998 4a3.012 3.012 0 0 0-1.414 1.414l-4-3.999a3.013 3.013 0 0 0 1.31-1.214l.106-.201zM2.998 6.829a2.995 2.995 0 0 0 2.002 0v10.342a2.995 2.995 0 0 0-2.002 0V6.83zM12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm1.84-3.919c.464.483 1.09.81 1.79.896l-1.47 2.94a2.992 2.992 0 0 0-1.79-.894l1.47-2.942zM16 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9.171.998a2.995 2.995 0 0 0 0 2.002H6.829a2.995 2.995 0 0 0 0-2.002h6.342z' />
  </SvgIcon>
);

const RectangleIcon = (
  <SvgIcon>
    <path d='M4 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm16 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-2.829 1a2.994 2.994 0 0 0-.17.974l-.001.052.007.183c.02.275.075.54.164.79H6.829a2.995 2.995 0 0 0 0-2h10.342zM2.998 6.828a2.995 2.995 0 0 0 2.002 0v10.342a2.995 2.995 0 0 0-2.002 0V6.83zm16.001 0a2.995 2.995 0 0 0 2 0v10.342a2.995 2.995 0 0 0-2 0V6.829zM20 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm13.171.998a2.994 2.994 0 0 0-.17.976L17 4.026l.007.183c.02.275.075.54.164.79H6.829a2.995 2.995 0 0 0 0-2H17.17z' />
  </SvgIcon>
);

const DRAW_MODES = [
  { id: 'polygon', label: 'polygon', icon: PolygonIcon },
  { id: 'rectangle', label: 'rectangle', icon: RectangleIcon }
];

const EDIT_MODES = [{ id: 'edit', label: 'Edit geometry', icon: CursorIcon }];

const Template = (args) => {
  const [activated, setActivated] = useState(args.activated ?? false);
  const [selectedMode, setSelectedMode] = useState(DRAW_MODES[0].id);

  return (
    <Box display='inline-block' minWidth={72}>
      <FeatureSelectionWidgetUI
        drawModes={DRAW_MODES}
        editModes={EDIT_MODES}
        {...args}
        selectedMode={selectedMode}
        onSelectMode={setSelectedMode}
        activated={activated}
        onActivatedChange={setActivated}
      />
    </Box>
  );
};

export const Default = Template.bind({});
const DefaultProps = {};
Default.args = DefaultProps;
Default.parameters = buildReactPropsAsString(DefaultProps, 'FeatureSelectionWidgetUI');

export const Activated = Template.bind({});
const ActivatedProps = {
  activated: true
};
Activated.args = ActivatedProps;
Activated.parameters = buildReactPropsAsString(
  ActivatedProps,
  'FeatureSelectionWidgetUI'
);

export const WithoutEdit = Template.bind({});
const WithoutEditProps = {
  editModes: []
};
WithoutEdit.args = WithoutEditProps;
WithoutEdit.parameters = buildReactPropsAsString(
  WithoutEditProps,
  'FeatureSelectionWidgetUI'
);

export const WithGeometry = Template.bind({});
const WithGeometryProps = {
  geometries: [{ geometry: 1 }],
  onSelectGeometry: (geometry) => console.log('onSelectGeometry', geometry),
  onDeleteGeometry: (geometry) => console.log('onDeleteGeometry', geometry)
};
WithGeometry.args = WithGeometryProps;
WithGeometry.parameters = buildReactPropsAsString(
  WithGeometryProps,
  'FeatureSelectionWidgetUI'
);

export const WithMultipleGeometries = Template.bind({});
const WithMultipleGeometriesProps = {
  geometries: [
    { type: 'Polygon', coordinates: [] },
    { type: 'Polygon', coordinates: [] }
  ],
  onSelectGeometry: (geometry) => console.log('onSelectGeometry', geometry),
  onDeleteGeometry: (geometry) => console.log('onDeleteGeometry', geometry)
};
WithMultipleGeometries.args = WithMultipleGeometriesProps;
WithMultipleGeometries.parameters = buildReactPropsAsString(
  WithMultipleGeometriesProps,
  'FeatureSelectionWidgetUI'
);

export const WithGeometriesUsingCustomLabels = Template.bind({});
const WithGeometriesUsingCustomLabelsProps = {
  geometries: [
    {
      type: 'Feature',
      geometry: { type: 'Polygon', coordinates: [] },
      properties: { label: 'The first polygon' }
    },
    {
      type: 'Feature',
      geometry: { type: 'Polygon', coordinates: [] },
      properties: { label: 'The second polygon' }
    }
  ],
  onSelectGeometry: (geometry) => console.log('onSelectGeometry', geometry),
  onDeleteGeometry: (geometry) => console.log('onDeleteGeometry', geometry)
};
WithGeometriesUsingCustomLabels.args = WithGeometriesUsingCustomLabelsProps;
WithGeometriesUsingCustomLabels.parameters = buildReactPropsAsString(
  WithGeometriesUsingCustomLabelsProps,
  'FeatureSelectionWidgetUI'
);
