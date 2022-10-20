import React from 'react';
import { Avatar, Chip, Grid } from '@mui/material';

const options = {
  title: 'Common/Chip',
  component: Chip,
  argTypes: {
    avatar: {
      description: 'Avatar element. Type: `element`.'
    },
    clickable: {
      defaultValue: false,
      description:
        'If `true`, the chip will appear clickable, and will raise when pressed, even if the onClick prop is not defined. If false, the chip will not be clickable, even if onClick prop is defined. This can be used, for example, along with the component prop to indicate an anchor Chip is clickable.',
      control: {
        type: 'boolean'
      }
    },
    color: {
      defaultValue: 'default',
      description:
        'The color of the component. It supports those theme colors that make sense for this component.',
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary']
      }
    },
    deleteIcon: {
      description:
        'Override the default delete icon element. Shown only if `onDelete` is set. Type: `element`.'
    },
    disabled: {
      defaultValue: false,
      description: 'If `true`, the chip should be displayed in a disabled state.',
      control: {
        type: 'boolean'
      }
    },
    icon: {
      description: 'Icon element. Type: `element`.'
    },
    label: {
      defaultValue: 'Chip content',
      description: 'The content of the label.',
      control: {
        type: 'text'
      }
    },
    onDelete: {
      description:
        'Callback function fired when the delete icon is clicked. If set, the delete icon will be shown.',
      defaultValue: null
    },
    size: {
      defaultValue: 'medium',
      description: 'The size of the chip.',
      control: {
        type: 'select',
        options: ['small', 'medium']
      }
    },
    variant: {
      defaultValue: 'default',
      description: 'The variant to use.',
      control: {
        type: 'select',
        options: ['default', 'outlined']
      }
    }
  }
};
export default options;

// const Template = ({ ...args }) => {
//   return <Chip { ...args } />
// };
const Template = ({ ...args }) => {
  return (
    <Grid container direction='row' alignItems='center'>
      <Grid item xs={3}>
        <Chip {...args} color='primary' />
      </Grid>
      <Grid item xs={3}>
        <Chip {...args} color='secondary' />
      </Grid>
      <Grid item xs={3}>
        <Chip {...args} color='default' />
      </Grid>

      <Grid item xs={3}>
        <Chip {...args} variant='outlined' />
      </Grid>
    </Grid>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Removable = Template.bind({});
Removable.args = { onDelete: () => {} };

export const Thumbnail = Template.bind({});
Thumbnail.args = { avatar: <Avatar>M</Avatar> };

export const ThumbnailRemovable = Template.bind({});
ThumbnailRemovable.args = { avatar: <Avatar>M</Avatar>, onDelete: () => {} };

export const SizeSmall = Template.bind({});
SizeSmall.args = { size: 'small' };

export const SizeSmallRemovable = Template.bind({});
SizeSmallRemovable.args = { size: 'small', onDelete: () => {} };

export const SizeSmallThumbnail = Template.bind({});
SizeSmallThumbnail.args = { size: 'small', avatar: <Avatar>M</Avatar> };

export const SizeSmallThumbnailRemovable = Template.bind({});
SizeSmallThumbnailRemovable.args = {
  size: 'small',
  avatar: <Avatar>M</Avatar>,
  onDelete: () => {}
};
