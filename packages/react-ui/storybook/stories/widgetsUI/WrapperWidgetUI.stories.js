import React from 'react';
import { Typography } from '@material-ui/core';
import ColorizeIcon from '@material-ui/icons/Colorize';
import MenuIcon from '@material-ui/icons/Menu';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import WrapperWidgetUI from '.../../../src/widgets/WrapperWidgetUI';
import { buildReactPropsAsString } from '../../utils';

const options = {
  title: 'Widgets UI/WrapperWidgetUI',
  component: WrapperWidgetUI,
  argTypes: {
    actions: {
      table: { disable: true }
    },
    options: {
      table: { disable: true }
    },
    children: {
      table: { disable: true }
    }
  }
};
export default options;

const Template = (args) => (
  <WrapperWidgetUI {...args}>
    <Typography>Your Content</Typography>
  </WrapperWidgetUI>
);

export const Default = Template.bind({});
const DefaultProps = { title: 'Default wrapper' };
Default.args = DefaultProps;
Default.parameters = buildReactPropsAsString(DefaultProps, 'WrapperWidgetUI');

export const OnlyTitle = Template.bind({});
OnlyTitle.args = DefaultProps;
OnlyTitle.parameters = buildReactPropsAsString(DefaultProps, 'WrapperWidgetUI');

export const Expandable = Template.bind({});
const ExpandableProps = { title: 'Expandable', expandable: true };
Expandable.args = ExpandableProps;
Expandable.parameters = buildReactPropsAsString(ExpandableProps, 'WrapperWidgetUI');

export const NotExpandable = Template.bind({});
const NotExpandableProps = { title: 'Not Expandable', expandable: false };
NotExpandable.args = NotExpandableProps;
NotExpandable.parameters = buildReactPropsAsString(NotExpandableProps, 'WrapperWidgetUI');

export const Loading = Template.bind({});
const LoadingProps = { title: 'Loading', loading: true };
Loading.args = LoadingProps;
Loading.parameters = buildReactPropsAsString(LoadingProps, 'WrapperWidgetUI');

export const WithActions = Template.bind({});
const WithActionsProps = {
  title: 'Wrapper with actions',
  actions: [
    {
      id: 'a1',
      name: 'Autostyle',
      icon: <ColorizeIcon />,
      action: () => alert('Action!')
    }
  ]
};
WithActions.args = WithActionsProps;
WithActions.parameters = buildReactPropsAsString(WithActionsProps, 'WrapperWidgetUI');

export const WithOptions = Template.bind({});
const WithOptionsProps = {
  title: 'Wrapper with options',
  options: [
    { id: 'o1', name: 'Option 1', action: () => alert('Option 1!') },
    { id: 'o2', name: 'Option 2 too long', action: () => alert('Option 2!') },
    { id: 'o3', name: 'Option 2', action: () => alert('Option 2!') },
    { id: 'o4', name: 'Option 2 too long here', action: () => alert('Option 2!') },
    { id: 'o5', name: 'Option 2', action: () => alert('Option 2!') },
    { id: 'o6', name: 'Option 2', action: () => alert('Option 2!') },
    { id: 'o7', name: 'Option 2', action: () => alert('Option 2!') },
    { id: 'o8', name: 'Option 2', action: () => alert('Option 2!') },
    { id: 'o9', name: 'Option 2', action: () => alert('Option 2!') }
  ]
};
WithOptions.args = WithOptionsProps;
WithOptions.parameters = buildReactPropsAsString(WithOptionsProps, 'WrapperWidgetUI');

export const WithActionsAndOptions = Template.bind({});
const WithActionsAndOptionsProps = {
  title: 'Wrapper with actions and options',
  actions: [
    {
      id: 'a1',
      name: 'Autostyle',
      icon: <ColorizeIcon />,
      action: () => alert('Action!')
    }
  ],
  options: [
    { id: 'o1', name: 'Option 1', action: () => alert('Option 1!') },
    { id: 'o2', name: 'Option 2', action: () => alert('Option 2!') }
  ]
};
WithActionsAndOptions.args = WithActionsAndOptionsProps;
WithActionsAndOptions.parameters = buildReactPropsAsString(
  WithActionsAndOptionsProps,
  'WrapperWidgetUI'
);

export const WithOptionsAndCustomIcon = Template.bind({});
const WithOptionsAndCustomIconProps = {
  title: 'Wrapper with options and custom icon',
  options: [
    { id: 'o1', name: 'Option 1', action: () => alert('Option 1!') },
    { id: 'o2', name: 'Option 2', action: () => alert('Option 2!') }
  ],
  optionsIcon: <MenuIcon />
};
WithOptionsAndCustomIcon.args = WithOptionsAndCustomIconProps;
WithOptionsAndCustomIcon.parameters = buildReactPropsAsString(
  WithOptionsAndCustomIconProps,
  'WrapperWidgetUI'
);

export const WithActionsTooltip = Template.bind({});
const WithActionsTooltipProps = {
  title: 'Wrapper with actions tooltip',
  actions: [
    {
      id: 'a1',
      name: 'Autostyle',
      icon: <ColorizeIcon />,
      action: () => alert('Action!'),
      tooltip: {
        text: 'Tooltip default'
      }
    },
    {
      id: 'a2',
      name: 'Autostyle',
      icon: <AddLocationIcon />,
      action: () => alert('Action!'),
      tooltip: {
        text: 'Tooltip on bottom',
        placement: 'bottom'
      }
    }
  ]
};
WithActionsTooltip.args = WithActionsTooltipProps;
WithActionsTooltip.parameters = buildReactPropsAsString(
  WithActionsTooltipProps,
  'WrapperWidgetUI'
);
