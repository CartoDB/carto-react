import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Typography from '../../../src/components/atoms/Typography';

const options = {
  title: 'Foundations/Borders',
  argTypes: {
    size: {
      defaultValue: 1,
      description: 'Use `theme.spacing(number)` function',
      control: {
        type: 'select',
        options: [0.5, 1, 1.5, 2]
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lVrTKiHj5zFUmCjjHF6Rc4/CARTO-Foundations?node-id=9787%3A4001'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const useStyles = makeStyles((theme) => ({
  text: {
    marginBottom: theme.spacing(0.5)
  },
  container: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(2),
    padding: 0,
    backgroundColor: theme.palette.primary.background,
    border: `1px solid ${theme.palette.primary.main}`
  }
}));

const BorderBox = ({ size }) => {
  const theme = useTheme();
  const sizeVariant = theme.spacing(size);
  const classes = useStyles();

  return (
    <Grid item xs={6} sm={3}>
      <Box className={classes.text}>
        <Typography variant='subtitle1'>{`Border Radius ${size}`}</Typography>
        <Typography variant='caption'>{sizeVariant}</Typography>
      </Box>
      <Box
        className={classes.container}
        style={{
          borderRadius: sizeVariant
        }}
      />
    </Grid>
  );
};

const Template = () => {
  return (
    <Grid container>
      <BorderBox size={0.5} />
      <BorderBox size={1} />
      <BorderBox size={1.5} />
      <BorderBox size={2} />
    </Grid>
  );
};

export const Playground = BorderBox.bind({});

export const BorderRadius = Template.bind({});
