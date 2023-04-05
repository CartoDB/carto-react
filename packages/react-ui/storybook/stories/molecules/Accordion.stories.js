import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material';
import { Typography } from '@carto/react-ui';
import { BoxContent, TitleContent } from '../../utils/storyStyles';
import AccordionGroup from '../../../src/components/molecules/AccordionGroup';

const options = {
  title: 'Molecules/Accordion',
  component: Accordion,
  argTypes: {
    defaultExpanded: {
      control: {
        type: 'boolean'
      }
    },
    variant: {
      control: {
        type: 'select',
        options: ['standard', 'outlined']
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1925%3A30532&t=Y3JoU7theewbWKOW-0'
    },
    status: {
      type: 'readyToReview'
    }
  }
};
export default options;

const items = [
  {
    summary: 'Accordion summary 1',
    content: <Typography variant='body2'>text</Typography>
  },
  {
    summary: 'Accordion summary 2',
    content: (
      <>
        <Typography variant='body2' mb={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et mauris urna.
          Mauris non feugiat arcu, a varius justo. Vivamus placerat ante purus, a luctus
          magna convallis pretium. In a laoreet mi, sit amet rutrum neque.
        </Typography>
        <Typography variant='caption' component='p'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </>
    )
  },
  {
    summary: 'Accordion summary 3',
    content: (
      <Typography variant='body2'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et mauris urna.
        Mauris non feugiat arcu, a varius justo.
      </Typography>
    )
  }
];

const Template = ({ ...args }) => {
  return (
    <Accordion {...args}>
      <AccordionSummary>Accordion summary</AccordionSummary>
      <AccordionDetails>
        <Typography variant='body2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et mauris urna.
          Mauris non feugiat arcu, a varius justo. Vivamus placerat ante purus, a luctus
          magna convallis pretium. In a laoreet mi, sit amet rutrum neque.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const SingleTemplate = ({ ...args }) => {
  return (
    <Accordion {...args}>
      <AccordionSummary>Accordion summary</AccordionSummary>
      <AccordionDetails>
        <Typography variant='body2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et mauris urna.
          Mauris non feugiat arcu, a varius justo. Vivamus placerat ante purus, a luctus
          magna convallis pretium. In a laoreet mi, sit amet rutrum neque.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const GroupTemplate = ({ variant, ...args }) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Standard'}</TitleContent>
          <AccordionGroup {...args} variant='standard' items={items} />
        </BoxContent>
      </Grid>
      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Outlined'}</TitleContent>
          <AccordionGroup {...args} variant='outlined' items={items} />
        </BoxContent>
      </Grid>
    </Grid>
  );
};

const disabledVariantArgType = {
  variant: { table: { disable: true } }
};

export const Playground = Template.bind({});

export const Single = SingleTemplate.bind({});

export const Group = GroupTemplate.bind({});
Group.argTypes = disabledVariantArgType;
