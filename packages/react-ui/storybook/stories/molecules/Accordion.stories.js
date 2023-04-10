import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid
} from '@mui/material';
import { Typography } from '@carto/react-ui';
import { BoxContent, TitleContent } from '../../utils/storyStyles';
import AccordionGroup from '../../../src/components/molecules/AccordionGroup';

const options = {
  title: 'Molecules/Accordion',
  component: Accordion,
  argTypes: {
    defaultExpanded: {
      defaultValue: false,
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
    content: <Typography variant='body2'>text</Typography>,
    disabled: false
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
    ),
    disabled: false
  },
  {
    summary: 'Accordion summary 3',
    content: (
      <Typography variant='body2'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et mauris urna.
        Mauris non feugiat arcu, a varius justo.
      </Typography>
    ),
    disabled: true
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
        <TitleContent variant='subtitle1'>
          {'AccordionGroup custom component'}
        </TitleContent>
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

const StatesTemplate = ({ ...args }) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Closed (default)'}</TitleContent>
          <Accordion {...args}>
            <AccordionSummary>Accordion summary</AccordionSummary>
            <AccordionDetails>
              <Typography variant='body2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et mauris
                urna. Mauris non feugiat arcu, a varius justo. Vivamus placerat ante
                purus, a luctus magna convallis pretium. In a laoreet mi, sit amet rutrum
                neque.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </BoxContent>
      </Grid>
      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Open'}</TitleContent>
          <Accordion {...args} defaultExpanded>
            <AccordionSummary>Accordion summary</AccordionSummary>
            <AccordionDetails>
              <Typography variant='body2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et mauris
                urna. Mauris non feugiat arcu, a varius justo. Vivamus placerat ante
                purus, a luctus magna convallis pretium. In a laoreet mi, sit amet rutrum
                neque.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </BoxContent>
      </Grid>
      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Disabled'}</TitleContent>
          <Accordion {...args} disabled>
            <AccordionSummary>Accordion summary</AccordionSummary>
            <AccordionDetails>
              <Typography variant='body2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et mauris
                urna. Mauris non feugiat arcu, a varius justo. Vivamus placerat ante
                purus, a luctus magna convallis pretium. In a laoreet mi, sit amet rutrum
                neque.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </BoxContent>
      </Grid>
    </Grid>
  );
};

const BehaviorTemplate = ({ variant, ...args }) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <TitleContent variant='subtitle1'>
          {'With a Divider component at bottom'}
        </TitleContent>
        <BoxContent>
          <TitleContent variant='body2'>{'Single'}</TitleContent>
          <div>
            <Accordion {...args}>
              <AccordionSummary>Accordion summary</AccordionSummary>
              <AccordionDetails>
                <Typography variant='body2'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
                  mauris urna. Mauris non feugiat arcu, a varius justo. Vivamus placerat
                  ante purus, a luctus magna convallis pretium. In a laoreet mi, sit amet
                  rutrum neque.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Divider />
          </div>
        </BoxContent>
      </Grid>
      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Group Standard'}</TitleContent>
          <div>
            <AccordionGroup {...args} items={items} />
            <Divider />
          </div>
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

export const States = StatesTemplate.bind({});

export const Behavior = BehaviorTemplate.bind({});
