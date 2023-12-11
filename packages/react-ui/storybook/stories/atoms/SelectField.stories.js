import React, { useState } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, TextField } from '@mui/material';
import Typography from '../../../src/components/atoms/Typography';
import SelectField from '../../../src/components/atoms/SelectField';
import {
  Container,
  DocContainer,
  DocHighlight,
  DocLink,
  Label
} from '../../utils/storyStyles';
import Button from '../../../src/components/atoms/Button';

const options = {
  title: 'Atoms/Select Field',
  component: SelectField,
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
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A29965'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const menuItems = [
  { label: 'Ten: super large text with overflow', id: '10' },
  { label: 'Twenty', id: '20' },
  { label: 'Thirty', id: '30' }
];

const SelectFieldItem = ({
  label,
  required,
  placeholder,
  variant,
  helperText,
  size,
  focused,
  disabled,
  error,
  ...rest
}) => {
  const [content, setContent] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setContent(
      // On autofill we get a stringified value
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <SelectField
      {...rest}
      label={label}
      variant={variant}
      placeholder={placeholder}
      helperText={helperText}
      value={content}
      focused={focused}
      disabled={disabled}
      onChange={handleChange}
      error={error}
      size={size}
      fullWidth={rest.fullWidth}
      required={required}
    >
      {menuItems.map((o, i) => (
        <MenuItem key={i} value={o.label}>
          {o.label}
        </MenuItem>
      ))}
    </SelectField>
  );
};

const PlaygroundTemplate = (args) => <SelectFieldItem {...args} />;

const VariantsTemplate = ({ label, placeholder, ...rest }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Filled'}</Label>
          <SelectFieldItem
            {...rest}
            label={label}
            variant='filled'
            placeholder={placeholder}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Outlined'}</Label>
          <SelectFieldItem
            {...rest}
            label={label}
            variant='outlined'
            placeholder={placeholder}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Standard'}</Label>
          <SelectFieldItem
            {...rest}
            label={label}
            variant='standard'
            placeholder={placeholder}
          />
        </Container>
      </Grid>
    </Grid>
  );
};

const LabelAndHelperTextTemplate = ({ label, placeholder, helperText, ...rest }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Label + helper text'}</Label>
          <SelectFieldItem
            {...rest}
            label={label}
            placeholder={placeholder}
            helperText={helperText}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Without label + helper text'}</Label>
          <SelectFieldItem {...rest} placeholder={placeholder} />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only label'}</Label>
          <SelectFieldItem {...rest} label={label} placeholder={placeholder} />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only helper text'}</Label>
          <SelectFieldItem {...rest} placeholder={placeholder} helperText={helperText} />
        </Container>
      </Grid>
    </Grid>
  );
};

