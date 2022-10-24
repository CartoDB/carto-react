import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const options = {
  title: 'Atoms/Spacings',
  argTypes: {
    size: {
      defaultValue: 15,
      description: 'Use `theme.spacing(number)` function',
      control: {
        type: 'select',
        options: [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 12, 15]
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lVrTKiHj5zFUmCjjHF6Rc4/CARTO-Foundations?node-id=9246%3A3930'
    },
    viewMode: 'docs'
  }
};
export default options;

const useStyles = makeStyles((theme) => ({
  text: {
    marginBottom: theme.spacing(0.5)
  },
  container: {
    marginBottom: theme.spacing(2),
    padding: 0,
    backgroundColor: theme.palette.primary.background,
    borderRadius: theme.spacing(0.5)
  }
}));

const SpacingBox = ({ size }) => {
  const theme = useTheme();
  const sizeVariant = theme.spacing(size);
  const classes = useStyles();

  return (
    <Grid item xs={4} sm={3} md={2}>
      <Box className={classes.text}>
        <Typography variant='subtitle1'>{`Spacing ${size}`}</Typography>
        <Typography variant='caption'>{sizeVariant}</Typography>
      </Box>
      <Box
        className={classes.container}
        style={{
          width: sizeVariant,
          height: sizeVariant
        }}
      />
    </Grid>
  );
};

const Template = () => {
  return (
    <Grid container direction='row'>
      <SpacingBox size={0.5} />
      <SpacingBox size={1} />
      <SpacingBox size={1.5} />
      <SpacingBox size={2} />
      <SpacingBox size={2.5} />
      <SpacingBox size={3} />
      <SpacingBox size={4} />
      <SpacingBox size={5} />
      <SpacingBox size={6} />
      <SpacingBox size={7} />
      <SpacingBox size={8} />
      <SpacingBox size={9} />
      <SpacingBox size={12} />
      <SpacingBox size={15} />
    </Grid>
  );
};

export const Playground = SpacingBox.bind({});

export const Spacings = Template.bind({});
