import React from 'react';
import { ToggleButtonGroup, ToggleButton, Grid, Divider } from '@mui/material';
import {
  CheckCircleOutline,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight
} from '@mui/icons-material';

const options = {
  title: 'Molecules/Toggle Button',
  component: ToggleButtonGroup,
  argTypes: {
    size: {
      defaultValue: 'medium',
      control: {
        type: 'select',
        options: ['small', 'medium']
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

const Toggle = ({ label, ...rest }) => {
  const [selected, setSelected] = React.useState(false);

  return (
    <ToggleButton
      {...rest}
      value='check'
      aria-label='check'
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      {label ? label : <CheckCircleOutline />}
    </ToggleButton>
  );
};

const ToggleRow = ({ label, divider, ...rest }) => {
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
        {label ? label : <FormatAlignLeft />}
      </ToggleButton>
      <ToggleButton value='car' aria-label='drive'>
        {label ? label : <FormatAlignCenter />}
      </ToggleButton>
      <ToggleButton value='train' aria-label='train'>
        {label ? label : <FormatAlignRight />}
      </ToggleButton>
      {divider && <Divider flexItem orientation='vertical' />}
      <ToggleButton value='airplane' aria-label='airplane' disabled>
        {label ? label : <FormatAlignJustify />}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const SizesTemplate = (args) => {
  return (
    <Grid item container alignItems='center' spacing={4}>
      <Grid item>
        <Toggle {...args} size='large' />
      </Grid>
      <Grid item>
        <Toggle {...args} size='medium' />
      </Grid>
      <Grid item>
        <Toggle {...args} size='small' />
      </Grid>
    </Grid>
  );
};

const TextTemplate = (args) => {
  return (
    <Grid item container alignItems='center' spacing={4}>
      <Grid item>
        <Toggle {...args} size='medium' label='CARTO' />
      </Grid>
      <Grid item>
        <Toggle {...args} size='small' label='CARTO' />
      </Grid>
    </Grid>
  );
};

const GroupTemplate = (args) => {
  return (
    <Grid item container direction='column' spacing={4}>
      <Grid item>
        <ToggleRow {...args} size='medium' />
      </Grid>
      <Grid item>
        <ToggleRow {...args} size='small' />
      </Grid>
    </Grid>
  );
};

const VerticalGroupTemplate = (args) => {
  return (
    <Grid item container spacing={4}>
      <Grid item>
        <ToggleRow {...args} size='medium' />
      </Grid>
      <Grid item>
        <ToggleRow {...args} size='small' />
      </Grid>
    </Grid>
  );
};

const DividedTemplate = (args) => {
  return (
    <Grid item container direction='column' spacing={4}>
      <Grid item>
        <ToggleRow divider />
      </Grid>
    </Grid>
  );
};

export const Playground = ToggleRow.bind({});

export const Sizes = SizesTemplate.bind({});

export const Text = TextTemplate.bind({});

export const HorizontalGroup = GroupTemplate.bind({});

export const HorizontalTextGroup = GroupTemplate.bind({});
HorizontalTextGroup.args = { label: 'Text' };

export const VerticalGroup = VerticalGroupTemplate.bind({});
VerticalGroup.args = { orientation: 'vertical' };

export const DividedGroup = DividedTemplate.bind({});

export const MultipleSelection = GroupTemplate.bind({});
MultipleSelection.args = { exclusive: false };
