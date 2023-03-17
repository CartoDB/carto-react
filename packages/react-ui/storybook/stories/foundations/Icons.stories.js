import React from 'react';
import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Typography from '../../../src/components/atoms/Typography';
import * as Icons from '../../../src/assets';

const options = {
  title: 'Foundations/Icons',
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: [18, 24, 32, 40]
      }
    }
  },
  parameters: {
    /*     design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lVrTKiHj5zFUmCjjHF6Rc4/CARTO-Foundations?node-id=9787%3A4001'
    }, */
    status: {
      type: 'inDevelopment'
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

const Template = () => {
  const classes = useStyles();
  const AllIcons = ({ props }) => {
    const icons = Object.values(Icons);
    return icons.map((IconComponent) => <IconComponent {...props} key={IconComponent} />);
  };

  return (
    <Grid item xs={6} sm={3}>
      <Box className={classes.text}>
        <Typography variant='subtitle1'>{'Custom Icon gallery'}</Typography>
      </Box>
      {AllIcons}
    </Grid>
  );
};

export const Playground = Template.bind({});
