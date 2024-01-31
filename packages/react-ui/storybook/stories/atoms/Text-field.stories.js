import { EuroOutlined, InfoOutlined, MapOutlined } from '@mui/icons-material';
import { Grid, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import PasswordField from '../../../src/components/atoms/PasswordField';
import Typography from '../../../src/components/atoms/Typography';
import { Container, DocContainer, DocHighlight, Label } from '../../utils/storyStyles';

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
    readOnly: {
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

const PlaygroundTemplate = ({ readOnly, ...args }) => (
  <TextField {...args} InputProps={{ readOnly: readOnly }}></TextField>
);

const VariantsTemplate = ({ label, placeholder, readOnly, ...rest }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Filled'}</Label>
          <TextField
            {...rest}
            label={label}
            variant='filled'
            placeholder={placeholder}
            InputProps={{ readOnly: readOnly }}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Outlined'}</Label>
          <TextField
            {...rest}
            label={label}
            variant='outlined'
            placeholder={placeholder}
            InputProps={{ readOnly: readOnly }}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Standard'}</Label>
          <TextField
            {...rest}
            label={label}
            variant='standard'
            placeholder={placeholder}
            InputProps={{ readOnly: readOnly }}
          />
        </Container>
      </Grid>
    </Grid>
  );
};

const LabelAndHelperTextTemplate = ({
  label,
  placeholder,
  helperText,
  readOnly,
  ...rest
}) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Label + helper text'}</Label>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            InputProps={{ readOnly: readOnly }}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Without label + helper text'}</Label>
          <TextField
            {...rest}
            placeholder={placeholder}
            InputProps={{ readOnly: readOnly }}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only label'}</Label>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            InputProps={{ readOnly: readOnly }}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only helper text'}</Label>
          <TextField
            {...rest}
            placeholder={placeholder}
            helperText={helperText}
            InputProps={{ readOnly: readOnly }}
          />
        </Container>
      </Grid>
    </Grid>
  );
};

const PrefixAndSuffixTemplate = ({
  label,
  placeholder,
  startAdornment,
  endAdornment,
  readOnly,
  ...rest
}) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Prefix and suffix (text)'}</Label>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            InputProps={{
              startAdornment: startAdornmentText,
              endAdornment: endAdornmentText,
              readOnly: readOnly
            }}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Prefix and suffix (icon)'}</Label>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            InputProps={{
              startAdornment: startAdornmentIcon,
              endAdornment: endAdornmentIcon,
              readOnly: readOnly
            }}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Prefix and suffix (mix)'}</Label>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            InputProps={{
              startAdornment: startAdornmentText,
              endAdornment: endAdornmentIcon,
              readOnly: readOnly
            }}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only prefix'}</Label>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            InputProps={{
              startAdornment: startAdornmentText,
              readOnly: readOnly
            }}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only suffix'}</Label>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            InputProps={{
              endAdornment: endAdornmentText,
              readOnly: readOnly
            }}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'None'}</Label>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            InputProps={{ readOnly: readOnly }}
          />
        </Container>
      </Grid>
    </Grid>
  );
};

