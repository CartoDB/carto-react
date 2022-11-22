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
    },
    disabled: {
      defaultValue: true,
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

const Template = ({ label, wrapped, disabled, ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs {...args} value={value} onChange={handleChange} aria-label='tabs example'>
      <Tab label={label} wrapped={wrapped} />
      <Tab label={label} wrapped={wrapped} />
      <Tab label={label} wrapped={wrapped} />
      <Tab label={label} wrapped={wrapped} />
      <Tab label={label} wrapped={wrapped} disabled={disabled} />
    </Tabs>
  );
};

const TemplateIcons = ({ label, wrapped, disabled, ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs {...args} value={value} onChange={handleChange} aria-label='tabs example'>
      <Tab icon={<Map />} label={label} wrapped={wrapped} />
      <Tab icon={<Layers />} label={label} wrapped={wrapped} />
      <Tab icon={<LocalOffer />} label={label} wrapped={wrapped} />
      <Tab icon={<Place />} label={label} wrapped={wrapped} />
      <Tab icon={<Store />} label={label} wrapped={wrapped} disabled={disabled} />
    </Tabs>
  );
};

const TemplateIconsAndText = ({ label, wrapped, disabled, ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs {...args} value={value} onChange={handleChange} aria-label='tabs example'>
      <Tab icon={<Map />} label={label} wrapped={wrapped} />
      <Tab icon={<Layers />} label={label} wrapped={wrapped} />
      <Tab icon={<LocalOffer />} label={label} wrapped={wrapped} />
      <Tab icon={<Place />} label={label} wrapped={wrapped} />
      <Tab icon={<Store />} label={label} wrapped={wrapped} disabled={disabled} />
    </Tabs>
  );
};

const TemplateText = ({ label, wrapped, disabled, ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs {...args} value={value} onChange={handleChange} aria-label='tabs example'>
      <Tab label={label} wrapped={wrapped} />
      <Tab label={label} wrapped={wrapped} />
      <Tab label={label} wrapped={wrapped} />
      <Tab label={label} wrapped={wrapped} />
      <Tab label={label} wrapped={wrapped} disabled={disabled} />
    </Tabs>
  );
};

const TemplateWrapped = ({ label, wrapped, disabled, ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs {...args} value={value} onChange={handleChange} aria-label='tabs example'>
      <Tab label={label} wrapped={wrapped} />
      <Tab label={label} wrapped={wrapped} />
      <Tab label={label} wrapped={wrapped} disabled={disabled} />
    </Tabs>
  );
};

const TemplateVertical = ({ label, wrapped, disabled, ...args }) => {
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
        <Tabs
          {...args}
          orientation='vertical'
          value={value}
          onChange={handleChange}
          aria-label='tabs example'
        >
          <Tab icon={<Map />} />
          <Tab icon={<Layers />} />
          <Tab icon={<LocalOffer />} />
          <Tab icon={<Place />} />
          <Tab icon={<Store />} disabled={disabled} />
        </Tabs>
      </Grid>
      <Grid item>
        <Tabs
          {...args}
          orientation='vertical'
          value={value2}
          onChange={handleChange2}
          aria-label='tabs example'
        >
          <Tab icon={<Map />} label={label} wrapped={wrapped} />
          <Tab icon={<Layers />} label={label} wrapped={wrapped} />
          <Tab icon={<LocalOffer />} label={label} wrapped={wrapped} />
          <Tab icon={<Place />} label={label} wrapped={wrapped} />
          <Tab icon={<Store />} label={label} wrapped={wrapped} disabled={disabled} />
        </Tabs>
      </Grid>
      <Grid item>
        <Tabs
          {...args}
          orientation='vertical'
          value={value3}
          onChange={handleChange3}
          aria-label='tabs example'
        >
          <Tab label={label} wrapped={wrapped} />
          <Tab label={label} wrapped={wrapped} />
          <Tab label={label} wrapped={wrapped} />
          <Tab label={label} wrapped={wrapped} />
          <Tab label={label} wrapped={wrapped} disabled={disabled} />
        </Tabs>
      </Grid>
      <Grid item>
        <Tabs
          {...args}
          orientation='vertical'
          value={value4}
          onChange={handleChange4}
          aria-label='tabs example'
        >
          <Tab label='Wrapped Label used for a very long text' wrapped />
          <Tab label='Wrapped Label used for a very long text' wrapped />
          <Tab
            label='Wrapped Label used for a very long text'
            wrapped
            disabled={disabled}
          />
        </Tabs>
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

const commonArgs = { label: 'Label', disabled: true };
const disabledControlsVerticalArgTypes = {
  orientation: { table: { disable: true } },
  variant: { table: { disable: true } }
};
const disabledControlsBehaviorArgTypes = {
  label: { table: { disable: true } },
  wrapped: { table: { disable: true } },
  variant: { table: { disable: true } },
  disabled: { table: { disable: true } }
};

export const Playground = Template.bind({});
Playground.args = { ...commonArgs };

export const Icons = TemplateIcons.bind({});

export const IconsAndText = TemplateIconsAndText.bind({});
IconsAndText.args = { ...commonArgs };

export const Text = TemplateText.bind({});
Text.args = { ...commonArgs };

export const WrappedText = TemplateWrapped.bind({});
WrappedText.args = { label: 'Wrapped Label used for a very long text', wrapped: true };

export const Vertical = TemplateVertical.bind({});
Vertical.args = { ...commonArgs, orientation: 'vertical' };
Vertical.argTypes = disabledControlsVerticalArgTypes;

export const Behavior = BehaviorTemplate.bind({});
Behavior.argTypes = disabledControlsBehaviorArgTypes;
