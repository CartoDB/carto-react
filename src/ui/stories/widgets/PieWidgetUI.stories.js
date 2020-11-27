import React from 'react';
import PieWidgetUI from '../../widgets/PieWidgetUI';

// This default export determines where your story goes in the story list
export default {
  title: 'Widgets/PieWidgetUI',
  component: PieWidgetUI,
};

const dataDefault = [
  { name: 'Women', value: 101, color: '#31996b' },
  // { name: 'Women', value: 101, color: '#31996b', label: { show: true } },
  { name: 'Men', value: 100, color: '#cbcdcf' },
];

const dataCustom = [
  { name: 'Dogs', value: 100, color: '#7f3c8d' },
  { name: 'Cats', value: 120, color: '#11a579' },
  { name: 'Rabbits', value: 150, color: '#3969ac' },
  { name: 'Canaries', value: 90, color: '#f2b701' },
  { name: 'Passerines', value: 200, color: '#e73f74' },
];

const Template = (args) => <PieWidgetUI {...args} />;

export const Default = Template.bind({});
Default.args = { data: dataDefault };

export const Custom = Template.bind({});
Custom.args = { data: dataCustom };