const SizeTemplate = ({
  label,
  placeholder,
  defaultValue,
  helperText,
  readOnly,
  ...rest
}) => {
  return (
    <Grid container spacing={6}>
      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Placeholder</Typography>
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            InputProps={{ readOnly: readOnly }}
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            InputProps={{ readOnly: readOnly }}
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='standard'
            label={label}
            placeholder={placeholder}
            InputProps={{ readOnly: readOnly }}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Empty</Typography>
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='filled'
            label={label}
            InputProps={{ readOnly: readOnly }}
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='outlined'
            label={label}
            InputProps={{ readOnly: readOnly }}
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='standard'
            label={label}
            InputProps={{ readOnly: readOnly }}
          />
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
            InputProps={{ readOnly: readOnly }}
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            InputProps={{ readOnly: readOnly }}
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='standard'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            InputProps={{ readOnly: readOnly }}
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
            InputProps={{ readOnly: readOnly }}
            focused
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            InputProps={{ readOnly: readOnly }}
            focused
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='standard'
            label={label}
            placeholder={placeholder}
            InputProps={{ readOnly: readOnly }}
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
            InputProps={{ readOnly: readOnly }}
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
            InputProps={{ readOnly: readOnly }}
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
            InputProps={{ readOnly: readOnly }}
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
          <Typography>Read Only</Typography>
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            variant='standard'
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            InputProps={{ readOnly: true }}
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
            InputProps={{ readOnly: readOnly }}
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
            InputProps={{ readOnly: readOnly }}
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
            InputProps={{ readOnly: readOnly }}
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
            InputProps={{ readOnly: readOnly }}
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
            InputProps={{ readOnly: readOnly }}
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
            InputProps={{ readOnly: readOnly }}
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
  readOnly,
  ...rest
}) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <DocContainer severity='warning'>
          Use <DocHighlight component='span'>{'<PasswordField />'}</DocHighlight> instead
          of
          <DocHighlight component='span'>{'<TextField type="password" />'}</DocHighlight>
          This component build the show / hide content logic on top of <i>
            TextField
          </i>{' '}
          Mui component.
        </DocContainer>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'TextField'}</Label>
          <TextField
            {...rest}
            label='Password'
            placeholder={placeholder}
            defaultValue='1234'
            helperText={helperText}
            InputProps={{ readOnly: readOnly }}
            type='password'
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'PasswordField'}</Label>
          <PasswordField
            {...rest}
            label='Password'
            placeholder={placeholder}
            defaultValue='1234'
            helperText={helperText}
            InputProps={{ readOnly: readOnly }}
          />
        </Container>
      </Grid>
    </Grid>
  );
};

const BehaviorTemplate = ({
  label,
  placeholder,
  defaultValue,
  helperText,
  readOnly,
  ...rest
}) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Label variant='subtitle1'>{'Overflow'}</Label>
        <Container style={{ maxWidth: '440px' }}>
          <Label variant='body2'>{'Default'}</Label>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            defaultValue='felipegutierrezsoriano@cartodb.com'
            InputProps={{ readOnly: readOnly }}
          />
        </Container>
      </Grid>

      <Grid item>
        <Label variant='subtitle1'>{'Grouping'}</Label>
        <Container>
          <Label variant='body2'>{'Pairing'}</Label>

          <Grid container spacing={2}>
            <Grid item>
              <TextField
                {...rest}
                label={label}
                placeholder={placeholder}
                InputProps={{ readOnly: readOnly }}
              />
            </Grid>

            <Grid item>
              <TextField
                {...rest}
                label={label}
                placeholder={placeholder}
                InputProps={{ readOnly: readOnly }}
              />
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <Grid item>
        <Label variant='subtitle1'>{'Width'}</Label>
        <Container>
          <Label variant='body2'>{'Default (fullWidth)'}</Label>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            defaultValue='felipegutierrezsoriano@cartodb.com'
            InputProps={{ readOnly: readOnly }}
          />
        </Container>
        <Container>
          <Label variant='body2'>{'No fullWidth'}</Label>
          <TextField
            {...rest}
            label={label}
            placeholder={placeholder}
            defaultValue='felipegutierrezsoriano@cartodb.com'
            fullWidth={false}
            InputProps={{ readOnly: readOnly }}
          />
        </Container>
      </Grid>

      <Grid item>
        <Label variant='subtitle1'>{'Types'}</Label>
        <Container>
          <Label variant='body2'>{'Examples'}</Label>

          <TextField
            {...rest}
            label='Name'
            placeholder={placeholder}
            defaultValue='Felipe'
            helperText={helperText}
            InputProps={{ readOnly: readOnly }}
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
              ),
              readOnly: readOnly
            }}
            helperText={helperText}
          />
          <PasswordField
            {...rest}
            label='Password'
            placeholder={placeholder}
            defaultValue='1234'
            helperText={helperText}
            InputProps={{ readOnly: readOnly }}
          />
        </Container>
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
  helperText: 'This is an error message.',
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
