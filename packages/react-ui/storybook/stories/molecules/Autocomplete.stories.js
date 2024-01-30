import React from 'react';
import { Grid, Autocomplete, TextField } from '@mui/material';

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
  helperText,
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
        helperText={helperText}
        variant={variant}
        error={error}
        size={size}
        required={required}
        InputLabelProps={{ shrink: true }}
      />
    )}
    size={size}
  />
);

const VariantsTemplate = ({
  label,
  placeholder,
  helperText,
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
                helperText={helperText}
                variant='filled'
                error={error}
                size={size}
                required={required}
                InputLabelProps={{ shrink: true }}
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
                helperText={helperText}
                variant='outlined'
                error={error}
                size={size}
                required={required}
                InputLabelProps={{ shrink: true }}
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
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                variant={variant}
                error={error}
                size={size}
                required={required}
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Without label + helper text'}</Label>
          <Autocomplete
            {...args}
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={placeholder}
                variant={variant}
                error={error}
                size={size}
                required={required}
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only label'}</Label>
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
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only helper text'}</Label>
          <Autocomplete
            {...args}
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={placeholder}
                helperText={helperText}
                variant={variant}
                error={error}
                size={size}
                required={required}
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
          />
        </Container>
      </Grid>
    </Grid>
  );
};

const MultipleTemplate = ({
  label,
  placeholder,
  error,
  size,
  required,
  helperText,
  ...args
}) => {
  const defaultValue = [
    top100Films[2],
    top100Films[3],
    top100Films[4],
    top100Films[6],
    top100Films[13],
    top100Films[14]
  ];

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
                helperText={helperText}
                variant='filled'
                error={error}
                size={size}
                required={required}
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
            multiple
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
                helperText={helperText}
                variant='outlined'
                error={error}
                size={size}
                required={required}
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
            multiple
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Filled readOnly'}</Label>
          <Autocomplete
            {...args}
            options={top100Films}
            defaultValue={defaultValue}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                variant='filled'
                error={error}
                size={size}
                required={required}
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
            multiple
            readOnly
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Outlined readOnly'}</Label>
          <Autocomplete
            {...args}
            options={top100Films}
            defaultValue={defaultValue}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                variant='outlined'
                error={error}
                size={size}
                required={required}
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
            multiple
            readOnly
          />
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
        <Grid item xs>
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
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
          />
        </Grid>
        <Grid item xs>
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
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Empty</Typography>
        </Grid>
        <Grid item xs>
          <Autocomplete
            {...args}
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant='filled'
                error={error}
                size={size}
                required={required}
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            {...args}
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant='outlined'
                error={error}
                size={size}
                required={required}
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Filled</Typography>
        </Grid>
        <Grid item xs>
          <Autocomplete
            {...args}
            options={top100Films}
            defaultValue={top100Films[6]}
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
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            {...args}
            options={top100Films}
            defaultValue={top100Films[6]}
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
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Focused</Typography>
        </Grid>
        <Grid item xs>
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
                InputLabelProps={{ shrink: true }}
                focused
              />
            )}
            size={size}
          />
        </Grid>
        <Grid item xs>
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
                InputLabelProps={{ shrink: true }}
                focused
              />
            )}
            size={size}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Disabled</Typography>
        </Grid>
        <Grid item xs>
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
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
            disabled
          />
        </Grid>
        <Grid item xs>
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
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
            disabled
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Read Only</Typography>
        </Grid>
        <Grid item xs>
          <Autocomplete
            {...args}
            options={top100Films}
            defaultValue={top100Films[6]}
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
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
            readOnly
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            {...args}
            options={top100Films}
            defaultValue={top100Films[6]}
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
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
            readOnly
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Error</Typography>
        </Grid>
        <Grid item xs>
          <Autocomplete
            {...args}
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                variant='filled'
                error
                size={size}
                required={required}
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            {...args}
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                variant='outlined'
                error
                size={size}
                required={required}
                InputLabelProps={{ shrink: true }}
              />
            )}
            size={size}
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
  helperText: 'This is an error message.'
};

const disabledControlsVariantsArgTypes = {
  variant: { table: { disable: true } }
};
const disabledControlsMultipleArgTypes = {
  multiple: { table: { disable: true } }
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

export const Multiple = MultipleTemplate.bind({});
Multiple.args = { ...commonArgs };
Multiple.argTypes = {
  ...disabledControlsVariantsArgTypes,
  ...disabledControlsMultipleArgTypes
};

export const Medium = SizeTemplate.bind({});
Medium.args = { ...commonArgs, ...sizeArgs, size: 'medium' };
Medium.argTypes = disabledControlsSizeArgTypes;

export const Small = SizeTemplate.bind({});
Small.args = { ...commonArgs, ...sizeArgs, size: 'small' };
Small.argTypes = disabledControlsSizeArgTypes;
