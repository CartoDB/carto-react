import React from 'react';
import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import Typography from '../../../src/components/atoms/Typography';
import { Map } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';

const options = {
  title: 'Atoms/Text Field',
  component: TextField,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['standard', 'filled', 'outlined']
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
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A33807'
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
  }
}));

const startAdornmentText = <InputAdornment position='start'>Kg</InputAdornment>;
const startAdornmentIcon = (
  <InputAdornment position='start'>
    <Map />
  </InputAdornment>
);
const endAdornmentText = <InputAdornment position='end'>Kg</InputAdornment>;
const endAdornmentIcon = (
  <InputAdornment position='end'>
    <Visibility />
  </InputAdornment>
);

const TextFieldBox = ({
  title,
  label,
  helperText,
  startAdornment,
  endAdornment,
  ...rest
}) => {
  const classes = useStyles();
  const startAdornmentDefault = startAdornment ? startAdornment : startAdornmentText;

  return (
    <Box className={classes.container}>
      <Typography variant='body2' className={classes.label}>
        {title}
      </Typography>
      <TextField
        {...rest}
        label={label}
        placeholder='Placeholder text'
        helperText={helperText}
        InputProps={{ startAdornment: startAdornmentDefault, endAdornment: endAdornment }}
      />
    </Box>
  );
};

const PlaygroundTemplate = (args) => <TextField {...args}></TextField>;

const VariantsTemplate = ({ ...rest }) => {
  return (
    <Grid container spacing={6}>
      <Grid item>
        <TextField
          {...rest}
          label='Filled'
          variant='filled'
          placeholder='Placeholder text'
          InputProps={{ startAdornment: startAdornmentText }}
        />
      </Grid>
      <Grid item>
        <TextField
          {...rest}
          label='Outlined'
          variant='outlined'
          placeholder='Placeholder text'
          InputProps={{ startAdornment: startAdornmentText }}
        />
      </Grid>
      <Grid item>
        <TextField
          {...rest}
          label='Standard'
          variant='standard'
          placeholder='Placeholder text'
          InputProps={{ startAdornment: startAdornmentText }}
        />
      </Grid>
    </Grid>
  );
};

const LabelAndHelperTextTemplate = ({ ...rest }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <TextFieldBox
          title='Label + helper text'
          label='Label'
          helperText='Helper text'
        />
      </Grid>
      <Grid item>
        <TextFieldBox title='Without label + helper text' />
      </Grid>
      <Grid item>
        <TextFieldBox title='Only label' label='Label' />
      </Grid>
      <Grid item>
        <TextFieldBox title='Only helper text' helperText='Helper text' />
      </Grid>
    </Grid>
  );
};

const PrefixAndSuffixTemplate = ({ ...rest }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <TextFieldBox
          title='Prefix and suffix (text)'
          label='Label'
          startAdornment={startAdornmentText}
          endAdornment={endAdornmentText}
        />
      </Grid>
      <Grid item>
        <TextFieldBox
          title='Prefix and suffix (icon)'
          label='Label'
          startAdornment={startAdornmentIcon}
          endAdornment={endAdornmentIcon}
        />
      </Grid>
      <Grid item>
        <TextFieldBox
          title='Prefix and suffix (mix)'
          label='Label'
          startAdornment={startAdornmentText}
          endAdornment={endAdornmentIcon}
        />
      </Grid>
      <Grid item>
        <TextFieldBox
          title='Only prefix'
          label='Label'
          startAdornment={startAdornmentText}
        />
      </Grid>
      <Grid item>
        <TextFieldBox title='Only suffix' label='Label' endAdornment={endAdornmentText} />
      </Grid>
      <Grid item>
        <TextFieldBox title='None' label='Label' />
      </Grid>
    </Grid>
  );
};

