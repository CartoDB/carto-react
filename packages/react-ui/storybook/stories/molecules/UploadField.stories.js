import { Grid } from '@mui/material';
import React, { useState } from 'react';
import Typography from '../../../src/components/atoms/Typography';
import UploadField from '../../../src/components/molecules/UploadField/UploadField';
import { Container, DocContainer, DocHighlight, Label } from '../../utils/storyStyles';

const options = {
  title: 'Molecules/UploadField',
  component: UploadField,
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
    },
    buttonText: {
      control: {
        type: 'text'
      }
    },
    files: {
      defaultValue: [],
      description: 'Files handled by the input.'
    },
    accept: {
      defaultValue: ['application/JSON'],
      description:
        'Array of strings that defines the file types the file input should accept.',
      control: {
        type: 'string'
      }
    },
    multiple: {
      defaultValue: false,
      description: 'Specifies that multiple files can be chosen at once.',
      control: {
        type: 'boolean'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A36997'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const Template = ({ ...args }) => {
  const [files, setFiles] = useState([]);
  const handleUploadFieldChange = (files) => {
    setFiles(files);
  };

  return <UploadField {...args} files={files} onChange={handleUploadFieldChange} />;
};

const VariantsTemplate = ({ label, required, placeholder, ...rest }) => {
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const handleUploadFieldChange = (files) => {
    setFiles(files);
  };
  const handleUploadFieldChange2 = (files) => {
    setFiles2(files);
  };

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Filled'}</Label>
          <UploadField
            {...rest}
            variant='filled'
            files={files}
            label={label}
            placeholder={placeholder}
            onChange={handleUploadFieldChange}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Outlined'}</Label>
          <UploadField
            {...rest}
            variant='outlined'
            files={files2}
            label={label}
            placeholder={placeholder}
            onChange={handleUploadFieldChange2}
          />
        </Container>
      </Grid>
    </Grid>
  );
};

const LabelAndHelperTextTemplate = ({ label, placeholder, helperText, ...rest }) => {
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [files3, setFiles3] = useState([]);
  const [files4, setFiles4] = useState([]);
  const handleUploadFieldChange = (files) => {
    setFiles(files);
  };
  const handleUploadFieldChange2 = (files) => {
    setFiles2(files);
  };
  const handleUploadFieldChange3 = (files) => {
    setFiles3(files);
  };
  const handleUploadFieldChange4 = (files) => {
    setFiles4(files);
  };

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Label + helper text'}</Label>
          <UploadField
            {...rest}
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            files={files}
            onChange={handleUploadFieldChange}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Without label + helper text'}</Label>
          <UploadField
            {...rest}
            placeholder={placeholder}
            files={files2}
            onChange={handleUploadFieldChange2}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only label'}</Label>
          <UploadField
            {...rest}
            label={label}
            placeholder={placeholder}
            files={files3}
            onChange={handleUploadFieldChange3}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only helper text'}</Label>
          <UploadField
            {...rest}
            placeholder={placeholder}
            helperText={helperText}
            files={files4}
            onChange={handleUploadFieldChange4}
          />
        </Container>
      </Grid>
    </Grid>
  );
};

const SizeTemplate = ({ label, placeholder, defaultValue, helperText, ...rest }) => {
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [files3, setFiles3] = useState([]);
  const [files4, setFiles4] = useState([]);
  const [files5, setFiles5] = useState([]);
  const [files6, setFiles6] = useState([]);
  const handleUploadFieldChange = (files) => {
    setFiles(files);
  };
  const handleUploadFieldChange2 = (files) => {
    setFiles2(files);
  };
  const handleUploadFieldChange3 = (files) => {
    setFiles3(files);
  };
  const handleUploadFieldChange4 = (files) => {
    setFiles4(files);
  };
  const handleUploadFieldChange5 = (files) => {
    setFiles5(files);
  };
  const handleUploadFieldChange6 = (files) => {
    setFiles6(files);
  };

  return (
    <Grid container spacing={6}>
      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Default</Typography>
        </Grid>
        <Grid item xs={4}>
          <UploadField
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            files={files}
            onChange={handleUploadFieldChange}
          />
        </Grid>
        <Grid item xs={4}>
          <UploadField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            files={files2}
            onChange={handleUploadFieldChange2}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Focused</Typography>
        </Grid>
        <Grid item xs={4}>
          <UploadField
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            focused
            files={files3}
            onChange={handleUploadFieldChange3}
          />
        </Grid>
        <Grid item xs={4}>
          <UploadField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            focused
            files={files4}
            onChange={handleUploadFieldChange4}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Disabled</Typography>
        </Grid>
        <Grid item xs={4}>
          <UploadField
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            disabled
          />
        </Grid>
        <Grid item xs={4}>
          <UploadField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            disabled
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Error</Typography>
        </Grid>
        <Grid item xs={4}>
          <UploadField
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error
            files={files5}
            onChange={handleUploadFieldChange5}
          />
        </Grid>
        <Grid item xs={4}>
          <UploadField
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error
            files={files6}
            onChange={handleUploadFieldChange6}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const MultipleTemplate = ({ label, placeholder, defaultValue, helperText, ...rest }) => {
  const [files, setFiles] = useState([]);
  const handleUploadFieldChange = (files) => {
    setFiles(files);
  };

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Default'}</Label>
          <UploadField
            {...rest}
            multiple
            label={label}
            placeholder={placeholder}
            files={files}
            onChange={handleUploadFieldChange}
          />
        </Container>
      </Grid>
    </Grid>
  );
};

const BehaviorTemplate = ({ label, placeholder, defaultValue, helperText, ...rest }) => {
  const [files, setFiles] = useState([]);
  const handleUploadFieldChange = (files) => {
    setFiles(files);
  };

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Label variant='subtitle1'>{'Overflow'}</Label>
        <Container style={{ maxWidth: '440px' }}>
          <Label variant='body2'>{'Default'}</Label>
          <UploadField
            {...rest}
            label={label}
            placeholder={placeholder}
            files={files}
            onChange={handleUploadFieldChange}
          />
        </Container>
      </Grid>
    </Grid>
  );
};

const DocTemplate = () => {
  return (
    <DocContainer severity='warning'>
      This component is used to display and input <i>{`type='file'`}</i>.
      <Typography mt={2}>
        We are replacing our old <DocHighlight component='span'>InputFile</DocHighlight>
        component by this new one.
      </Typography>
      <Typography mt={2}>
        So, instead of <i>{'<Inputfile />'}</i>, you should use this one:
        <DocHighlight component='span'>
          react-ui/src/components/molecules/UploadField
        </DocHighlight>
      </Typography>
      <Typography mt={2}>
        For external use:
        <DocHighlight component='span'>
          {'import { UploadField } from "@carto/react-ui";'}
        </DocHighlight>
        .
      </Typography>
    </DocContainer>
  );
};

const commonArgs = {
  label: 'Label text',
  helperText: 'Upload a CSV or GeoJSON file, or a zip package with your Shapefile',
  accept: ['application/JSON', 'image/*']
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

export const Playground = Template.bind({});
Playground.args = { ...commonArgs };

export const Guide = DocTemplate.bind({});

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
