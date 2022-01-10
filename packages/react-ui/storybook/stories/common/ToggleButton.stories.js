import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';

const options = {
  title: 'Common/Toggle Button',
  component: ToggleButtonGroup,
  argTypes: {
    size: {
      default: 'medium',
      control: {
        type: 'select',
        options: ['small', 'medium', 'large']
      }
    },
    orientation: {
      default: 'horizontal',
      control: {
        type: 'select',
        options: ['vertical', 'horizontal']
      }
    },
    exclusive: {
      default: true,
      control: {
        type: 'boolean'
      }
    }
  }
};
export default options;

const Template = (args) => {
  const [selected, setSelected] = React.useState(() => ['walk']);

  const handleAlignment = (event, newAlignment) => {
    setSelected(newAlignment);
  };

  return (
    <ToggleButtonGroup
      {...args}
      value={selected}
      onChange={handleAlignment}
      aria-label='text alignment'
    >
      <ToggleButton value='walk' aria-label='left aligned'>
        <DirectionsWalkIcon />
      </ToggleButton>
      <ToggleButton value='car' aria-label='centered'>
        <DriveEtaIcon />
      </ToggleButton>
      <ToggleButton value='airplane' aria-label='right aligned'>
        <AirplanemodeActiveIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

// const commonArgs = { helperText: 'Helper text' };

export const Playground = Template.bind({});

export const Vertical = Template.bind({});
Vertical.args = { orientation: 'vertical' };

export const MultiSelect = Template.bind({});
MultiSelect.args = { exclusive: false };