const InputAdornmentsMix = ({ ...rest }) => {
  return (
    <Grid container spacing={6}>
      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Empty</Typography>
        </Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item>
            <TextField label='Label' {...rest} />
          </Grid>
          <Grid item>
            <TextField
              label='Prefix'
              {...rest}
              InputProps={{ startAdornment: startAdornmentText }}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Suffix'
              {...rest}
              InputProps={{ endAdornment: endAdornmentText }}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Prefix and suffix'
              {...rest}
              InputProps={{
                startAdornment: startAdornmentText,
                endAdornment: endAdornmentText
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Active</Typography>
        </Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item>
            <TextField label='Label' {...rest} focused />
          </Grid>
          <Grid item>
            <TextField
              label='Prefix'
              {...rest}
              focused
              InputProps={{ startAdornment: startAdornmentText }}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Suffix'
              {...rest}
              focused
              InputProps={{ endAdornment: endAdornmentText }}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Prefix and suffix'
              {...rest}
              focused
              InputProps={{
                startAdornment: startAdornmentText,
                endAdornment: endAdornmentText
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Disabled</Typography>
        </Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item>
            <TextField {...rest} label='Label' disabled />
          </Grid>
          <Grid item>
            <TextField
              label='Prefix'
              {...rest}
              disabled
              InputProps={{ startAdornment: startAdornmentText }}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Suffix'
              {...rest}
              disabled
              InputProps={{ endAdornment: endAdornmentText }}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Prefix and suffix'
              {...rest}
              disabled
              InputProps={{
                startAdornment: startAdornmentText,
                endAdornment: endAdornmentText
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Has value</Typography>
        </Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item>
            <TextField label='Label' defaultValue='Hello world' {...rest} />
          </Grid>
          <Grid item>
            <TextField
              label='Prefix'
              {...rest}
              defaultValue='Hello world'
              InputProps={{ startAdornment: startAdornmentText }}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Suffix'
              {...rest}
              defaultValue='Hello world'
              InputProps={{ endAdornment: endAdornmentText }}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Prefix and suffix'
              {...rest}
              defaultValue='Hello world'
              InputProps={{
                startAdornment: startAdornmentText,
                endAdornment: endAdornmentText
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Empty Error</Typography>
        </Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item>
            <TextField label='Label' error {...rest} />
          </Grid>
          <Grid item>
            <TextField
              label='Prefix'
              {...rest}
              error
              InputProps={{ startAdornment: startAdornmentText }}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Suffix'
              {...rest}
              error
              InputProps={{ endAdornment: endAdornmentText }}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Prefix and suffix'
              {...rest}
              error
              InputProps={{
                startAdornment: startAdornmentText,
                endAdornment: endAdornmentText
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Value Error</Typography>
        </Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item>
            <TextField
              label='Label'
              error
              defaultValue='Hello world'
              InputProps={{ readOnly: true }}
              {...rest}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Prefix'
              error
              {...rest}
              defaultValue='Hello world'
              InputProps={{ startAdornment: startAdornmentText, readOnly: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Suffix'
              error
              {...rest}
              defaultValue='Hello world'
              InputProps={{ endAdornment: endAdornmentText, readOnly: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Prefix and suffix'
              error
              {...rest}
              defaultValue='Hello world'
              InputProps={{
                startAdornment: startAdornmentText,
                endAdornment: endAdornmentText,
                readOnly: true
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const commonArgs = { helperText: 'Helper text' };
const disabledControlsArgTypes = {
  variant: { table: { disable: true } },
  disabled: { table: { disable: true } },
  required: { table: { disable: true } }
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = { ...commonArgs, label: 'Label' };

export const Variants = VariantsTemplate.bind({});
Variants.args = { ...commonArgs };

export const LabelAndHelperText = LabelAndHelperTextTemplate.bind({});

export const PrefixAndSuffix = PrefixAndSuffixTemplate.bind({});

export const Medium = InputAdornmentsMix.bind({});
Medium.args = { ...commonArgs };
Medium.argTypes = disabledControlsArgTypes;

export const Small = InputAdornmentsMix.bind({});
Small.args = { ...commonArgs, size: 'small' };
Small.argTypes = disabledControlsArgTypes;
