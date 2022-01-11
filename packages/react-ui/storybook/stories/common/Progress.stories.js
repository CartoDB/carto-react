import React from 'react';
import { Box, CircularProgress, Grid, LinearProgress } from '@material-ui/core';

const options = {
  title: 'Common/Progress',
  component: CircularProgress,
  argTypes: {
    color: {
      defaultValue: 'secondary',
      control: {
        type: 'select',
        options: ['inherit', 'primary', 'secondary']
      }
    },
    size: {
      control: {
        type: ['number', 'string']
      }
    },
    thickness: {
      defaultValue: 3.6,
      control: {
        type: 'number'
      }
    },
    variant: {
      defaultValue: 'indeterminate',
      control: {
        type: 'select',
        options: ['determinate', 'indeterminate', 'static']
      }
    }
  }
};
export default options;

const Template = ({ ...args }) => {
  return (
    <Grid>
      <Box>
        <CircularProgress {...args} />
      </Box>
      <Box mt={4}>
        <LinearProgress {...args} />
      </Box>
    </Grid>
  );
};

export const Playground = Template.bind({});
