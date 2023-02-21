import React from 'react';
import { Box, Grid, TextField } from '@mui/material';
import Typography from '../../../src/components/atoms/Typography';
import makeStyles from '@mui/styles/makeStyles';

const options = {
  title: 'Atoms/Text Area',
  component: TextField,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['outlined', 'filled']
      }
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium']
      }
    },
    required: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    disabled: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    error: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    label: {
      control: {
        type: 'text'
      }
    },
    placeholder: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A33542'
    },
    status: {
      type: 'validated'
    },
    storySource: {
      componentPath: '/src/theme/sections/components/forms.js'
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

const PlaygroundTemplate = (args) => <TextField {...args} multiline></TextField>;

const VariantsTemplate = ({ label, placeholder, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Filled'}
          </Typography>
          <TextField
            {...rest}
            multiline
            label={label}
            variant='filled'
            placeholder={placeholder}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Outlined'}
          </Typography>
          <TextField
            {...rest}
            multiline
            label={label}
            variant='outlined'
            placeholder={placeholder}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const LabelAndHelperTextTemplate = ({ label, placeholder, helperText, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Label + helper text'}
          </Typography>
          <TextField
            {...rest}
            multiline
            label={label}
            placeholder={placeholder}
            helperText={helperText}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Without label + helper text'}
          </Typography>
          <TextField {...rest} multiline placeholder={placeholder} />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Only label'}
          </Typography>
          <TextField {...rest} multiline label={label} placeholder={placeholder} />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Only helper text'}
          </Typography>
          <TextField
            {...rest}
            multiline
            placeholder={placeholder}
            helperText={helperText}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const SizeTemplate = ({ label, placeholder, defaultValue, helperText, ...rest }) => {
  return (
    <Grid container spacing={6}>
      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Placeholder</Typography>
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='filled'
            label={label}
            placeholder={placeholder}
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='outlined'
            label={label}
            placeholder={placeholder}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Empty</Typography>
        </Grid>
        <Grid item>
          <TextField {...rest} multiline variant='filled' label={label} />
        </Grid>
        <Grid item>
          <TextField {...rest} multiline variant='outlined' label={label} />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Filled</Typography>
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='filled'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='outlined'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Focused</Typography>
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='filled'
            label={label}
            placeholder={placeholder}
            focused
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='outlined'
            label={label}
            placeholder={placeholder}
            focused
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Focused filled</Typography>
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='filled'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            focused
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='outlined'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            focused
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Disabled</Typography>
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='filled'
            label={label}
            placeholder={placeholder}
            disabled
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='outlined'
            label={label}
            placeholder={placeholder}
            disabled
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Disabled filled</Typography>
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='filled'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='outlined'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Error</Typography>
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='filled'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='outlined'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Error filled</Typography>
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='filled'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            helperText={helperText}
            error
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            multiline
            variant='outlined'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            helperText={helperText}
            error
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const BehaviorTemplate = ({ label, placeholder, defaultValue, helperText, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Typography variant='subtitle1' className={classes.label}>
          {'Height'}
        </Typography>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Autosize'}
          </Typography>

          <TextField
            {...rest}
            multiline
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            helperText={helperText}
          />
        </Box>
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Maximum height (rows="4")'}
          </Typography>

          <TextField
            {...rest}
            multiline
            rows='4'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            helperText={helperText}
          />
        </Box>
      </Grid>

      <Grid item>
        <Typography variant='subtitle1' className={classes.label}>
          {'Width'}
        </Typography>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Default (fullWidth)'}
          </Typography>
          <TextField
            {...rest}
            multiline
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            helperText={helperText}
          />
        </Box>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'No fullWidth'}
          </Typography>
          <TextField
            {...rest}
            multiline
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            helperText={helperText}
            fullWidth={false}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const commonArgs = {
  label: 'Label text',
  placeholder: 'Placeholder text',
  helperText: 'Helper text.'
};
const sizeArgs = {
  helperText: 'This is a error message.',
  defaultValue: 'Hello world'
};

const disabledControlsVariantsArgTypes = {
  variant: { table: { disable: true } }
};
const disabledControlsSizeArgTypes = {
  variant: { table: { disable: true } },
  error: { table: { disable: true } },
  defaultValue: { table: { disable: true } }
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = { ...commonArgs };

export const Variants = VariantsTemplate.bind({});
Variants.args = { ...commonArgs };
Variants.argTypes = disabledControlsVariantsArgTypes;

export const LabelAndHelperText = LabelAndHelperTextTemplate.bind({});
LabelAndHelperText.args = { ...commonArgs };

export const Medium = SizeTemplate.bind({});
Medium.args = { ...commonArgs, ...sizeArgs, size: 'medium' };
Medium.argTypes = disabledControlsSizeArgTypes;

export const Small = SizeTemplate.bind({});
Small.args = { ...commonArgs, ...sizeArgs, size: 'small' };
Small.argTypes = disabledControlsSizeArgTypes;

export const Behavior = BehaviorTemplate.bind({});
Behavior.args = { ...commonArgs };
