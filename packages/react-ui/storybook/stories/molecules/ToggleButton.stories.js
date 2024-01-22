import React from 'react';
import { ToggleButton, Grid, Divider } from '@mui/material';
import {
  CheckCircleOutline,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight
} from '@mui/icons-material';
import Typography from '../../../src/components/atoms/Typography';
import ToggleButtonGroup from '../../../src/components/atoms/ToggleButtonGroup';
import { DocContainer, DocHighlight, DocLink } from '../../utils/storyStyles';

const options = {
  title: 'Molecules/Toggle Button',
  component: ToggleButtonGroup,
  argTypes: {
    variant: {
      defaultValue: 'floating',
      control: {
        type: 'select',
        options: ['floating', 'contained', 'unbounded']
      }
    },
    backgroundColor: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'transparent']
      }
    },
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
      type: 'readyToReview'
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

const ToggleRow = ({ label, divider, fullWidth, exclusive, orientation, ...rest }) => {
  const [selected, setSelected] = React.useState(() => ['AlignLeft']);
  const isVertical = orientation === 'vertical';
  const dividerOrientation = isVertical ? 'horizontal' : 'vertical';

  const handleAlignment = (event, newAlignment) => {
    setSelected(newAlignment);
  };

  return (
    <ToggleButtonGroup
      {...rest}
      value={selected}
      onChange={handleAlignment}
      fullWidth={fullWidth}
      exclusive={exclusive}
      orientation={orientation}
      aria-label='text alignment'
    >
      <ToggleButton value='AlignLeft' aria-label='AlignLeft'>
        {label ? label : <FormatAlignLeft />}
      </ToggleButton>
      <ToggleButton value='AlignCenter' aria-label='AlignCenter'>
        {label ? label : <FormatAlignCenter />}
      </ToggleButton>
      {divider && (
        <Divider flexItem={!isVertical ? true : false} orientation={dividerOrientation} />
      )}
      <ToggleButton value='AlignRight' aria-label='AlignRight'>
        {label ? label : <FormatAlignRight />}
      </ToggleButton>
      <ToggleButton value='AlignJustify' aria-label='AlignJustify' disabled>
        {label ? label : <FormatAlignJustify />}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const DocTemplate = () => {
  return (
    <DocContainer severity='warning'>
      We have our own
      <DocLink href='https://github.com/CartoDB/carto-react/blob/master/packages/react-ui/src/components/atoms/ToggleButtonGroup.js'>
        ToggleButtonGroup
      </DocLink>
      component that extends <i>Mui ToggleButtonGroup</i> with some props (variant and
      backgroundColor support).
      <Typography mt={2}>
        So, instead of Mui ToggleButtonGroup, you should use this one:
        <DocHighlight component='span'>
          react-ui/src/components/atoms/ToggleButtonGroup
        </DocHighlight>
      </Typography>
      <Typography mt={2}>
        For external use:
        <DocHighlight component='span'>
          {'import { ToggleButtonGroup } from "@carto/react-ui";'}
        </DocHighlight>
        .
      </Typography>
    </DocContainer>
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
        <ToggleRow {...args} divider />
      </Grid>
      <Grid item>
        <ToggleRow {...args} divider size='small' />
      </Grid>
    </Grid>
  );
};

const VariantTemplate = (args) => {
  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <ToggleRow {...args} variant='floating' />
      </Grid>
      <Grid item>
        <ToggleRow {...args} variant='contained' />
      </Grid>
      <Grid item>
        <ToggleRow {...args} variant='unbounded' />
      </Grid>
    </Grid>
  );
};

const BgColorTemplate = (args) => {
  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <ToggleRow {...args} backgroundColor='primary' />
      </Grid>
      <Grid item>
        <ToggleRow {...args} backgroundColor='secondary' />
      </Grid>
      <Grid item>
        <ToggleRow {...args} backgroundColor='transparent' />
      </Grid>
    </Grid>
  );
};

const BehaviorTemplate = ({ exclusive, ...args }) => {
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

        <ToggleButtonGroup
          {...args}
          value={selected}
          onChange={handleAlignment}
          exclusive={exclusive}
        >
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
          exclusive={exclusive}
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

export const Guide = DocTemplate.bind({});

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

export const Variant = VariantTemplate.bind({});

export const BackgroundColor = BgColorTemplate.bind({});

export const Behavior = BehaviorTemplate.bind({});
