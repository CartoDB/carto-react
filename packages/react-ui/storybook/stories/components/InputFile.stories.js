import React from 'react';
import InputFile from '../../../src/components/InputFile';

const options = {
  title: 'Components/InputFile',
  component: InputFile,
  argTypes: {
    title: {
      defaultValue: 'Import data',
      description: 'Component title.',
      control: {
        type: 'text'
      }
    },
    placeholder: {
      defaultValue: 'Drag and drop your file or click to browse',
      description: 'Text to display as input placeholder.',
      control: {
        type: 'text'
      }
    },
    buttonText: {
      defaultValue: 'Upload',
      description: 'Text to display on the upload button',
      control: {
        type: 'text'
      }
    },
    browseButtonText: {
      defaultValue: 'Browse',
      description: 'Text to display on the browse button',
      control: {
        type: 'text'
      }
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
  }
};
export default options;

const Template = ({ ...args }) => <InputFile {...args} />;

export const Default = Template.bind({});
Default.args = {};
