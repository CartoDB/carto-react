import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import TrainIcon from '@material-ui/icons/Train';

const options = {
  title: 'Common/Toggle Button',
  component: ToggleButtonGroup,
  argTypes: {
    size: {
      default: 'small',
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
      size='small'
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
