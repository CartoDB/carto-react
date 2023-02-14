import React from 'react';
import { ToggleButtonGroup, ToggleButton, Grid, Divider } from '@mui/material';
import {
  CheckCircleOutline,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight
} from '@mui/icons-material';
import Typography from '../../../src/components/atoms/Typography';

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
    disabled: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    fullWidth: {
      defaultValue: false,
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
      type: 'validated'
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

const ToggleRow = ({ label, divider, fullWidth, ...rest }) => {
  const [selected, setSelected] = React.useState(() => ['AlignLeft']);

  const handleAlignment = (event, newAlignment) => {
    setSelected(newAlignment);
  };

  return (
    <ToggleButtonGroup
      {...rest}
      value={selected}
      onChange={handleAlignment}
      fullWidth={fullWidth}
      aria-label='text alignment'
    >
      <ToggleButton value='AlignLeft' aria-label='AlignLeft'>
        {label ? label : <FormatAlignLeft />}
      </ToggleButton>
      <ToggleButton value='AlignCenter' aria-label='AlignCenter'>
        {label ? label : <FormatAlignCenter />}
      </ToggleButton>
      {divider && <Divider flexItem orientation='vertical' />}
      <ToggleButton value='AlignRight' aria-label='AlignRight'>
        {label ? label : <FormatAlignRight />}
      </ToggleButton>
      <ToggleButton value='AlignJustify' aria-label='AlignJustify' disabled>
        {label ? label : <FormatAlignJustify />}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const IconTemplate = (args) => {
  return (
    <Grid container alignItems='center' spacing={4}>
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
    <Grid container alignItems='center' spacing={4}>
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
    <Grid container direction='column' spacing={4}>
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
    <Grid container spacing={4}>
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
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <ToggleRow divider />
      </Grid>
      <Grid item>
        <ToggleRow divider size='small' />
      </Grid>
    </Grid>
  );
};

const BehaviorTemplate = (args) => {
  const [selected, setSelected] = React.useState(() => ['opt1']);
  const [selected2, setSelected2] = React.useState(() => ['opt1']);

  const handleAlignment = (event, newAlignment) => {
    setSelected(newAlignment);
  };
  const handleAlignment2 = (event, newAlignment) => {
    setSelected2(newAlignment);
  };

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item container direction='column' alignItems='flex-start'>
        <Typography variant='body1'>{'Hug Text'}</Typography>
        <Typography variant='body2'>{'Default behavior'}</Typography>

        <ToggleButtonGroup {...args} value={selected} onChange={handleAlignment}>
          <ToggleButton value='opt1'>{'Opt 1'}</ToggleButton>
          <ToggleButton value='opt2'>{'Opt 2'}</ToggleButton>
          <ToggleButton value='opt3'>{'Option 3'}</ToggleButton>
        </ToggleButtonGroup>
      </Grid>

      <Grid item container direction='column' alignItems='flex-start'>
        <Typography variant='body1'>{'Fill Text'}</Typography>
        <Typography variant='body2'>{'"fullWidth" with custom width limit'}</Typography>

        <ToggleButtonGroup
          {...args}
          value={selected2}
          onChange={handleAlignment2}
          fullWidth
          style={{ width: '496px' }}
        >
          <ToggleButton value='opt1'>{'Opt 1'}</ToggleButton>
          <ToggleButton value='opt2'>{'Opt 2'}</ToggleButton>
          <ToggleButton value='opt3'>{'Option 3'}</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export const Playground = ToggleRow.bind({});

export const Icon = IconTemplate.bind({});

export const Text = TextTemplate.bind({});

export const VerticalGroup = VerticalGroupTemplate.bind({});
VerticalGroup.args = { orientation: 'vertical' };

export const HorizontalGroup = GroupTemplate.bind({});

export const DividedGroup = DividedTemplate.bind({});

export const HorizontalTextGroup = GroupTemplate.bind({});
HorizontalTextGroup.args = { label: 'Text' };

export const MultipleSelectionGroup = GroupTemplate.bind({});
MultipleSelectionGroup.args = { exclusive: false };

export const Behavior = BehaviorTemplate.bind({});
