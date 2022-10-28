import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const options = {
  title: 'Foundations/Breakpoints',
  argTypes: {
    breakpoint: {
      defaultValue: '100%',
      control: {
        type: 'select',
        options: [320, 600, 960, 1280, 1600],
        labels: {
          320: 'xs',
          600: 'sm',
          960: 'md',
          1280: 'lg',
          1600: 'xl'
        }
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lVrTKiHj5zFUmCjjHF6Rc4/CARTO-Foundations?node-id=10472%3A3871'
    },
    viewMode: 'docs'
  }
};
export default options;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.spacing(6),
    marginBottom: theme.spacing(2),
    padding: 0,
    backgroundColor: theme.palette.primary.background,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(0.5)
  }
}));

const BreakpointBox = ({ breakpoint }) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.container}
      style={{
        width: breakpoint
      }}
    >
      <Typography variant={'subtitle1'}>{breakpoint}</Typography>
    </Box>
  );
};

export const Breakpoints = BreakpointBox.bind({});
