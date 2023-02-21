import React from 'react';
import { Grid, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '../../../src/components/atoms/Typography';

const options = {
  title: 'Atoms/Paper',
  component: Paper,
  argTypes: {
    elevation: {
      defaultValue: 1,
      control: { type: 'range', min: 0, max: 24, step: 1 }
    },
    square: {
      control: { type: 'boolean' }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1447%3A38722'
    },
    status: {
      type: 'needUpdate'
    },
    storySource: {
      componentPath: '/src/theme/sections/components/dataDisplay.js'
    }
  }
};
export default options;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[50],

    '& .MuiPaper-root': {
      height: 100,
      width: 100
    }
  }
}));

const Template = ({ ...args }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={8} className={classes.root}>
      <PaperElementTemplate {...args} />
    </Grid>
  );
};

const PaperElementTemplate = ({ elevation, ...args }) => {
  return (
    <Grid container item spacing={2} xs={2}>
      <Grid item xs={12}>
        <Typography>{elevation}dp</Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={elevation} {...args}></Paper>
      </Grid>
    </Grid>
  );
};

const PaperTemplate = ({ ...args }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={6} className={classes.root}>
      <Grid container item direction='row' spacing={2}>
        <Grid item xs={2}>
          <Typography variant='subtitle1'>Type</Typography>
        </Grid>
        <Grid container item direction='row' spacing={6} xs='10'>
          <Grid container item spacing={2} xs={2}>
            <Grid item xs={12}>
              <Typography>Rounded</Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={1}></Paper>
            </Grid>
          </Grid>
          <Grid container item spacing={2} xs={2}>
            <Grid item xs={12}>
              <Typography>Squared</Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={1} square></Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item direction='row'>
        <Grid item xs={2}>
          <Typography variant='subtitle1'>Elevation</Typography>
        </Grid>
        <Grid container item direction='row' spacing={6} xs='10'>
          <PaperElementTemplate {...args} elevation={0} />
          <PaperElementTemplate {...args} elevation={1} />
          <PaperElementTemplate {...args} elevation={2} />
          <PaperElementTemplate {...args} elevation={4} />
          <PaperElementTemplate {...args} elevation={6} />
          <PaperElementTemplate {...args} elevation={8} />
          <PaperElementTemplate {...args} elevation={16} />
          <PaperElementTemplate {...args} elevation={24} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export const Playground = Template.bind({});
export const Default = PaperTemplate.bind({});
