import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { Layers, LocalOffer, Map, Place, Store } from '@mui/icons-material';

const options = {
  title: 'Common/Tabs',
  component: Tabs,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['standard', 'filled', 'outlined']
      }
    },
    indicatorColor: {
      default: 'primary',
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary']
      }
    },
    textColor: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary']
      }
    },
    orientation: {
      control: {
        type: 'select',
        options: ['horizontal', 'vertical']
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A33239'
    },
    status: {
      type: 'needUpdate'
    }
  }
};
export default options;

const Template = ({ ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label='tabs example' {...args}>
      <Tab label='Maps' />
      <Tab label='Layers' />
      <Tab label='Tag' />
      <Tab label='POIs' />
      <Tab label='Stores' disabled />
    </Tabs>
  );
};

const TemplateOnlyIcons = ({ ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label='tabs example' {...args}>
      <Tab icon={<Map />} />
      <Tab icon={<Layers />} />
      <Tab icon={<LocalOffer />} />
      <Tab icon={<Place />} />
      <Tab icon={<Store />} disabled />
    </Tabs>
  );
};

const TemplateIconsLabels = ({ ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label='tabs example' {...args}>
      <Tab label='Maps' icon={<Map />} />
      <Tab label='Layers' icon={<Layers />} />
      <Tab label='Tag' icon={<LocalOffer />} />
      <Tab label='POIs' icon={<Place />} />
      <Tab label='Stores' icon={<Store />} disabled />
    </Tabs>
  );
};

export const Playground = Template.bind({});
export const OnlyIcons = TemplateOnlyIcons.bind({});
export const IconsLabels = TemplateIconsLabels.bind({});
