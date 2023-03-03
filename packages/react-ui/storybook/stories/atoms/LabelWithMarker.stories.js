import React, { useState } from 'react';
import {
  Box,
  Grid,
  Autocomplete,
  TextField,
  InputLabel,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '../../../src/components/atoms/Typography';
import PasswordField from '../../../src/components/atoms/PasswordField';
import SelectField from '../../../src/components/atoms/SelectField';
import LabelWithMarker from '../../../src/components/atoms/LabelWithMarker';
import UploadField from '../../../src/components/molecules/UploadField';

const options = {
  title: 'Atoms/LabelWithMarker',
  component: LabelWithMarker,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['optional', 'required']
      }
    },
    label: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    /* TODO: TBD by design
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A33807'
    }, */
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
  { title: 'Fight Club', year: 1999 }
];

const PlaygroundTemplate = (args) => (
  <InputLabel>
    <LabelWithMarker {...args} />
  </InputLabel>
);

const TypesTemplate = ({ ...args }) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Optional'}
          </Typography>
          <InputLabel>
            <LabelWithMarker {...args} />
          </InputLabel>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Required'}
          </Typography>
          <InputLabel>
            <LabelWithMarker {...args} type='required' />
          </InputLabel>
        </Box>
      </Grid>
    </Grid>
  );
};

const UseCasesTemplate = ({ label, ...rest }) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const handleUploadFieldChange = (files) => {
    setFiles(files);
  };

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'TextField'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label={<LabelWithMarker {...rest} label={label} />}
                  placeholder='Placeholder text'
                />
              </Grid>
              <Grid item xs={4}>
                <TextField label={label} required placeholder='Placeholder text' />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'SelectField'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={4}>
                <SelectField
                  label={<LabelWithMarker {...rest} label={label} />}
                  placeholder='Placeholder text'
                  items={menuItems}
                />
              </Grid>
              <Grid item xs={4}>
                <SelectField
                  label={label}
                  required
                  placeholder='Placeholder text'
                  items={menuItems}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'UploadField'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={4}>
                <UploadField
                  files={files}
                  label={<LabelWithMarker {...rest} label={label} />}
                  placeholder='Placeholder text'
                  onChange={handleUploadFieldChange}
                />
              </Grid>
              <Grid item xs={4}>
                <UploadField
                  files={files}
                  label={label}
                  required
                  placeholder='Placeholder text'
                  onChange={handleUploadFieldChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'PasswordField'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={4}>
                <PasswordField
                  label={<LabelWithMarker {...rest} label={label} />}
                  placeholder='Placeholder text'
                  defaultValue='1234'
                />
              </Grid>
              <Grid item xs={4}>
                <PasswordField
                  label={label}
                  required
                  placeholder='Placeholder text'
                  defaultValue='1234'
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Autocomplete'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={4}>
                <Autocomplete
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      size='small'
                      label={<LabelWithMarker {...rest} label={label} />}
                    />
                  )}
                  size='small'
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField size='small' label={label} required />
                  )}
                  size='small'
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Checkbox / Radio group'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={4}>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>
                    <LabelWithMarker label={'Group Label'} />
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox checked />} label='Gilad Gray' />
                    <FormControlLabel control={<Checkbox />} label='Jason Killian' />
                    <FormControlLabel
                      control={<Checkbox checked indeterminate />}
                      label='Antoine Llorca'
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl required component='fieldset'>
                  <FormLabel component='legend'>Group Label</FormLabel>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox checked />} label='Gilad Gray' />
                    <FormControlLabel control={<Checkbox />} label='Jason Killian' />
                    <FormControlLabel
                      control={<Checkbox checked indeterminate />}
                      label='Antoine Llorca'
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const commonArgs = {
  label: 'Label text'
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = { ...commonArgs };

export const Types = TypesTemplate.bind({});
Types.args = { ...commonArgs };

export const UseCases = UseCasesTemplate.bind({});
UseCases.args = { ...commonArgs };
