import React from 'react';
import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import { EuroOutlined, InfoOutlined, MapOutlined } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '../../../src/components/atoms/Typography';
import PasswordField from '../../../src/components/atoms/PasswordField';

const options = {
  title: 'Atoms/Text Field',
  component: TextField,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['outlined', 'filled', 'standard']
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
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A33807'
    },
    status: {
      type: 'validated'
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

const startAdornmentText = <InputAdornment position='start'>Kg</InputAdornment>;
const startAdornmentIcon = (
  <InputAdornment position='start'>
    <MapOutlined />
  </InputAdornment>
);
const endAdornmentText = <InputAdornment position='end'>Kg</InputAdornment>;
const endAdornmentIcon = (
  <InputAdornment position='end'>
    <InfoOutlined />
  </InputAdornment>
);

const PlaygroundTemplate = (args) => <TextField {...args}></TextField>;

const VariantsTemplate = ({ label, placeholder, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Filled'}
          </Typography>
          <TextField {...rest} label={label} variant='filled' placeholder={placeholder} />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Outlined'}
          </Typography>
          <TextField
            {...rest}
            label={label}
            variant='outlined'
            placeholder={placeholder}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Standard'}
          </Typography>
          <TextField
            {...rest}
            label={label}
            variant='standard'
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
          <TextField {...rest} placeholder={placeholder} />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Only label'}
          </Typography>
          <TextField {...rest} label={label} placeholder={placeholder} />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Only helper text'}
          </Typography>
          <TextField {...rest} placeholder={placeholder} helperText={helperText} />
        </Box>
      </Grid>
    </Grid>
  );
};

const PrefixAndSuffixTemplate = ({
  label,
  placeholder,
  startAdornment,
  endAdornment,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Prefix and suffix (text)'}
          </Typography>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            InputProps={{
              startAdornment: startAdornmentText,
              endAdornment: endAdornmentText
            }}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Prefix and suffix (icon)'}
          </Typography>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            InputProps={{
              startAdornment: startAdornmentIcon,
              endAdornment: endAdornmentIcon
            }}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Prefix and suffix (mix)'}
          </Typography>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            InputProps={{
              startAdornment: startAdornmentText,
              endAdornment: endAdornmentIcon
            }}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Only prefix'}
          </Typography>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            InputProps={{
              startAdornment: startAdornmentText
            }}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Only suffix'}
          </Typography>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            InputProps={{
              endAdornment: endAdornmentText
            }}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'None'}
          </Typography>
          <TextField {...rest} label={label} placeholder={placeholder} />
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
          <TextField {...rest} variant='filled' label={label} placeholder={placeholder} />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='standard'
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
          <TextField {...rest} variant='filled' label={label} />
        </Grid>
        <Grid item>
          <TextField {...rest} variant='outlined' label={label} />
        </Grid>
        <Grid item>
          <TextField {...rest} variant='standard' label={label} />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Filled</Typography>
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='standard'
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
            variant='filled'
            label={label}
            placeholder={placeholder}
            focused
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            focused
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='standard'
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
            variant='outlined'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            focused
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='standard'
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
            variant='filled'
            label={label}
            placeholder={placeholder}
            disabled
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            disabled
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='standard'
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
            variant='outlined'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='standard'
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
            variant='outlined'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='standard'
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
            variant='outlined'
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
            variant='standard'
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

const PasswordFieldTemplate = ({
  label,
  placeholder,
  defaultValue,
  helperText,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Default'}
          </Typography>
          <TextField
            {...rest}
            label='Password'
            placeholder={placeholder}
            defaultValue='1234'
            helperText={helperText}
            type='password'
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Custom component'}
          </Typography>
          <PasswordField
            {...rest}
            label='Password'
            placeholder={placeholder}
            defaultValue='1234'
            helperText={helperText}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const BehaviorTemplate = ({ label, placeholder, defaultValue, helperText, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Typography variant='subtitle1' className={classes.label}>
          {'Overflow'}
        </Typography>
        <Box className={classes.container} style={{ maxWidth: '440px' }}>
          <Typography variant='body2' className={classes.label}>
            {'Default'}
          </Typography>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            defaultValue='felipegutierrezsoriano@cartodb.com'
          />
        </Box>
      </Grid>

      <Grid item>
        <Typography variant='subtitle1' className={classes.label}>
          {'Grouping'}
        </Typography>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Pairing'}
          </Typography>

          <TextField {...rest} label={label} placeholder={placeholder} />
          <TextField {...rest} label={label} placeholder={placeholder} />
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
            label={label}
            placeholder={placeholder}
            defaultValue='felipegutierrezsoriano@cartodb.com'
          />
        </Box>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'No fullWidth'}
          </Typography>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            defaultValue='felipegutierrezsoriano@cartodb.com'
            fullWidth={false}
          />
        </Box>
      </Grid>

      <Grid item>
        <Typography variant='subtitle1' className={classes.label}>
          {'Types'}
        </Typography>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Examples'}
          </Typography>

          <TextField
            {...rest}
            label='Name'
            placeholder={placeholder}
            defaultValue='Felipe'
            helperText={helperText}
          />
          <TextField
            {...rest}
            label='Amount'
            placeholder={placeholder}
            defaultValue='3560'
            type='number'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <EuroOutlined />
                </InputAdornment>
              )
            }}
            helperText={helperText}
          />
          <PasswordField
            {...rest}
            label='Password'
            placeholder={placeholder}
            defaultValue='1234'
            helperText={helperText}
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

export const PrefixAndSuffix = PrefixAndSuffixTemplate.bind({});
PrefixAndSuffix.args = { ...commonArgs };

export const Medium = SizeTemplate.bind({});
Medium.args = { ...commonArgs, ...sizeArgs, size: 'medium' };
Medium.argTypes = disabledControlsSizeArgTypes;

export const Small = SizeTemplate.bind({});
Small.args = { ...commonArgs, ...sizeArgs, size: 'small' };
Small.argTypes = disabledControlsSizeArgTypes;

export const Password = PasswordFieldTemplate.bind({});
Password.args = { ...commonArgs };

export const Behavior = BehaviorTemplate.bind({});
Behavior.args = { ...commonArgs };
