import { Box, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import UploadField from '../../../src/components/organisms/UploadField';
import UploadIcon from '../../../src/assets/UploadIcon';

const options = {
  title: 'Organisms/UploadField',
  component: UploadField,
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

const Template = ({ ...args }) => <UploadField {...args} />;

const ExampleTemplate = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUploadFieldChange = (files) => {
    // TODO: validate files
    setFiles(files);
  };

  const handleUpload = () => {
    setUploading(true);

    setTimeout(() => {
      setUploading(false);
      setFiles([]);
    }, 2000);
  };

  return (
    <div>
      <Box>
        <UploadField
          accept='image/*'
          multiple
          files={files}
          label='Import data'
          helperText=' Upload a CSV or GeoJSON file, or a zip package with your Shapefile'
          onChange={handleUploadFieldChange}
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
