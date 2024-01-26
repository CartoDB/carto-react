import { InfoOutlined } from '@mui/icons-material';
import { Grid, InputAdornment, Autocomplete, TextField } from '@mui/material';
import React from 'react';
import Typography from '../../../src/components/atoms/Typography';
import { Container, Label } from '../../utils/storyStyles';

const options = {
  title: 'Molecules/Autocomplete',
  component: Autocomplete,
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
    multiple: {
      defaultValue: false,
      control: {
        type: 'boolean'
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
    limitTags: {
      defaultValue: 1,
      control: {
        type: 'number'
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
      type: 'readyToReview'
    }
  }
};
export default options;

const endAdornmentText = <InputAdornment position='end'>Kg</InputAdornment>;
const endAdornmentIcon = (
  <InputAdornment position='end'>
    <InfoOutlined />
  </InputAdornment>
);

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 }
];

const PlaygroundTemplate = ({
  label,
  variant,
  placeholder,
  error,
  size,
  required,
  ...args
}) => (
  <Autocomplete
    {...args}
    options={top100Films}
    getOptionLabel={(option) => option.title}
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        placeholder={placeholder}
        variant={variant}
        error={error}
        size={size}
        required={required}
      />
    )}
    size={size}
  />
);

const VariantsTemplate = ({
  label,
  variant,
  placeholder,
  error,
  size,
  required,
  ...args
}) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Filled'}</Label>
          <Autocomplete
            {...args}
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                variant='filled'
                error={error}
                size={size}
                required={required}
              />
            )}
            size={size}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Outlined'}</Label>
          <Autocomplete
            {...args}
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                variant='outlined'
                error={error}
                size={size}
                required={required}
              />
            )}
            size={size}
          />
        </Container>
      </Grid>
    </Grid>
  );
};

const LabelAndHelperTextTemplate = ({
  label,
  variant,
  placeholder,
  error,
  size,
  required,
  helperText,
  ...args
}) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Label + helper text'}</Label>
          <Autocomplete
            {...args}
            label={label}
            placeholder={placeholder}
            helperText={helperText}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Without label + helper text'}</Label>
          <Autocomplete {...args} placeholder={placeholder} />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only label'}</Label>
          <Autocomplete {...args} label={label} placeholder={placeholder} />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only helper text'}</Label>
          <Autocomplete {...args} placeholder={placeholder} helperText={helperText} />
        </Container>
      </Grid>
    </Grid>
  );
};

const SuffixTemplate = ({
  label,
  variant,
  placeholder,
  error,
  size,
  required,
  ...args
}) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Suffix'}</Label>
          <Autocomplete
            {...args}
            label={label}
            placeholder={placeholder}
            InputProps={{
              endAdornment: endAdornmentText
            }}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'None'}</Label>
          <Autocomplete {...args} label={label} placeholder={placeholder} />
        </Container>
      </Grid>
    </Grid>
  );
};

const SizeTemplate = ({
  label,
  variant,
  placeholder,
  error,
  size,
  required,
  helperText,
  ...args
}) => {
  return (
    <Grid container spacing={6}>
      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Placeholder</Typography>
        </Grid>
        <Grid item>
          <Autocomplete
            {...args}
            variant='filled'
            label={label}
            placeholder={placeholder}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            {...args}
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
          <Autocomplete {...args} variant='filled' label={label} />
        </Grid>
        <Grid item>
          <Autocomplete {...args} variant='outlined' label={label} />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Filled</Typography>
        </Grid>
        <Grid item>
          <Autocomplete
            {...args}
            variant='filled'
            label={label}
            placeholder={placeholder}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            {...args}
            variant='outlined'
            label={label}
            placeholder={placeholder}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Focused</Typography>
        </Grid>
        <Grid item>
          <Autocomplete
            {...args}
            variant='filled'
            label={label}
            placeholder={placeholder}
            focused
          />
        </Grid>
        <Grid item>
          <Autocomplete
            {...args}
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
          <Autocomplete
            {...args}
            variant='filled'
            label={label}
            placeholder={placeholder}
            focused
          />
        </Grid>
        <Grid item>
          <Autocomplete
            {...args}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            focused
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Disabled</Typography>
        </Grid>
        <Grid item>
          <Autocomplete
            {...args}
            variant='filled'
            label={label}
            placeholder={placeholder}
            disabled
          />
        </Grid>
        <Grid item>
          <Autocomplete
            {...args}
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
          <Autocomplete
            {...args}
            variant='filled'
            label={label}
            placeholder={placeholder}
            disabled
          />
        </Grid>
        <Grid item>
          <Autocomplete
            {...args}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            disabled
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Read Only</Typography>
        </Grid>
        <Grid item>
          <Autocomplete
            {...args}
            variant='filled'
            label={label}
            placeholder={placeholder}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            {...args}
            variant='outlined'
            label={label}
            placeholder={placeholder}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Error</Typography>
        </Grid>
        <Grid item>
          <Autocomplete
            {...args}
            variant='filled'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error
          />
        </Grid>
        <Grid item>
          <Autocomplete
            {...args}
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
          <Autocomplete
            {...args}
            variant='filled'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error
          />
        </Grid>
        <Grid item>
          <Autocomplete
            {...args}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error
          />
        </Grid>
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

/* export const LabelAndHelperText = LabelAndHelperTextTemplate.bind({});
LabelAndHelperText.args = { ...commonArgs };

export const Suffix = SuffixTemplate.bind({});
Suffix.args = { ...commonArgs };

export const Medium = SizeTemplate.bind({});
Medium.args = { ...commonArgs, ...sizeArgs, size: 'medium' };
Medium.argTypes = disabledControlsSizeArgTypes;

export const Small = SizeTemplate.bind({});
Small.args = { ...commonArgs, ...sizeArgs, size: 'small' };
Small.argTypes = disabledControlsSizeArgTypes; */
