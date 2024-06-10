import React, { useState } from 'react';
import {
  Grid,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  TextField
} from '@mui/material';
import {
  AccessAlarmOutlined,
  AccountTreeOutlined,
  AddCircleOutlined,
  AddTaskOutlined,
  AnalyticsOutlined,
  AnimationOutlined,
  AutorenewOutlined,
  BlockOutlined,
  BookmarkAddOutlined,
  BuildOutlined,
  CheckCircleOutlined,
  EditOutlined,
  MovieOutlined,
  NewReleasesOutlined
} from '@mui/icons-material';
import Typography from '../../../src/components/atoms/Typography';
import Autocomplete from '../../../src/components/molecules/Autocomplete';
import MenuItem from '../../../src/components/molecules/MenuItem';
import {
  Container,
  DocContainer,
  DocHighlight,
  DocLink,
  Label
} from '../../utils/storyStyles';

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
    creatable: {
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
    },
    newItemTitle: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/C4R-Components?type=design&node-id=1534-26505'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994, icon: <MovieOutlined /> },
  { title: 'The Godfather', year: 1972, icon: <EditOutlined /> },
  { title: 'The Godfather: Part II', year: 1974, icon: <AccessAlarmOutlined /> },
  { title: 'The Dark Knight', year: 2008, icon: <AccountTreeOutlined /> },
  { title: '12 Angry Men', year: 1957, icon: <AddCircleOutlined /> },
  { title: "Schindler's List", year: 1993, icon: <AddTaskOutlined /> },
  { title: 'Pulp Fiction', year: 1994, icon: <AnalyticsOutlined /> },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
    icon: <AnimationOutlined />
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966, icon: <AutorenewOutlined /> },
  { title: 'Fight Club', year: 1999, icon: <MovieOutlined /> },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
    icon: <BlockOutlined />
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
    icon: <BookmarkAddOutlined />
  },
  { title: 'Forrest Gump', year: 1994, icon: <BuildOutlined /> },
  { title: 'Inception', year: 2010, icon: <MovieOutlined /> },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
    icon: <CheckCircleOutlined />
  }
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

const PrefixTemplate = ({
  label,
  variant,
  placeholder,
  helperText,
  error,
  size,
  required,
  ...args
}) => {
  return (
    <Autocomplete
      {...args}
      options={top100Films}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => {
        params.InputProps.startAdornment = (
          <InputAdornment position='start'>{<AnalyticsOutlined />}</InputAdornment>
        );
        return (
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
        );
      }}
      size={size}
    />
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

const RenderOptionTemplate = ({
  label,
  variant,
  placeholder,
  helperText,
  error,
  size,
  required,
  ...args
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <DocContainer severity='info'>
        Uses `startAdornment` for the icon in the input and `renderOption` to override
        default list items
      </DocContainer>

      <Autocomplete
        {...args}
        options={top100Films}
        getOptionLabel={(option) => option.title}
        onChange={(event, newValue) => {
          setSelectedOption(newValue);
        }}
        renderInput={(params) => {
          if (selectedOption) {
            params.InputProps.startAdornment = (
              <InputAdornment position='start'>{selectedOption.icon}</InputAdornment>
            );
          }
          return (
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
          );
        }}
        size={size}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.title}>
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText>{option.title}</ListItemText>
          </MenuItem>
        )}
      />
    </>
  );
};

const CreatableTemplate = ({
  label,
  variant,
  placeholder,
  helperText,
  error,
  size,
  required,
  ...args
}) => {
  const [creatableTop100Films, setCreatableTop100Films] = useState(top100Films);

  const handleAddOption = (newOption) => {
    if (newOption.inputValue) {
      const newFilm = {
        title: newOption.inputValue,
        icon: <NewReleasesOutlined />
      };
      setCreatableTop100Films((prev) => [...prev, newFilm]);
    }
  };

  return (
    <Autocomplete
      {...args}
      creatable
      options={creatableTop100Films}
      getOptionLabel={(option) => option.title}
      onChange={(event, newValue) => {
        if (newValue && newValue.inputValue) {
          handleAddOption(newValue);
        }
      }}
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
};

const FreeSoloTemplate = ({
  label,
  variant,
  placeholder,
  helperText,
  error,
  size,
  required,
  multiple,
  ...args
}) => {
  const [values, setValues] = useState([]);

  const handleChange = (event, newValue) => {
    setValues(newValue);
  };

  return (
    <>
      <DocContainer severity='info'>
        The textbox can contain any arbitrary value.
      </DocContainer>

      <Autocomplete
        {...args}
        freeSolo
        multiple={multiple}
        options={multiple ? values : [values]}
        onChange={handleChange}
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
    </>
  );
};

const DocTemplate = () => (
  <DocContainer severity='warning'>
    We have our own
    <DocLink href='https://github.com/CartoDB/carto-react/blob/master/packages/react-ui/src/components/molecules/Autocomplete.js'>
      Autocomplete
    </DocLink>
    component that uses <i>Mui Autocomplete</i> and extends it with a new prop
    <DocHighlight component='span'>(creatable)</DocHighlight> to add new MenuItem options
    that don't exist yet.
    <Typography mt={2}>
      Import it from
      <DocHighlight component='span'>
        react-ui/src/components/molecules/Autocomplete
      </DocHighlight>
    </Typography>
    <Typography mt={2}>
      For external use:
      <DocHighlight component='span'>
        {'import { Autocomplete } from "@carto/react-ui";'}
      </DocHighlight>
      .
    </Typography>
  </DocContainer>
);

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

export const Guide = DocTemplate.bind({});

export const Variants = VariantsTemplate.bind({});
Variants.args = { ...commonArgs };
Variants.argTypes = disabledControlsVariantsArgTypes;

export const LabelAndHelperText = LabelAndHelperTextTemplate.bind({});
LabelAndHelperText.args = { ...commonArgs };

export const Prefix = PrefixTemplate.bind({});
Prefix.args = { ...commonArgs };

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

export const CustomRenderOption = RenderOptionTemplate.bind({});
CustomRenderOption.args = { ...commonArgs };

export const Creatable = CreatableTemplate.bind({});
Creatable.args = { ...commonArgs };

export const FreeSolo = FreeSoloTemplate.bind({});
FreeSolo.args = { ...commonArgs };
