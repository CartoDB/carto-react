import { InfoOutlined } from '@mui/icons-material';
import { Grid, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import Button from '../../../src/components/atoms/Button';
import TooltipData from '../../../src/components/organisms/TooltipData';
import { commonPalette } from '../../../src/theme/sections/palette';
import {
  Container,
  DocContainer,
  DocHighlight,
  Label,
  Standalone
} from '../../utils/storyStyles';

const options = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  argTypes: {
    title: {
      control: {
        type: 'text'
      }
    },
    placement: {
      defaultValue: 'top',
      control: {
        type: 'select',
        options: ['top', 'left', 'right', 'bottom']
      }
    },
    arrow: {
      defaultValue: true,
      control: {
        type: 'boolean'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A36257'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const TooltipBox = ({ title, ...args }) => {
  return (
    <Container justifyContent='center'>
      <Label variant='body2'>{title}</Label>

      <Tooltip {...args} title={title}>
        <IconButton>
          <InfoOutlined />
        </IconButton>
      </Tooltip>
    </Container>
  );
};

const TooltipPlaygroundTemplate = (args) => {
  return (
    <Standalone>
      <Tooltip {...args}>
        <IconButton>
          <InfoOutlined />
        </IconButton>
      </Tooltip>
    </Standalone>
  );
};

const TooltipTextTemplate = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Tooltip title='Tooltip'>
            <IconButton>
              <InfoOutlined />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip
            title='This is an example to show that
tooltip text can be longer.'
          >
            <IconButton>
              <InfoOutlined />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Container>
  );
};

const dataTooltip1 = [
  {
    value: 123000
  }
];
const dataTooltip2 = [
  {
    value: 123000
  },
  {
    value: 123000,
    color: commonPalette.qualitative.bold[6]
  },
  {
    value: 123000,
    color: commonPalette.qualitative.bold[9]
  }
];
const dataTooltip3 = [
  {
    category: 'Category 1',
    value: 123000,
    outlinedBullet: true
  }
];
const dataTooltip4 = [
  {
    category: 'Category 1',
    value: 123000,
    outlinedBullet: true
  },
  {
    category: 'Category 2',
    value: 123000,
    outlinedBullet: true,
    color: commonPalette.qualitative.bold[6]
  },
  {
    category: 'Category 3',
    value: 123000,
    outlinedBullet: true,
    color: commonPalette.qualitative.bold[9]
  }
];

const TooltipDataTemplate = () => {
  return (
    <Grid container justifyContent='space-between' spacing={2}>
      <Grid item>
        <Tooltip title={<TooltipData title='Title' items={dataTooltip1} />}>
          <IconButton>
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title={<TooltipData title='Title' items={dataTooltip2} />}>
          <IconButton>
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title={<TooltipData title='Title' items={dataTooltip3} />}>
          <IconButton>
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title={<TooltipData title='Title' items={dataTooltip4} />}>
          <IconButton>
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

const TooltipArrowTemplate = (args) => {
  return (
    <Grid container alignItems='flex-start' direction='column' spacing={2}>
      <Grid item>
        <TooltipBox {...args} title='No arrow' arrow={false} />
      </Grid>
      <Grid item>
        <TooltipBox {...args} title='Tooltip with arrow' />
      </Grid>
    </Grid>
  );
};

const TooltipPositionTemplate = (args) => {
  return (
    <Grid container alignItems='flex-start' direction='column' spacing={2}>
      <Grid item>
        <TooltipBox {...args} title='Tooltip top' />
      </Grid>
      <Grid item>
        <TooltipBox {...args} title='Tooltip right' placement='right' />
      </Grid>
      <Grid item>
        <TooltipBox {...args} title='Tooltip left' placement='left' />
      </Grid>
      <Grid item>
        <TooltipBox {...args} title='Tooltip bottom' placement='bottom' />
      </Grid>
    </Grid>
  );
};

const TooltipBehaviorTemplate = (args) => {
  return (
    <Grid container alignItems='flex-start' direction='column' spacing={2}>
      <Grid item>
        <TooltipBox {...args} title='Default' />
      </Grid>

      <Grid item>
        <Container>
          <Label variant='body2'>{'Follow cursor'}</Label>

          <Tooltip
            {...args}
            followCursor
            arrow={false}
            title='When followCursor is true, Tooltip should have arrow={false} property too'
          >
            <Button variant='outlined'>{'Long Button'}</Button>
          </Tooltip>
        </Container>
      </Grid>
    </Grid>
  );
};

const DocTemplate = () => {
  return (
    <DocContainer severity='warning'>
      By default a Tooltip is placed <DocHighlight component='span'>top</DocHighlight> and
      has an <DocHighlight component='span'>arrow</DocHighlight> indicator, so you don't
      need to specify these properties anymore.
    </DocContainer>
  );
};

export const Playground = TooltipPlaygroundTemplate;
Playground.args = { title: 'Text' };

export const Guide = DocTemplate.bind({});

export const Text = TooltipTextTemplate.bind({});

export const Data = TooltipDataTemplate.bind({});

export const Arrow = TooltipArrowTemplate.bind({});

export const Position = TooltipPositionTemplate.bind({});

export const Behavior = TooltipBehaviorTemplate.bind({});
