import React, { useState } from 'react';
import MultipleSelectField from '../../../src/components/atoms/MultipleSelectField';

const options = {
  title: 'Atoms/Multiple Select Field',
  component: MultipleSelectField,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['outlined', 'filled', 'standard']
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
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A29965'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const menuItems = [
  {
    label: 'table_openstreetmap_pointsofinterest',
    value: '10Long'
  },
  {
    label: 'Twenty',
    value: '20'
  },
  {
    label: 'Thirty',
    value: '30'
  },
  {
    label: 'Forty',
    value: '40'
  },
  {
    label: 'Fifty',
    value: '50'
  }
];

const PlaygroundTemplate = ({ label, placeholder, ...rest }) => {
  const [content, setContent] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setContent(
      // On autofill we get a stringified value
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const isItemSelected = menuItems.map((item) => content.includes(item.value));

  return (
    <MultipleSelectField
      {...rest}
      label={label}
      placeholder={placeholder}
      items={menuItems}
      onChange={handleChange}
      value={content}
      itemChecked={isItemSelected}
    />
  );
};

const commonArgs = {
  label: 'Label text',
  placeholder: 'Placeholder text',
  helperText: 'Helper text.'
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = { ...commonArgs };

export const Counter = PlaygroundTemplate.bind({});
Counter.args = { ...commonArgs, counter: true };
