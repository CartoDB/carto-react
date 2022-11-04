import React, { useState } from 'react';
import { Grid, Slider, TextField, Tooltip } from '@mui/material';

const options = {
  title: 'Atoms/Slider',
  component: Slider,
  argTypes: {
    color: {
      defaultValue: 'primary',
      description:
        'The color of the component. It supports those theme colors that make sense for this component.',
      control: {
        type: 'select',
        options: ['primary', 'secondary']
      }
    },
    defaultValue: {
      defaultValue: 10,
      description: 'The default element value. Use when the component is not controlled.',
      control: {
        type: ['number', 'array'],
        options: [10, 100, [20, 80]]
      }
    },
    disabled: {
      defaultValue: false,
      description: 'If `true`, the slider will be disabled.',
      control: {
        type: 'boolean'
      }
    },
    getAriaLabel: {
      description:
        'Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider. Signature: `function(index: number) => string`',
      control: {
        type: 'function'
      }
    },
    getAriaValueText: {
      description:
        'Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider. Signature: `function(value: number, index: number) => string`',
      control: {
        type: 'function'
      }
    },
    marks: {
      defaultValue: false,
      description:
        'Marks indicate predetermined values to which the user can move the slider. If `true` the marks will be spaced according the value of the `step` prop. If an array, it should contain objects with `value` and an optional `label` keys.',
      control: {
        type: 'boolean',
        options: ['boolean', 'array']
      }
    },
    max: {
      defaultValue: 100,
      description: 'The maximum allowed value of the slider. Should not be equal to min.',
      control: {
        type: 'number'
      }
    },
    min: {
      defaultValue: 0,
      description: 'The minimum allowed value of the slider. Should not be equal to max.',
      control: {
        type: 'number'
      }
    },
    name: {
      description: 'Name attribute of the hidden `input` element.',
      control: {
        type: 'string'
      }
    },
    orientation: {
      defaultValue: 'horizontal',
      description: 'The slider orientation.',
      control: {
        type: 'select',
        options: ['horizontal', 'vertical']
      }
    },
    scale: {
      defaultValue: (x) => x,
      description: 'A transformation function, to change the scale of the slider.',
      control: {
        type: 'func'
      }
    },
    step: {
      defaultValue: 1,
      description:
        'The granularity with which the slider can step through values. (A "discrete" slider.) The `min` prop serves as the origin for the valid values. We recommend (max - min) to be evenly divisible by the step. When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.',
      control: {
        type: 'number'
      }
    },
    track: {
      defaultValue: 'normal',
      description:
        'The track presentation: - `normal` the track will render a bar representing the slider value. - `inverted` the track will render a bar representing the remaining slider value. - `false` the track will render without a bar.',
      control: {
        type: 'select',
        options: ['normal', 'inverted', false]
      }
    },
    value: {
      description:
        'The value of the slider. For ranged sliders, provide an array with two values.',
      control: {
        type: 'number'
      }
    },
    valueLabelDisplay: {
      defaultValue: 'off',
      description:
        'Controls when the value label is displayed: - `auto` the value label will display when the thumb is hovered or focused. - `on` will display persistently. - `off` will never display.',
      control: {
        type: 'select',
        options: ['off', 'auto', 'on']
      }
    },
    valueLabelFormat: {
      defaultValue: (x) => x,
      description:
        'The format function the value label value. When a function is provided, it should have the following signature: - {number} value The value labels value to format - {number} index The value labels index to format',
      control: {
        type: ['func', 'string']
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A32732'
    },
    status: {
      type: 'needUpdate'
    }
  }
};
export default options;

const Template = ({ ...args }) => {
  return <Slider {...args} />;
};

const RangeTemplate = ({ ...args }) => {
  const [value, setValue] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return <Slider {...args} value={value} onChange={handleChange} />;
};

const SliderWithInputTemplate = ({ ...args }) => {
  const [value, setValue] = useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Grid container direction='row' alignItems='center'>
      <Grid item xs>
        <Slider
          {...args}
          value={typeof value === 'number' ? value : 0}
          onChange={handleSliderChange}
        />
      </Grid>
      <Grid item style={{ paddingLeft: '24px' }}>
        <TextField
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          size='small'
          inputProps={{
            step: 10,
            min: 0,
            max: 100,
            type: 'number',
            'aria-labelledby': 'input-slider'
          }}
        />
      </Grid>
    </Grid>
  );
};

const CustomLabelTemplate = ({ ...args }) => {
  const CustomValueLabel = (props) => {
    const { children, open, value } = props;

    return (
      <Tooltip open={open} enterTouchDelay={0} placement='top' arrow title={value}>
        {children}
      </Tooltip>
    );
  };

  return (
    <Slider
      valueLabelDisplay='auto'
      components={{
        ValueLabel: CustomValueLabel
      }}
      {...args}
    />
  );
};

const marks = [
  {
    value: 0,
    label: '0°C'
  },
  {
    value: 20,
    label: '20°C'
  },
  {
    value: 37,
    label: '37°C'
  },
  {
    value: 100,
    label: '100°C'
  }
];

export const Playground = Template.bind({});
Playground.args = {};

export const DiscreteSliders = Template.bind({});
DiscreteSliders.args = {
  defaultValue: 30,
  step: 10,
  marks: true
};

export const CustomMarks = Template.bind({});
CustomMarks.args = {
  defaultValue: 20,
  valueLabelDisplay: 'auto',
  valueLabelFormat: (value) => `${value}°C`,
  marks: marks
};

export const RestrictedValues = Template.bind({});
RestrictedValues.args = {
  defaultValue: 20,
  step: null,
  valueLabelFormat: (value) => `${value}°C`,
  marks: marks
};

export const RangeSlider = RangeTemplate.bind({});
RangeSlider.args = {
  value: [20, 37]
};

export const SliderWithInputField = SliderWithInputTemplate.bind({});
SliderWithInputField.args = {};

export const SliderWithCustomLabel = CustomLabelTemplate.bind({});
SliderWithCustomLabel.args = { valueLabelFormat: (value) => `${value} units` };
