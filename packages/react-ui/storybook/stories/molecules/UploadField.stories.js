import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '../../../src/components/atoms/Typography';
import UploadField from '../../../src/components/molecules/UploadField';

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
    dragPlaceholder: {
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

const Template = ({ ...args }) => {
  const [files, setFiles] = useState([]);
  const handleUploadFieldChange = (files) => {
    setFiles(files);
  };

  return <UploadField {...args} files={files} onChange={handleUploadFieldChange} />;
};

const VariantsTemplate = ({ label, required, placeholder, dragPlaceholder, ...rest }) => {
  const classes = useStyles();
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
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Filled'}
          </Typography>
          <UploadField
            {...rest}
            variant='filled'
            files={files}
            label={label}
            placeholder={placeholder}
            dragPlaceholder={dragPlaceholder}
            onChange={handleUploadFieldChange}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Outlined'}
          </Typography>
          <UploadField
            {...rest}
            variant='outlined'
            files={files2}
            label={label}
            placeholder={placeholder}
            dragPlaceholder={dragPlaceholder}
            onChange={handleUploadFieldChange2}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const LabelAndHelperTextTemplate = ({ label, placeholder, helperText, ...rest }) => {
  const classes = useStyles();
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
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Label + helper text'}
          </Typography>
          <UploadField
            {...rest}
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            files={files}
            onChange={handleUploadFieldChange}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Without label + helper text'}
          </Typography>
          <UploadField
            {...rest}
            placeholder={placeholder}
            files={files2}
            onChange={handleUploadFieldChange2}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Only label'}
          </Typography>
          <UploadField
            {...rest}
            label={label}
            placeholder={placeholder}
            files={files3}
            onChange={handleUploadFieldChange3}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Only helper text'}
          </Typography>
          <UploadField
            {...rest}
            placeholder={placeholder}
            helperText={helperText}
            files={files4}
            onChange={handleUploadFieldChange4}
          />
        </Box>
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
            {'Default'}
          </Typography>
          <UploadField
            {...rest}
            multiple
            label={label}
            placeholder={placeholder}
            files={files}
            onChange={handleUploadFieldChange}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const BehaviorTemplate = ({ label, placeholder, defaultValue, helperText, ...rest }) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const handleUploadFieldChange = (files) => {
    setFiles(files);
  };

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
          <UploadField
            {...rest}
            label={label}
            placeholder={placeholder}
            files={files}
            onChange={handleUploadFieldChange}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const commonArgs = {
  label: 'Label text',
  placeholder: 'Drag and drop your file or click to browse',
  dragPlaceholder: 'Drop your file here...',
  helperText: 'Upload a CSV or GeoJSON file, or a zip package with your Shapefile',
  buttonText: 'Browse',
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
