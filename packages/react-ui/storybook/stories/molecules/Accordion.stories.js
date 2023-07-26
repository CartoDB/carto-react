import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid
} from '@mui/material';
import { Typography } from '@carto/react-ui';
import {
  BoxContent,
  DocContainer,
  DocHighlight,
  TitleContent
} from '../../utils/storyStyles';
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
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/C4R-Components?node-id=6361-152749&t=EVLxqsSCMSm0Lvtv-0'
    },
    status: {
      type: 'validated'
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
    ),
    disabled: true
  }
];

const Template = ({ defaultExpanded, ...args }) => {
  return (
    <Accordion {...args} defaultExpanded={defaultExpanded}>
      <AccordionSummary>Accordion summary</AccordionSummary>
      <AccordionDetails>
        <Typography variant='body2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et mauris urna.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const SingleTemplate = ({ defaultExpanded, ...args }) => {
  return (
    <Accordion {...args} defaultExpanded={defaultExpanded}>
      <AccordionSummary>Accordion summary</AccordionSummary>
      <AccordionDetails>
        <Typography variant='body2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et mauris urna.
          Mauris non feugiat arcu, a varius justo.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const GroupTemplate = ({ defaultExpanded, ...args }) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <DocContainer severity='warning'>
          Component used as a container of a group of `Mui Accordions`, that also adds a{' '}
          <DocHighlight component='span'>variant</DocHighlight> prop to have different
          styles in the group: <i>Standard (default)</i> and <i>Outlined</i>.
          <Typography mt={2}>
            Use <i>AccordionGroup</i> from:{' '}
            <DocHighlight component='span'>
              react-ui/src/components/molecules/AccordionGroup
            </DocHighlight>
          </Typography>
          <Typography mt={2}>
            For external use:{' '}
            <DocHighlight component='span'>
              {'import { AccordionGroup } from "@carto/react-ui";'}
            </DocHighlight>
            .
          </Typography>
        </DocContainer>

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

const StatesTemplate = ({ defaultExpanded, ...args }) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Closed (default)'}</TitleContent>
          <Accordion {...args}>
            <AccordionSummary>Accordion summary</AccordionSummary>
            <AccordionDetails>
              <Typography variant='body2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
                urna. Vivamus placerat ante purus, a luctus magna convallis pretium.
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
                Mauris non feugiat arcu, a varius justo. Vivamus placerat ante purus, a
                luctus magna convallis pretium. In a laoreet mi, sit amet rutrum neque.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </BoxContent>
      </Grid>
    </Grid>
  );
};

const BehaviorTemplate = ({ defaultExpanded, ...args }) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <TitleContent variant='subtitle1'>
          {'With a Divider component at bottom'}
        </TitleContent>
        <BoxContent>
          <TitleContent variant='body2'>{'Single'}</TitleContent>
          <Box>
            <Accordion {...args}>
              <AccordionSummary>Accordion summary</AccordionSummary>
              <AccordionDetails>
                <Typography variant='body2'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
                  mauris urna. Mauris non feugiat arcu, a varius justo.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Divider />
          </Box>
        </BoxContent>
      </Grid>
      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Group Standard'}</TitleContent>
          <Box>
            <AccordionGroup {...args} items={items} />
            <Divider />
          </Box>
        </BoxContent>
      </Grid>
    </Grid>
  );
};
const disabledArgType = {
  disabled: { table: { disable: true } }
};
export const Playground = Template.bind({});

export const Single = SingleTemplate.bind({});

export const Group = GroupTemplate.bind({});
Group.argTypes = disabledArgType;

export const States = StatesTemplate.bind({});
States.argTypes = disabledArgType;

export const Behavior = BehaviorTemplate.bind({});
Behavior.argTypes = disabledArgType;
