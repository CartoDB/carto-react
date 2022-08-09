import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import TrainIcon from '@mui/icons-material/Train';

const options = {
  title: 'Common/Toggle Button',
  component: ToggleButtonGroup,
  argTypes: {
    size: {
      defaultValue: 'medium',
      control: {
        type: 'select',
        options: ['small', 'medium', 'large']
      }
    },
    orientation: {
      defaultValue: 'horizontal',
      control: {
        type: 'select',
        options: ['vertical', 'horizontal']
      }
    },
    exclusive: {
      defaultValue: true,
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
      <ToggleButton value='walk' aria-label='walk'>
        <DirectionsWalkIcon />
      </ToggleButton>
      <ToggleButton value='car' aria-label='drive'>
        <DriveEtaIcon />
      </ToggleButton>
      <ToggleButton value='train' aria-label='train'>
        <TrainIcon />
      </ToggleButton>
      <ToggleButton value='airplane' aria-label='airplane' disabled>
        <AirplanemodeActiveIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const DefaultPropsTemplate = () => {
  const [selected, setSelected] = React.useState(() => ['walk']);

  const handleAlignment = (event, newAlignment) => {
    setSelected(newAlignment);
  };

  return (
    <ToggleButtonGroup
      orientation='horizontal'
      exclusive={false}
      value={selected}
      onChange={handleAlignment}
      aria-label='text alignment'
    >
      <ToggleButton value='walk' aria-label='walk'>
        <DirectionsWalkIcon />
      </ToggleButton>
      <ToggleButton value='car' aria-label='drive'>
        <DriveEtaIcon />
      </ToggleButton>
      <ToggleButton value='train' aria-label='train'>
        <TrainIcon />
      </ToggleButton>
      <ToggleButton value='airplane' aria-label='airplane' disabled>
        <AirplanemodeActiveIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export const Playground = Template.bind({});

export const DefaultProps = DefaultPropsTemplate.bind({});

export const OrientationVertical = Template.bind({});
OrientationVertical.args = { orientation: 'vertical' };

export const MultipleSelection = Template.bind({});
MultipleSelection.args = { exclusive: false };
