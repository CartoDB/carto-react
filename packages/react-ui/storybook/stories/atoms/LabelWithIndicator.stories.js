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
import LabelWithIndicator from '../../../src/components/atoms/LabelWithIndicator';
import UploadField from '../../../src/components/molecules/UploadField';

const options = {
  title: 'Atoms/LabelWithIndicator',
  component: LabelWithIndicator,
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/C4R-Components-2.0?node-id=1534%3A33807&t=vG1iT2zmsc2p0Cst-0'
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
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  { label: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 }
];

const PlaygroundTemplate = (args) => (
  <InputLabel>
    <LabelWithIndicator {...args} />
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
            <LabelWithIndicator {...args} />
          </InputLabel>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Required'}
          </Typography>
          <InputLabel>
            <LabelWithIndicator {...args} type='required' />
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
              <Grid item xs={3}>
                <TextField
                  label={<LabelWithIndicator {...rest} label={label} />}
                  placeholder='Placeholder text'
                />
              </Grid>
              <Grid item xs={3}>
                <TextField label={label} required placeholder='Placeholder text' />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label={<LabelWithIndicator {...rest} label={label} />}
                  placeholder='Placeholder text'
                  error
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label={<LabelWithIndicator {...rest} label={label} />}
                  placeholder='Placeholder text'
                  disabled
                />
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
              <Grid item xs={3}>
                <SelectField
                  label={<LabelWithIndicator {...rest} label={label} />}
                  placeholder='Placeholder text'
                  items={menuItems}
                />
              </Grid>
              <Grid item xs={3}>
                <SelectField
                  label={label}
                  required
                  placeholder='Placeholder text'
                  items={menuItems}
                />
              </Grid>
              <Grid item xs={3}>
                <SelectField
                  label={<LabelWithIndicator {...rest} label={label} />}
                  placeholder='Placeholder text'
                  items={menuItems}
                  error
                />
              </Grid>
              <Grid item xs={3}>
                <SelectField
                  label={<LabelWithIndicator {...rest} label={label} />}
                  placeholder='Placeholder text'
                  items={menuItems}
                  disabled
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
              <Grid item xs={3}>
                <UploadField
                  files={files}
                  label={<LabelWithIndicator {...rest} label={label} />}
                  placeholder='Placeholder text'
                  onChange={handleUploadFieldChange}
                />
              </Grid>
              <Grid item xs={3}>
                <UploadField
                  files={files}
                  label={label}
                  required
                  placeholder='Placeholder text'
                  onChange={handleUploadFieldChange}
                />
              </Grid>
              <Grid item xs={3}>
                <UploadField
                  files={files}
                  label={<LabelWithIndicator {...rest} label={label} />}
                  placeholder='Placeholder text'
                  onChange={handleUploadFieldChange}
                  error
                />
              </Grid>
              <Grid item xs={3}>
                <UploadField
                  files={files}
                  label={<LabelWithIndicator {...rest} label={label} />}
                  placeholder='Placeholder text'
                  onChange={handleUploadFieldChange}
                  disabled
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
              <Grid item xs={3}>
                <PasswordField
                  label={<LabelWithIndicator {...rest} label={label} />}
                  placeholder='Placeholder text'
                  defaultValue='1234'
                />
              </Grid>
              <Grid item xs={3}>
                <PasswordField
                  label={label}
                  required
                  placeholder='Placeholder text'
                  defaultValue='1234'
                />
              </Grid>
              <Grid item xs={3}>
                <PasswordField
                  label={<LabelWithIndicator {...rest} label={label} />}
                  placeholder='Placeholder text'
                  defaultValue='1234'
                  error
                />
              </Grid>
              <Grid item xs={3}>
                <PasswordField
                  label={<LabelWithIndicator {...rest} label={label} />}
                  placeholder='Placeholder text'
                  defaultValue='1234'
                  disabled
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
              <Grid item xs={3}>
                <Autocomplete
                  options={top100Films}
                  renderInput={(params) => (
                    <TextField
                      size='small'
                      label={<LabelWithIndicator {...rest} label={label} />}
                    />
                  )}
                  size='small'
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  options={top100Films}
                  renderInput={(params) => (
                    <TextField size='small' label={label} required />
                  )}
                  size='small'
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  options={top100Films}
                  renderInput={(params) => (
                    <TextField
                      size='small'
                      label={<LabelWithIndicator {...rest} label={label} />}
                      error
                    />
                  )}
                  size='small'
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  options={top100Films}
                  renderInput={(params) => (
                    <TextField
                      size='small'
                      label={<LabelWithIndicator {...rest} label={label} />}
                      disabled
                    />
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
              <Grid item xs={3}>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>
                    <LabelWithIndicator label={'Group Label'} />
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
              <Grid item xs={3}>
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
              <Grid item xs={3}>
                <FormControl error component='fieldset'>
                  <FormLabel component='legend'>
                    <LabelWithIndicator label={'Group Label'} />
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
              <Grid item xs={3}>
                <FormControl disabled component='fieldset'>
                  <FormLabel component='legend'>
                    <LabelWithIndicator label={'Group Label'} />
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