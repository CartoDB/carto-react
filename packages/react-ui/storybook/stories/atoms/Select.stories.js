import React, { useState } from 'react';
import { Box, Grid, MenuItem, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '../../../src/components/atoms/Typography';
import SelectField from '../../../src/components/atoms/SelectField';

const options = {
  title: 'Atoms/Select',
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

const menuItems = [
  {
    label: 'Ten',
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

const VariantsTemplate = ({ label, size, required, placeholder, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Filled'}
          </Typography>
          <SelectField
            {...rest}
            label={label}
            variant='filled'
            placeholder={placeholder}
            items={menuItems}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Outlined'}
          </Typography>
          <SelectField
            {...rest}
            label={label}
            variant='outlined'
            placeholder={placeholder}
            items={menuItems}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Standard'}
          </Typography>
          <SelectField
            {...rest}
            label={label}
            variant='standard'
            placeholder={placeholder}
            items={menuItems}
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
          <SelectField
            {...rest}
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            items={menuItems}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Without label + helper text'}
          </Typography>
          <SelectField {...rest} placeholder={placeholder} items={menuItems} />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Only label'}
          </Typography>
          <SelectField
            {...rest}
            label={label}
            placeholder={placeholder}
            items={menuItems}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Only helper text'}
          </Typography>
          <SelectField
            {...rest}
            placeholder={placeholder}
            helperText={helperText}
            items={menuItems}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const SizeTemplate = ({ label, placeholder, defaultValue, helperText, ...rest }) => {
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
          />
        </Grid>
        <Grid item xs={3}>
          <SelectField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            items={menuItems}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectField
            {...rest}
            variant='standard'
            label={label}
            placeholder={placeholder}
            items={menuItems}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Empty</Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField select {...rest} variant='filled' label={label}>
            {menuItems.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField select {...rest} variant='outlined' label={label}>
            {menuItems.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField select {...rest} variant='standard' label={label}>
            {menuItems.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
            items={menuItems}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const MultipleTemplate = ({ label, placeholder, defaultValue, helperText, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Default (custom component)'}
          </Typography>
          <SelectField
            {...rest}
            multiple
            label={label}
            placeholder={placeholder}
            items={menuItems}
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
          <SelectField
            {...rest}
            label={label}
            placeholder={placeholder}
            items={menuItemsLong}
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

          <SelectField
            {...rest}
            label={label}
            placeholder={placeholder}
            items={menuItems}
          />
          <SelectField
            {...rest}
            label={label}
            placeholder={placeholder}
            items={menuItems}
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
          <SelectField
            {...rest}
            label={label}
            placeholder={placeholder}
            items={menuItems}
          />
        </Box>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'No fullWidth'}
          </Typography>
          <SelectField
            {...rest}
            label={label}
            placeholder={placeholder}
            fullWidth={false}
            items={menuItems}
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
Medium.args = { ...commonArgs, ...sizeArgs };
Medium.argTypes = disabledControlsSizeArgTypes;

export const Small = SizeTemplate.bind({});
Small.args = { ...commonArgs, ...sizeArgs, size: 'small' };
Small.argTypes = disabledControlsSizeArgTypes;

export const MultipleSelection = MultipleTemplate.bind({});
MultipleSelection.args = { ...commonArgs };

export const Behavior = BehaviorTemplate.bind({});
Behavior.args = { ...commonArgs };
