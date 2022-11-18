import React from 'react';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import { Layers, LocalOffer, Map, Place, Store } from '@mui/icons-material';
import Typography from '../../../src/components/atoms/Typography';

const options = {
  title: 'Organisms/Tabs',
  component: Tabs,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default', 'fullWidth']
      }
    },
    orientation: {
      control: {
        type: 'select',
        options: ['horizontal', 'vertical']
      }
    },
    label: {
      control: {
        type: 'text'
      }
    },
    wrapped: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A33239'
    },
    status: {
      type: 'readyToReview'
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
    <Tabs {...args} value={value} onChange={handleChange} aria-label='tabs example'>
      <Tab label='Maps' />
      <Tab label='Layers' />
      <Tab label='Tag' />
      <Tab label='POIs' />
      <Tab label='Stores' disabled />
    </Tabs>
  );
};

const TemplateIcons = ({ ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs {...args} value={value} onChange={handleChange} aria-label='tabs example'>
      <Tab icon={<Map />} />
      <Tab icon={<Layers />} />
      <Tab icon={<LocalOffer />} />
      <Tab icon={<Place />} />
      <Tab icon={<Store />} disabled />
    </Tabs>
  );
};

const TemplateIconsAndText = ({ ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs {...args} value={value} onChange={handleChange} aria-label='tabs example'>
      <Tab label='Maps' icon={<Map />} />
      <Tab label='Layers' icon={<Layers />} />
      <Tab label='Tag' icon={<LocalOffer />} />
      <Tab label='POIs' icon={<Place />} />
      <Tab label='Stores' icon={<Store />} disabled />
    </Tabs>
  );
};

const TemplateText = ({ ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs {...args} value={value} onChange={handleChange} aria-label='tabs example'>
      <Tab label='Maps' />
      <Tab label='Layers' />
      <Tab label='Tag' />
      <Tab label='POIs' />
      <Tab label='Stores' disabled />
    </Tabs>
  );
};

const TemplateWrapped = ({ ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box style={{ width: '100%', maxWidth: '534px' }}>
      <Tabs {...args} value={value} onChange={handleChange} aria-label='tabs example'>
        <Tab label='Wrapped Label' wrapped />
        <Tab label='Wrapped Label' wrapped />
        <Tab label='Wrapped Label' wrapped />
        <Tab label='Wrapped Label' wrapped />
        <Tab label='Wrapped Label' wrapped disabled />
      </Tabs>
    </Box>
  );
};

const TemplateVertical = ({ ...args }) => {
  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState(0);
  const [value3, setValue3] = React.useState(0);
  const [value4, setValue4] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };
  const handleChange3 = (event, newValue) => {
    setValue3(newValue);
  };
  const handleChange4 = (event, newValue) => {
    setValue4(newValue);
  };

  return (
    <Grid container justifyContent='space-between'>
      <Grid item>
        <TemplateIcons
          {...args}
          orientation='vertical'
          value={value}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TemplateIconsAndText
          {...args}
          orientation='vertical'
          value={value2}
          onChange={handleChange2}
        />
      </Grid>
      <Grid item>
        <TemplateText
          {...args}
          orientation='vertical'
          value={value3}
          onChange={handleChange3}
        />
      </Grid>
      <Grid item>
        <TemplateWrapped
          {...args}
          orientation='vertical'
          value={value4}
          onChange={handleChange4}
        />
      </Grid>
    </Grid>
  );
};

const BehaviorTemplate = (args) => {
  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item container direction='column' alignItems='flex-start'>
        <Typography variant='body1'>{'Hug Text'}</Typography>
        <Typography variant='body2'>{'Default behavior'}</Typography>

        <Tabs
          {...args}
          value={value}
          onChange={handleChange}
          aria-label='tabs example'
          {...args}
        >
          <Tab label='Extra Long Label' icon={<Map />} />
          <Tab label='Label' icon={<Layers />} />
          <Tab label='Long Label' icon={<LocalOffer />} />
        </Tabs>
      </Grid>

      <Grid item container direction='column' alignItems='flex-start'>
        <Typography variant='body1'>{'Fill Text'}</Typography>
        <Typography variant='body2'>
          {'"variant=`fullWidth`" with custom width limit'}
        </Typography>

        <Box style={{ width: '100%', maxWidth: '534px' }}>
          <Tabs
            {...args}
            value={value2}
            onChange={handleChange2}
            aria-label='tabs example'
            variant='fullWidth'
            {...args}
          >
            <Tab label='Extra Long Label' icon={<Map />} />
            <Tab label='Label' icon={<Layers />} />
            <Tab label='Long Label' icon={<LocalOffer />} />
          </Tabs>
        </Box>
      </Grid>
    </Grid>
  );
};

export const Playground = Template.bind({});

export const Icons = TemplateIcons.bind({});

export const IconsAndText = TemplateIconsAndText.bind({});

export const Text = TemplateText.bind({});

export const WrappedText = TemplateWrapped.bind({});

export const Vertical = TemplateVertical.bind({});

export const Behavior = BehaviorTemplate.bind({});
