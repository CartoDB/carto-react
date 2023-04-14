import React, { useState } from 'react';
import {
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import Typography from '../../../src/components/atoms/Typography';
import SelectField from '../../../src/components/atoms/SelectField';
import { Container, Label, ChipWrapper } from '../common.stories.styled';

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
  {
    label: 'Ten: super large text with overflow',
    value: '10'
  },
  {
    label: 'Twenty',
    value: '20'
  },
  {
    label: 'Thirty',
    value: '30'
  }
];

const menuItemsLong = [
  {
    label: 'table_openstreetmap_pointsofinterest',
    value: '10Long'
  },
  {
    label: 'Twenty',
    value: '20'
  },
  {
    label: 'Thirty',
    value: '30'
  }
];

const PlaygroundTemplate = (args) => <SelectField {...args} items={menuItems} />;

const VariantsTemplate = ({ label, required, placeholder, ...rest }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>
            {'Filled'}
          </Label>
          <SelectField
            {...rest}
            label={label}
            variant='filled'
            placeholder={placeholder}
            items={menuItems}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>
            {'Outlined'}
          </Label>
          <SelectField
            {...rest}
            label={label}
            variant='outlined'
            placeholder={placeholder}
            items={menuItems}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>
            {'Standard'}
          </Label>
          <SelectField
            {...rest}
            label={label}
            variant='standard'
            placeholder={placeholder}
            items={menuItems}
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
          <Label variant='body2'>
            {'Label + helper text'}
          </Label>
          <SelectField
            {...rest}
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            items={menuItems}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>
            {'Without label + helper text'}
          </Label>
          <SelectField {...rest} placeholder={placeholder} items={menuItems} />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>
            {'Only label'}
          </Label>
          <SelectField
            {...rest}
            label={label}
            placeholder={placeholder}
            items={menuItems}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>
            {'Only helper text'}
          </Label>
          <SelectField
            {...rest}
            placeholder={placeholder}
            helperText={helperText}
            items={menuItems}
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
  size,
  ...rest
}) => {
  const [fixedValue, setFixedValue] = useState('Twenty');
  const [fixedValue2, setFixedValue2] = useState('Ten');
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
          <SelectField
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            items={menuItems}
            size={size}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            items={menuItems}
            size={size}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectField
            {...rest}
            variant='standard'
            label={label}
            placeholder={placeholder}
            items={menuItems}
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
            <Select {...rest} variant='filled' size={size}>
              {menuItems.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <InputLabel>{label}</InputLabel>
            <Select {...rest} variant='outlined' size={size}>
              {menuItems.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <InputLabel>{label}</InputLabel>
            <Select {...rest} variant='standard' size={size}>
              {menuItems.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
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
          <SelectField
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            focused
            size={size}
            items={menuItems}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            focused
            size={size}
            items={menuItems}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectField
            {...rest}
            variant='standard'
            label={label}
            placeholder={placeholder}
            focused
            size={size}
            items={menuItems}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Disabled</Typography>
        </Grid>
        <Grid item xs={3}>
          <SelectField
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            disabled
            size={size}
            items={menuItems}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            disabled
            size={size}
            items={menuItems}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectField
            {...rest}
            variant='standard'
            label={label}
            placeholder={placeholder}
            disabled
            size={size}
            items={menuItems}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Error</Typography>
        </Grid>
        <Grid item xs={3}>
          <SelectField
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error
            size={size}
            items={menuItems}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error
            size={size}
            items={menuItems}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectField
            {...rest}
            variant='standard'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error
            size={size}
            items={menuItems}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const MultipleTemplate = ({
  label,
  placeholder,
  defaultValue,
  helperText,
  size,
  ...rest
}) => {
  const [personName, setPersonName] = React.useState([]);
  const isSmall = size === 'small';

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>
            {'Default (custom component)'}
          </Label>
          <SelectField
            {...rest}
            multiple
            size={size}
            label={label}
            placeholder={placeholder}
            items={menuItems}
          />
        </Container>
      </Grid>
      <Grid item xs={3}>
        <Container>
          <Label variant='body2'>
            {'Select (with custom chips)'}
          </Label>
          <Select
            {...rest}
            label={label}
            size={size}
            multiple
            displayEmpty
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography variant={isSmall ? 'body2' : 'body1'} color='text.hint'>
                    Placeholder
                  </Typography>
                );
              }

              return (
                <ChipWrapper small={isSmall}>
                  {selected.map((value) => (
                    <Chip size={size} color='default' key={value} label={value} />
                  ))}
                </ChipWrapper>
              );
            }}
          >
            {[...Array(10)].map((x, index) => (
              <MenuItem key={index} value={`Option item ${index + 1}`}>
                {`Option item ${index + 1}`}
              </MenuItem>
            ))}
          </Select>
        </Container>
      </Grid>
    </Grid>
  );
};

const BehaviorTemplate = ({ label, placeholder, defaultValue, helperText, ...rest }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Label variant='subtitle1'>
          {'Overflow'}
        </Label>
        <Container style={{ maxWidth: '440px' }}>
          <Label variant='body2'>
            {'Default'}
          </Label>
          <SelectField
            {...rest}
            label={label}
            placeholder={placeholder}
            items={menuItemsLong}
          />
        </Container>
      </Grid>

      <Grid item>
        <Label variant='subtitle1'>
          {'Grouping'}
        </Label>
        <Container>
          <Label variant='body2'>
            {'Pairing'}
          </Label>

          <Grid container spacing={2}>
            <Grid item>
              <SelectField
                {...rest}
                label={label}
                placeholder={placeholder}
                items={menuItems}
              />
            </Grid>
            <Grid item>
              <SelectField
                {...rest}
                label={label}
                placeholder={placeholder}
                items={menuItems}
              />
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <Grid item>
        <Label variant='subtitle1'>
          {'Width'}
        </Label>
        <Container>
          <Label variant='body2'>
            {'Default (fullWidth)'}
          </Label>
          <SelectField
            {...rest}
            label={label}
            placeholder={placeholder}
            items={menuItems}
          />
        </Container>
        <Container>
          <Label variant='body2'>
            {'No fullWidth'}
          </Label>
          <SelectField
            {...rest}
            label={label}
            placeholder={placeholder}
            fullWidth={false}
            items={menuItems}
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
  helperText: 'This is a error message.'
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

export const MultipleSelection = MultipleTemplate.bind({});
MultipleSelection.args = { ...commonArgs };

export const Behavior = BehaviorTemplate.bind({});
Behavior.args = { ...commonArgs };
