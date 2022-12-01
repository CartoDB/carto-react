import { Box } from '@mui/material';
import React, { useState } from 'react';
import UploadField from '../../../src/components/organisms/UploadField';

const options = {
  title: 'Organisms/UploadField',
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A36997'
    },
    status: {
      type: 'readyToReview'
    }
  }
};
export default options;

const Template = ({ ...args }) => <UploadField {...args} />;

const ExampleTemplate = ({ label, ...rest }) => {
  const [files, setFiles] = useState([]);

  const handleUploadFieldChange = (files) => {
    setFiles(files);
  };

  return (
    <Box>
      <UploadField
        {...rest}
        accept='image/*'
        multiple
        files={files}
        label={label}
        onChange={handleUploadFieldChange}
      />
    </Box>
  );
};

const commonArgs = {
  label: 'Label text',
  placeholder: 'Drag and drop your file or click to browse',
  helperText: 'Upload a CSV or GeoJSON file, or a zip package with your Shapefile',
  buttonText: 'Browse'
};

export const Playground = Template.bind({});
Playground.args = { ...commonArgs };

export const Example = ExampleTemplate.bind({});
Example.args = { ...commonArgs };
Example.parameters = {
  docs: {
    source: {
      type: 'code'
    }
  }
};
