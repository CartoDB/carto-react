import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Typography from '../../../src/components/atoms/Typography';
import { icons } from '../../../src/assets';

const options = {
  title: 'Foundations/Carto Icons',
  argTypes: {
    fontSize: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large']
      }
    },
    color: {
      control: {
        type: 'select',
        options: [
          'action',
          'disabled',
          'primary',
          'secondary',
          'error',
          'info',
          'success',
          'warning',
          'default'
        ]
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Yj97O00yGzMg1ULcA0WEfl/CARTO-Icons?node-id=8816-2893&t=b1zTHwFjHKGCo8BC-0'
    },
    status: {
      type: 'inDevelopment'
    }
  }
};
export default options;

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1)
  }
}));

const Template = ({ ...args }) => {
  const classes = useStyles();
  const IconGallery = () => {
    const iconsList = Object.entries(icons);
    return iconsList.map(([key, Icon]) => (
      <Grid key={key} item xs={4} sm={3} className={classes.box}>
        <Icon {...args} />
        <Typography variant='body2'>{key}</Typography>
      </Grid>
    ));
  };

  return (
    <Grid container spacing={6}>
      {IconGallery()}
    </Grid>
  );
};

export const Playground = Template.bind({});
