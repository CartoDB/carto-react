import React, { useState } from 'react';
import {
  Grid,
  Autocomplete,
  TextField,
  InputLabel,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Tooltip
} from '@mui/material';
import PasswordField from '../../../src/components/atoms/PasswordField';
import SelectField from '../../../src/components/atoms/SelectField';
import LabelWithIndicator from '../../../src/components/atoms/LabelWithIndicator';
import UploadField from '../../../src/components/molecules/UploadField/UploadField';
import { Container, Label } from '../../utils/storyStyles';
import { HelpOutline } from '@mui/icons-material';

const options = {
  title: 'Atoms/LabelWithIndicator',
  component: LabelWithIndicator,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['optional', 'required', undefined],
        defaultValue: 'undefined'
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

const TypeTemplate = (args) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Optional'}</Label>
          <InputLabel>
            <LabelWithIndicator {...args} type='optional' />
          </InputLabel>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Required'}</Label>
          <InputLabel>
            <LabelWithIndicator {...args} type='required' />
          </InputLabel>
        </Container>
      </Grid>
    </Grid>
  );
};

const IconTemplate = (args) => (
  <Grid container direction='column' spacing={6}>
    <Grid item>
      <Container>
        <Label variant='body2'>{'With Icon'}</Label>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <InputLabel>
              <LabelWithIndicator
                {...args}
                icon={
                  <Tooltip title='Tooltip example'>
                    <HelpOutline cursor='pointer' />
                  </Tooltip>
                }
                type='required'
              />
            </InputLabel>
          </Grid>
          <Grid item xs={3}>
            <InputLabel>
              <LabelWithIndicator
                {...args}
                icon={
                  <Tooltip title='Tooltip example'>
                    <HelpOutline cursor='pointer' />
                  </Tooltip>
                }
              />
            </InputLabel>
          </Grid>
          <Grid item xs={3}>
            <InputLabel error>
              <LabelWithIndicator
                {...args}
                icon={
                  <Tooltip title='Tooltip example'>
                    <HelpOutline cursor='pointer' />
                  </Tooltip>
                }
              />
            </InputLabel>
          </Grid>
          <Grid item xs={3}>
            <InputLabel disabled>
              <LabelWithIndicator
                {...args}
                icon={
                  <Tooltip title='Tooltip example'>
                    <HelpOutline cursor='pointer' />
                  </Tooltip>
                }
              />
            </InputLabel>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  </Grid>
);

const UseCasesTemplate = ({ label, ...rest }) => {
  const [files, setFiles] = useState([]);
  const handleUploadFieldChange = (files) => {
    setFiles(files);
  };

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'TextField'}</Label>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  label={<LabelWithIndicator {...rest} label={label} type='optional' />}
                  placeholder='Placeholder text'
                />
              </Grid>
              <Grid item xs={3}>
                <TextField label={label} required placeholder='Placeholder text' />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label={<LabelWithIndicator {...rest} label={label} type='optional' />}
                  placeholder='Placeholder text'
                  error
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label={<LabelWithIndicator {...rest} label={label} type='optional' />}
                  placeholder='Placeholder text'
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'SelectField'}</Label>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={3}>
                <SelectField
                  label={<LabelWithIndicator {...rest} label={label} type='optional' />}
                  placeholder='Placeholder text'
                  onChange={() => void 0}
                  value={[]}
                >
                  {[...Array(5)].map((item, index) => {
                    const itemText = `Item ${index + 1}`;

                    return (
                      <MenuItem key={index} value={itemText}>
                        {itemText}
                      </MenuItem>
                    );
                  })}
                </SelectField>
              </Grid>
              <Grid item xs={3}>
                <SelectField
                  label={label}
                  required
                  placeholder='Placeholder text'
                  onChange={() => void 0}
                  value={[]}
                >
                  {[...Array(5)].map((item, index) => {
                    const itemText = `Item ${index + 1}`;

                    return (
                      <MenuItem key={index} value={itemText}>
                        {itemText}
                      </MenuItem>
                    );
                  })}
                </SelectField>
              </Grid>
              <Grid item xs={3}>
                <SelectField
                  label={<LabelWithIndicator {...rest} label={label} type='optional' />}
                  placeholder='Placeholder text'
                  onChange={() => void 0}
                  value={[]}
                  error
                >
                  {[...Array(5)].map((item, index) => {
                    const itemText = `Item ${index + 1}`;

                    return (
                      <MenuItem key={index} value={itemText}>
                        {itemText}
                      </MenuItem>
                    );
                  })}
                </SelectField>
              </Grid>
              <Grid item xs={3}>
                <SelectField
                  label={<LabelWithIndicator {...rest} label={label} type='optional' />}
                  placeholder='Placeholder text'
                  onChange={() => void 0}
                  value={[]}
                  disabled
                >
                  {[...Array(5)].map((item, index) => {
                    const itemText = `Item ${index + 1}`;

                    return (
                      <MenuItem key={index} value={itemText}>
                        {itemText}
                      </MenuItem>
                    );
                  })}
                </SelectField>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'UploadField'}</Label>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={3}>
                <UploadField
                  files={files}
                  label={<LabelWithIndicator {...rest} label={label} type='optional' />}
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
                  label={<LabelWithIndicator {...rest} label={label} type='optional' />}
                  placeholder='Placeholder text'
                  onChange={handleUploadFieldChange}
                  error
                />
              </Grid>
              <Grid item xs={3}>
                <UploadField
                  files={files}
                  label={<LabelWithIndicator {...rest} label={label} type='optional' />}
                  placeholder='Placeholder text'
                  onChange={handleUploadFieldChange}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'PasswordField'}</Label>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={3}>
                <PasswordField
                  label={<LabelWithIndicator {...rest} label={label} type='optional' />}
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
                  label={<LabelWithIndicator {...rest} label={label} type='optional' />}
                  placeholder='Placeholder text'
                  defaultValue='1234'
                  error
                />
              </Grid>
              <Grid item xs={3}>
                <PasswordField
                  label={<LabelWithIndicator {...rest} label={label} type='optional' />}
                  placeholder='Placeholder text'
                  defaultValue='1234'
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Autocomplete'}</Label>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={3}>
                <Autocomplete
                  options={top100Films}
                  renderInput={(params) => (
                    <TextField
                      size='small'
                      label={
                        <LabelWithIndicator {...rest} label={label} type='optional' />
                      }
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
                      label={
                        <LabelWithIndicator {...rest} label={label} type='optional' />
                      }
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
                      label={
                        <LabelWithIndicator {...rest} label={label} type='optional' />
                      }
                      disabled
                    />
                  )}
                  size='small'
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Checkbox / Radio group'}</Label>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={3}>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>
                    <LabelWithIndicator label={'Group Label'} type='optional' />
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
                    <LabelWithIndicator label={'Group Label'} type='optional' />
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
                    <LabelWithIndicator label={'Group Label'} type='optional' />
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
        </Container>
      </Grid>
    </Grid>
  );
};

const commonArgs = {
  label: 'Label text'
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = { ...commonArgs, type: 'optional' };

export const Type = TypeTemplate.bind({});
Type.args = { ...commonArgs };

export const Icon = IconTemplate.bind({});
Icon.args = {
  ...commonArgs
};

export const UseCases = UseCasesTemplate.bind({});
UseCases.args = { ...commonArgs };
