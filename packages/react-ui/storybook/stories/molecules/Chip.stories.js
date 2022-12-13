import React from 'react';
import { Avatar, Chip, Grid, Box, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '../../../src/components/atoms/Typography';
import { FileUploadOutlined } from '@mui/icons-material';

const options = {
  title: 'Molecules/Chip',
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
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'default']
      }
    },
    deleteIcon: {
      description:
        'Override the default delete icon element. Shown only if `onDelete` is set. Type: `element`.'
    },
    disabled: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    icon: {
      description: 'Icon element. Type: `element`.'
    },
    label: {
      defaultValue: 'Chip content',
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
      control: {
        type: 'select',
        options: ['small', 'medium']
      }
    },
    variant: {
      control: {
        type: 'select',
        options: ['filled', 'outlined']
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A28895'
    },
    status: {
      type: 'readyToReview'
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
  },
  header: {
    minWidth: '200px',
    marginTop: theme.spacing(4)
  }
}));

const Template = ({ ...args }) => {
  return <Chip {...args} />;
};

const VariantsTemplate = ({ ...args }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Filled'}
          </Typography>
          <Chip {...args} />
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Outlined'}
          </Typography>
          <Chip {...args} variant='outlined' />
        </Box>
      </Grid>
    </Grid>
  );
};

const PrefixTemplate = ({ ...args }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Primary'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} avatar={<Avatar>M</Avatar>} />
            </Grid>
            <Grid item>
              <Chip {...args} variant='outlined' avatar={<Avatar>M</Avatar>} />
            </Grid>
            <Grid item>
              <Chip {...args} avatar={<Avatar label='Avatar' src='/avatar.jpeg' />} />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                variant='outlined'
                avatar={<Avatar label='Avatar' src='/avatar.jpeg' />}
              />
            </Grid>
            <Grid item>
              <Chip {...args} icon={<FileUploadOutlined />} />
            </Grid>
            <Grid item>
              <Chip {...args} variant='outlined' icon={<FileUploadOutlined />} />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Secondary'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='secondary' avatar={<Avatar>M</Avatar>} />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='secondary'
                variant='outlined'
                avatar={<Avatar>M</Avatar>}
              />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='secondary'
                avatar={<Avatar label='Avatar' src='/avatar.jpeg' />}
              />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='secondary'
                variant='outlined'
                avatar={<Avatar label='Avatar' src='/avatar.jpeg' />}
              />
            </Grid>
            <Grid item>
              <Chip {...args} color='secondary' icon={<FileUploadOutlined />} />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='secondary'
                variant='outlined'
                icon={<FileUploadOutlined />}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Default'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='default' avatar={<Avatar>M</Avatar>} />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='default'
                variant='outlined'
                avatar={<Avatar>M</Avatar>}
              />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='default'
                avatar={<Avatar label='Avatar' src='/avatar.jpeg' />}
              />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='default'
                variant='outlined'
                avatar={<Avatar label='Avatar' src='/avatar.jpeg' />}
              />
            </Grid>
            <Grid item>
              <Chip {...args} color='default' icon={<FileUploadOutlined />} />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='default'
                variant='outlined'
                icon={<FileUploadOutlined />}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const RemovableTemplate = ({ ...args }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Primary'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} variant='outlined' />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Secondary'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='secondary' />
            </Grid>
            <Grid item>
              <Chip {...args} color='secondary' variant='outlined' />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Default'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='default' />
            </Grid>
            <Grid item>
              <Chip {...args} color='default' variant='outlined' />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const ColorsTemplate = ({ ...args }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Primary'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} variant='outlined' />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Secondary'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='secondary' />
            </Grid>
            <Grid item>
              <Chip {...args} color='secondary' variant='outlined' />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Default'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='default' />
            </Grid>
            <Grid item>
              <Chip {...args} color='default' variant='outlined' />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const SizeTemplate = ({ ...args }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Typography variant='subtitle1' className={classes.header}>
          {'Primary'}
        </Typography>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Default'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} variant='outlined' />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Clickable (hover)'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} clickable />
            </Grid>
            <Grid item>
              <Chip {...args} variant='outlined' clickable />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Disabled'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} disabled />
            </Grid>
            <Grid item>
              <Chip {...args} variant='outlined' disabled />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Typography variant='subtitle1' className={classes.header}>
          {'Secondary'}
        </Typography>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Default'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='secondary' />
            </Grid>
            <Grid item>
              <Chip {...args} color='secondary' variant='outlined' />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Clickable (hover)'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='secondary' clickable />
            </Grid>
            <Grid item>
              <Chip {...args} color='secondary' variant='outlined' clickable />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Disabled'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='secondary' disabled />
            </Grid>
            <Grid item>
              <Chip {...args} color='secondary' variant='outlined' disabled />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Typography variant='subtitle1' className={classes.header}>
          {'Default'}
        </Typography>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Default'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='default' />
            </Grid>
            <Grid item>
              <Chip {...args} color='default' variant='outlined' />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Clickable (hover)'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='default' clickable />
            </Grid>
            <Grid item>
              <Chip {...args} color='default' variant='outlined' clickable />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Disabled'}
          </Typography>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='default' disabled />
            </Grid>
            <Grid item>
              <Chip {...args} color='default' variant='outlined' disabled />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const BehaviorTemplate = ({ ...args }) => {
  const classes = useStyles();
  const longLabel = 'felipegomezcases@cartodb.com';

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Overflow'}
          </Typography>
          <Grid container spacing={1}>
            <Grid item>
              <Chip
                {...args}
                label={longLabel}
                avatar={<Avatar>M</Avatar>}
                onDelete={() => {}}
              />
            </Grid>
            <Grid item>
              <Chip {...args} label={longLabel} avatar={<Avatar>M</Avatar>} />
            </Grid>
            <Grid item>
              <Chip {...args} label={longLabel} />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Hover with Tooltip'}
          </Typography>
          <Grid container spacing={1}>
            <Grid item>
              <Tooltip title={longLabel}>
                <Chip
                  {...args}
                  label={longLabel}
                  avatar={<Avatar>M</Avatar>}
                  onDelete={() => {}}
                  clickable
                />
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container} style={{ maxWidth: '600px' }}>
          <Typography variant='body2' className={classes.label}>
            {'Pairing (Grid 8px)'}
          </Typography>
          <Grid container spacing={1}>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const commonArgs = {
  label: 'Chip content'
};
const SizeArgs = {
  onDelete: () => {},
  avatar: <Avatar>M</Avatar>
};
const disabledControlsSizeArgTypes = {
  variant: { table: { disable: true } }
};

export const Playground = Template.bind({});
Playground.args = { ...commonArgs };

export const Variants = VariantsTemplate.bind({});

export const Colors = ColorsTemplate.bind({});
Colors.args = { ...commonArgs };

export const Prefix = PrefixTemplate.bind({});
Prefix.args = { ...commonArgs };

export const Removable = RemovableTemplate.bind({});
Removable.args = { onDelete: () => {} };

export const Medium = SizeTemplate.bind({});
Medium.args = { ...commonArgs, ...SizeArgs };
Medium.argTypes = disabledControlsSizeArgTypes;

export const Small = SizeTemplate.bind({});
Small.args = { ...commonArgs, ...SizeArgs, size: 'small' };
Small.argTypes = disabledControlsSizeArgTypes;

export const Behavior = BehaviorTemplate.bind({});
Behavior.args = { ...commonArgs };
