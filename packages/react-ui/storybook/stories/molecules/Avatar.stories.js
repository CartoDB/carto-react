import React from 'react';
import { Grid, Box, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Star } from '@mui/icons-material';
import { getCartoColorStylePropsForItem, Typography, Avatar } from '@carto/react-ui';

const options = {
  title: 'Molecules/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['large', 'medium', 'small', 'xsmall']
      }
    },
    variant: {
      control: {
        type: 'select',
        options: ['circular', 'rounded', 'square']
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1925%3A30532&t=Y3JoU7theewbWKOW-0'
    },
    status: {
      type: 'inDevelopment'
    }
  }
};
export default options;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(4)
  },
  standalone: {
    display: 'flex',
    justifyContent: 'center'
  },
  label: {
    minWidth: '200px'
  }
}));

const Template = ({ ...args }) => {
  return <Avatar {...args} />;
};

const ShapeTemplate = ({ ...args }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Circular'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Square'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} variant='square' />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Rounded'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} variant='rounded' />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const ContentTemplate = ({ ...args }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Default'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Image'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} src='/avatar.jpeg' />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Initial'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args}>M</Avatar>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Icon'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args}>
                <Star />
              </Avatar>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const ShapeSizeTemplate = ({ ...args }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Large'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} size='large' />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='square' size='large' />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='rounded' size='large' />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Medium'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='square' />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='rounded' />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Small'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} size='small' />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='square' size='small' />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='rounded' size='small' />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Extra Small'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} size='xsmall' />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='square' size='xsmall' />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='rounded' size='xsmall' />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const ContentSizeTemplate = ({ ...args }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Large'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} size='large' />
            </Grid>
            <Grid item>
              <Avatar {...args} src='/avatar.jpeg' size='large' />
            </Grid>
            <Grid item>
              <Avatar {...args} size='large'>
                M
              </Avatar>
            </Grid>
            <Grid item>
              <Avatar {...args} size='large'>
                <Star />
              </Avatar>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Medium'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} />
            </Grid>
            <Grid item>
              <Avatar {...args} src='/avatar.jpeg' />
            </Grid>
            <Grid item>
              <Avatar {...args}>M</Avatar>
            </Grid>
            <Grid item>
              <Avatar {...args}>
                <Star />
              </Avatar>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Small'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} size='small' />
            </Grid>
            <Grid item>
              <Avatar {...args} src='/avatar.jpeg' size='small' />
            </Grid>
            <Grid item>
              <Avatar {...args} size='small'>
                M
              </Avatar>
            </Grid>
            <Grid item>
              <Avatar {...args} size='small'>
                <Star />
              </Avatar>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Extra Small'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} size='xsmall' />
            </Grid>
            <Grid item>
              <Avatar {...args} src='/avatar.jpeg' size='xsmall' />
            </Grid>
            <Grid item>
              <Avatar {...args} size='xsmall'>
                M
              </Avatar>
            </Grid>
            <Grid item>
              <Avatar {...args} size='xsmall'>
                <Star />
              </Avatar>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const ColorBackgroundTemplate = ({ ...args }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Carto qualitative bold'}
          </Typography>
          <Grid container item spacing={6}>
            {[...Array(15)].map((x, index) => (
              <Grid item key={index}>
                <Avatar
                  {...args}
                  style={{
                    ...getCartoColorStylePropsForItem(theme, index)
                  }}
                >{`C${index + 1}`}</Avatar>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
export const Playground = Template.bind({});

export const Shape = ShapeTemplate.bind({});

export const Content = ContentTemplate.bind({});

export const ShapeSizes = ShapeSizeTemplate.bind({});

export const ContentSize = ContentSizeTemplate.bind({});

export const ColorBackground = ColorBackgroundTemplate.bind({});
