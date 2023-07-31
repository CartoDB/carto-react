import React from 'react';
import LegendIcon from '../../../../src/widgets/legend/LegendIcon';

const ICON = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxkZWZzPgogICAgICAgIDxmaWx0ZXIgaWQ9InFsbTY3aXI1MWEiPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlR3JhcGhpYyIgdmFsdWVzPSIwIDAgMCAwIDAuMTcyNTQ5IDAgMCAwIDAgMC4xODgyMzUgMCAwIDAgMCAwLjE5NjA3OCAwIDAgMCAxLjAwMDAwMCAwIi8+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnPgogICAgICAgICAgICA8ZyBmaWx0ZXI9InVybCgjcWxtNjdpcjUxYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNDIgLTQ2NCkgdHJhbnNsYXRlKDIyMiA0NDgpIj4KICAgICAgICAgICAgICAgIDxnIGZpbGw9IiMyQzMwMzIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwIDE2KSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEyIDBjNi42MjcgMCAxMiA1LjM3MyAxMiAxMnMtNS4zNzMgMTItMTIgMTJTMCAxOC42MjcgMCAxMiA1LjM3MyAwIDEyIDB6IiBvcGFjaXR5PSIuMiIvPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjQiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==`;

const DEFAULT_LEGEND = {
  legend: {
    labels: ['Category 1', 'Category 2', 'Category 3'],
    icons: [ICON, ICON, ICON]
  }
};

const options = {
  title: 'Widgets/Legends/LegendIcon',
  component: LegendIcon,
  argTypes: {
    legend: {}
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
  return <LegendIcon {...args} />;
};

export const Default = Template.bind({});
const DefaultProps = { ...DEFAULT_LEGEND };
Default.args = DefaultProps;
