import { Grid } from '@mui/material';
import React, { useState } from 'react';
import Typography from '../../../src/components/atoms/Typography';
import UploadField4 from '../../../src/components/molecules/UploadField/UploadField4';
import { Container, DocContainer, DocHighlight, Label } from '../../utils/storyStyles';

const options = {
  title: 'Molecules/UploadField4',
  component: UploadField4,
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
      control: {
        type: 'text'
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
      description: 'Defines the file types the file input should accept.',
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
    },
    cursor: {
      control: {
        type: 'select',
        options: ['pointer', 'default']
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
  const handleUploadField4Change = (files) => {
    setFiles(files);
  };
  console.log('files', files);

  return <UploadField4 {...args} files={files} onChange={handleUploadField4Change} />;
};

const VariantsTemplate = ({ label, required, placeholder, ...rest }) => {
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const handleUploadField4Change = (files) => {
    setFiles(files);
  };
  const handleUploadField4Change2 = (files) => {
    setFiles2(files);
  };

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Filled'}</Label>
          <UploadField4
            {...rest}
            variant='filled'
            files={files}
            label={label}
            placeholder={placeholder}
            onChange={handleUploadField4Change}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Outlined'}</Label>
          <UploadField4
            {...rest}
            variant='outlined'
            files={files2}
            label={label}
            placeholder={placeholder}
            onChange={handleUploadField4Change2}
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
  const handleUploadField4Change = (files) => {
    setFiles(files);
  };
  const handleUploadField4Change2 = (files) => {
    setFiles2(files);
  };
  const handleUploadField4Change3 = (files) => {
    setFiles3(files);
  };
  const handleUploadField4Change4 = (files) => {
    setFiles4(files);
  };

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Label + helper text'}</Label>
          <UploadField4
            {...rest}
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            files={files}
            onChange={handleUploadField4Change}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Without label + helper text'}</Label>
          <UploadField4
            {...rest}
            placeholder={placeholder}
            files={files2}
            onChange={handleUploadField4Change2}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only label'}</Label>
          <UploadField4
            {...rest}
            label={label}
            placeholder={placeholder}
            files={files3}
            onChange={handleUploadField4Change3}
          />
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only helper text'}</Label>
          <UploadField4
            {...rest}
            placeholder={placeholder}
            helperText={helperText}
            files={files4}
            onChange={handleUploadField4Change4}
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
  const handleUploadField4Change = (files) => {
    setFiles(files);
  };
  const handleUploadField4Change2 = (files) => {
    setFiles2(files);
  };
  const handleUploadField4Change3 = (files) => {
    setFiles3(files);
  };
  const handleUploadField4Change4 = (files) => {
    setFiles4(files);
  };
  const handleUploadField4Change5 = (files) => {
    setFiles5(files);
  };
  const handleUploadField4Change6 = (files) => {
    setFiles6(files);
  };

  return (
    <Grid container spacing={6}>
      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Default</Typography>
        </Grid>
        <Grid item xs={4}>
          <UploadField4
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            files={files}
            onChange={handleUploadField4Change}
          />
        </Grid>
        <Grid item xs={4}>
          <UploadField4
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            files={files2}
            onChange={handleUploadField4Change2}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Focused</Typography>
        </Grid>
        <Grid item xs={4}>
          <UploadField4
            {...rest}
            variant='filled'
            label={label}
            placeholder={'placeholder focused'}
            focused
            files={files3}
            onChange={handleUploadField4Change3}
          />
        </Grid>
        <Grid item xs={4}>
          <UploadField4
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            focused
            files={files4}
            onChange={handleUploadField4Change4}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>Disabled</Typography>
        </Grid>
        <Grid item xs={4}>
          <UploadField4
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            disabled
          />
        </Grid>
        <Grid item xs={4}>
          <UploadField4
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
          <UploadField4
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error={'This is a error message.'}
            files={files5}
            onChange={handleUploadField4Change5}
          />
        </Grid>
        <Grid item xs={4}>
          <UploadField4
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error={'This is a error message.'}
            files={files6}
            onChange={handleUploadField4Change6}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Typography>In Progress</Typography>
        </Grid>
        <Grid item xs={4}>
          <UploadField4
            {...rest}
            variant='filled'
            label={label}
            placeholder={placeholder}
            inProgress
          />
        </Grid>
        <Grid item xs={4}>
          <UploadField4
            {...rest}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            inProgress
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const MultipleTemplate = ({ label, placeholder, defaultValue, helperText, ...rest }) => {
  const [files, setFiles] = useState([]);
  const handleUploadField4Change = (files) => {
    setFiles(files);
  };

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Default'}</Label>
          <UploadField4
            {...rest}
            multiple
            label={label}
            placeholder={placeholder}
            files={files}
            onChange={handleUploadField4Change}
          />
        </Container>
      </Grid>
    </Grid>
  );
};

const BehaviorTemplate = ({ label, placeholder, defaultValue, helperText, ...rest }) => {
  const [files, setFiles] = useState([]);
  const handleUploadField4Change = (files) => {
    setFiles(files);
  };

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Label variant='subtitle1'>{'Overflow'}</Label>
        <Container style={{ maxWidth: '440px' }}>
          <Label variant='body2'>{'Default'}</Label>
          <UploadField4
            {...rest}
            label={label}
            placeholder={placeholder}
            files={files}
            onChange={handleUploadField4Change}
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
          react-ui/src/components/molecules/UploadField4
        </DocHighlight>
      </Typography>
      <Typography mt={2}>
        For external use:
        <DocHighlight component='span'>
          {'import { UploadField4 } from "@carto/react-ui";'}
        </DocHighlight>
        .
      </Typography>
    </DocContainer>
  );
};

const commonArgs = {
  label: 'Label text',
  helperText: 'Upload a CSV or GeoJSON file, or a zip package with your Shapefile',
  accept: ['application/JSON', 'image/*'],
  name: 'upload-field'
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
