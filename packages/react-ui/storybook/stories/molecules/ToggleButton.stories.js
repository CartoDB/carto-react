import React from 'react';
import { ToggleButtonGroup, ToggleButton, Grid } from '@mui/material';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import TrainIcon from '@mui/icons-material/Train';

const options = {
  title: 'Molecules/Toggle Button',
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
    },
    label: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A36258'
    },
    status: {
      type: 'inDevelopment'
    }
  }
};
export default options;

const ToggleRow = ({ label, ...rest }) => {
  const [selected, setSelected] = React.useState(() => ['walk']);

  const handleAlignment = (event, newAlignment) => {
    setSelected(newAlignment);
  };

  return (
    <ToggleButtonGroup
      {...rest}
      value={selected}
      onChange={handleAlignment}
      aria-label='text alignment'
    >
      <ToggleButton value='walk' aria-label='walk'>
        {label ? label : <DirectionsWalkIcon />}
      </ToggleButton>
      <ToggleButton value='car' aria-label='drive'>
        {label ? label : <DriveEtaIcon />}
      </ToggleButton>
      <ToggleButton value='train' aria-label='train'>
        {label ? label : <TrainIcon />}
      </ToggleButton>
      <ToggleButton value='airplane' aria-label='airplane' disabled>
        {label ? label : <AirplanemodeActiveIcon />}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const SizesTemplate = (args) => {
  return (
    <Grid item container direction='column' spacing={4}>
      <Grid item>
        <ToggleRow size='large' />
      </Grid>
      <Grid item>
        <ToggleRow size='medium' />
      </Grid>
      <Grid item>
        <ToggleRow size='small' />
      </Grid>
    </Grid>
  );
};

export const Playground = ToggleRow.bind({});

export const Sizes = SizesTemplate.bind({});

export const Vertical = ToggleRow.bind({});
Vertical.args = { orientation: 'vertical' };

export const MultipleSelection = ToggleRow.bind({});
MultipleSelection.args = { exclusive: false };