const SizeTemplate = ({ label, placeholder, helperText, size, ...rest }) => {
  const [fixedValue, setFixedValue] = useState('Twenty');
  const [fixedValue2, setFixedValue2] = useState('Twenty');
  const [fixedValue3, setFixedValue3] = useState('Thirty');
  const handleChange = (event) => {
    setFixedValue(event.target.value);
  };
  const handleChange2 = (event) => {
    setFixedValue2(event.target.value);
  };
  const handleChange3 = (event) => {
    setFixedValue3(event.target.value);
  };

  return (
    <Grid container spacing={6}>
      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Placeholder</Typography>
          <Typography variant='body2'>Custom component</Typography>
        </Grid>
        <Grid item xs={3}>
          <SelectFieldItem
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            size={size}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectFieldItem
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            size={size}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectFieldItem
            {...rest}
            variant='standard'
            label={label}
            placeholder={placeholder}
            size={size}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Empty</Typography>
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <InputLabel>{label}</InputLabel>
            <SelectFieldItem {...rest} variant='filled' size={size} />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <InputLabel>{label}</InputLabel>
            <SelectFieldItem {...rest} variant='outlined' size={size} />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <InputLabel>{label}</InputLabel>
            <SelectFieldItem {...rest} variant='standard' size={size} />
          </FormControl>
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Filled</Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...rest}
            variant='filled'
            label={label}
            select
            value={fixedValue}
            onChange={handleChange}
            SelectProps={{
              size: size
            }}
          >
            {menuItems.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                <Typography variant='inherit'>{option.label}</Typography>
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...rest}
            variant='outlined'
            label={label}
            select
            value={fixedValue2}
            onChange={handleChange2}
            SelectProps={{
              size: size
            }}
          >
            {menuItems.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                <Typography variant='inherit'>{option.label}</Typography>
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...rest}
            variant='standard'
            label={label}
            select
            value={fixedValue3}
            onChange={handleChange3}
            SelectProps={{
              size: size
            }}
          >
            {menuItems.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                <Typography variant='inherit'>{option.label}</Typography>
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Focused</Typography>
        </Grid>
        <Grid item xs={3}>
          <SelectFieldItem
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            focused
            size={size}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectFieldItem
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            focused
            size={size}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectFieldItem
            {...rest}
            variant='standard'
            label={label}
            placeholder={placeholder}
            focused
            size={size}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Disabled</Typography>
        </Grid>
        <Grid item xs={3}>
          <SelectFieldItem
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            disabled
            size={size}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectFieldItem
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            disabled
            size={size}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectFieldItem
            {...rest}
            variant='standard'
            label={label}
            placeholder={placeholder}
            disabled
            size={size}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Error</Typography>
        </Grid>
        <Grid item xs={3}>
          <SelectFieldItem
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error
            size={size}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectFieldItem
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error
            size={size}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectFieldItem
            {...rest}
            variant='standard'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error
            size={size}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const MultipleTemplate = ({ label, placeholder, helperText, size, ...rest }) => {
  return (
    <DocContainer
      severity='warning'
      action={
        <Button
          color='inherit'
          variant='outlined'
          size='small'
          href='/?path=/docs/atoms-multiple-select-field--playground'
        >
          MultipleSelectField story
        </Button>
      }
    >
      We have a specific
      <DocLink href='https://github.com/CartoDB/carto-react/blob/master/packages/react-ui/src/components/atoms/MultipleSelectField.js'>
        MultipleSelectField
      </DocLink>
      component to handle this functionality, check the associated story.
    </DocContainer>
  );
};

const BehaviorTemplate = ({ label, placeholder, helperText, ...rest }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Label variant='subtitle1'>{'Overflow'}</Label>
        <Container style={{ maxWidth: '440px' }}>
          <Label variant='body2'>{'Default'}</Label>
          <SelectFieldItem {...rest} label={label} placeholder={placeholder} />
        </Container>
      </Grid>

      <Grid item>
        <Label variant='subtitle1'>{'Grouping'}</Label>
        <Container>
          <Label variant='body2'>{'Pairing'}</Label>

          <Grid container spacing={2}>
            <Grid item>
              <SelectFieldItem {...rest} label={label} placeholder={placeholder} />
            </Grid>
            <Grid item>
              <SelectFieldItem {...rest} label={label} placeholder={placeholder} />
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <Grid item>
        <Label variant='subtitle1'>{'Width'}</Label>
        <Container>
          <Label variant='body2'>{'Default (fullWidth)'}</Label>
          <SelectFieldItem {...rest} label={label} placeholder={placeholder} />
        </Container>
        <Container>
          <Label variant='body2'>{'No fullWidth'}</Label>
          <SelectFieldItem
            {...rest}
            label={label}
            placeholder={placeholder}
            fullWidth={false}
          />
        </Container>
      </Grid>
    </Grid>
  );
};

const DocTemplate = () => {
  return (
    <DocContainer severity='warning'>
      This component adds the <i>placeholder</i> logic on top of TextField Mui component.
      <Typography mt={2}>
        So, instead of <i>{'<TextField select />'}</i> or <i>{'<Select />'}</i>, you
        should use this one:
        <DocHighlight component='span'>
          react-ui/src/components/atoms/SelectField
        </DocHighlight>
      </Typography>
      <Typography mt={2}>
        For external use:
        <DocHighlight component='span'>
          {'import { SelectField } from "@carto/react-ui";'}
        </DocHighlight>
        .
      </Typography>
    </DocContainer>
  );
};

const commonArgs = {
  label: 'Label text',
  placeholder: 'Placeholder text',
  helperText: 'Helper text.'
};

const sizeArgs = {
  helperText: 'This is a error message.'
};

const disabledControlsArgTypes = {
  variant: { table: { disable: true } },
  multiple: { table: { disable: true } }
};

const disabledControlsSizeArgTypes = {
  ...disabledControlsArgTypes,
  error: { table: { disable: true } },
  defaultValue: { table: { disable: true } }
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = { ...commonArgs };
Playground.argTypes = disabledControlsArgTypes;

export const Guide = DocTemplate.bind({});

export const Variants = VariantsTemplate.bind({});
Variants.args = { ...commonArgs };
Variants.argTypes = disabledControlsArgTypes;

export const LabelAndHelperText = LabelAndHelperTextTemplate.bind({});
LabelAndHelperText.args = { ...commonArgs };
LabelAndHelperText.argTypes = disabledControlsArgTypes;

export const Medium = SizeTemplate.bind({});
Medium.args = { ...commonArgs, ...sizeArgs, size: 'medium' };
Medium.argTypes = disabledControlsSizeArgTypes;

export const Small = SizeTemplate.bind({});
Small.args = { ...commonArgs, ...sizeArgs, size: 'small' };
Small.argTypes = disabledControlsSizeArgTypes;

export const MultipleSelection = MultipleTemplate.bind({});
MultipleSelection.args = { ...commonArgs };
MultipleSelection.argTypes = disabledControlsArgTypes;

export const Behavior = BehaviorTemplate.bind({});
Behavior.args = { ...commonArgs };
Behavior.argTypes = disabledControlsArgTypes;
