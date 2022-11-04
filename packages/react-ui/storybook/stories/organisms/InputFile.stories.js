import { Box, Button, CircularProgress, FormControl, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import InputFile from '../../../src/components/organisms/InputFile';
import { Alert } from '@mui/material';
import UploadIcon from '../../../src/assets/UploadIcon';
import Typography from '../../../src/components/atoms/Typography';

const options = {
  title: 'Organisms/InputFile',
  component: InputFile,
  argTypes: {
    placeholder: {
      defaultValue: 'Drag and drop your file or click to browse',
      description: 'Text to display as input placeholder.',
      control: {
        type: 'text'
      }
    },
    buttonText: {
      defaultValue: 'Browse',
      description: 'Text to display on the browse button.'
    },
    files: {
      defaultValue: [],
      description: 'Files handled by the input.'
    },
    accept: {
      defaultValue: 'application/JSON',
      description: 'String that defines the file types the file input should accept.',
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
    docs: {
      source: {
        type: 'auto'
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A36997'
    }
  }
};
export default options;

const Template = ({ ...args }) => <InputFile {...args} />;

const ExampleTemplate = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState();

  const handleInputFileChange = (files) => {
    // TODO: validate files
    setAlert({
      severity: 'warning',
      message: 'Some files are too big. The upload will take some time.',
      actionText: 'Close'
    });

    setFiles(files);
  };

  const handleUpload = () => {
    setUploading(true);

    setTimeout(() => {
      setUploading(false);
      setFiles([]);

      setAlert({
        severity: 'error',
        message: 'Oops! We seem to have a problem with the format of your dataset.',
        actionText: 'Close'
      });
    }, 2000);
  };

  return (
    <div>
      <FormControl size='small' margin='dense'>
        <InputLabel>Import data</InputLabel>
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <InputFile
            accept='image/*'
            multiple
            files={files}
            onChange={handleInputFileChange}
          />
          <Button
            color='primary'
            size='small'
            startIcon={uploading ? <CircularProgress size={16} /> : <UploadIcon />}
            disabled={!files.length}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Box>
        <Box mt={1}>
          <Typography
            variant='caption'
            color='textSecondary'
            style={{ fontWeight: 'normal' }}
          >
            Upload a CSV or GeoJSON file, or a zip package with your Shapefile
          </Typography>
        </Box>
      </FormControl>

      {alert && (
        <Box mt={1}>
          <Alert severity={alert.severity} onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        </Box>
      )}
    </div>
  );
};

export const Default = Template.bind({});

export const Example = ExampleTemplate.bind({});
Example.parameters = {
  docs: {
    source: {
      type: 'code'
    }
  }
};
