import React from 'react';
import { Box, Divider, Grid } from '@mui/material';

const options = {
  title: 'Atoms/Divider',
  component: Divider,
  argTypes: {
    light: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A28897'
    },
    status: {
      type: 'readyToReview'
    }
  }
};
export default options;

const Template = ({ light, ...args }) => {
  return (
    <Box
      style={{
        width: '100%',
        maxWidth: '400px',
        padding: '48px',
        backgroundColor: `${light && '#2C3032'}`
      }}
    >
      <Divider {...args} light={light} />
    </Box>
  );
};

const HorizontalTemplate = ({ ...args }) => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Box style={{ width: '100%', maxWidth: '400px', padding: '48px' }}>
          <Divider {...args} />
        </Box>
      </Grid>

      <Grid item>
        <Box
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '48px',
            backgroundColor: '#2C3032'
          }}
        >
          <Divider {...args} light />
        </Box>
      </Grid>
    </Grid>
  );
};

const VerticalTemplate = ({ ...args }) => {
  return (
    <Grid container>
      <Grid
        item
        xs={2}
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '240px',
          width: '200px',
          padding: '48px'
        }}
      >
        <Divider {...args} orientation='vertical' flexItem />
      </Grid>

      <Grid
        item
        xs={2}
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '240px',
          width: '200px',
          padding: '48px',
          backgroundColor: '#2C3032'
        }}
      >
        <Divider {...args} orientation='vertical' flexItem light />
      </Grid>
    </Grid>
  );
};

export const Playground = Template.bind({});

export const Horizontal = HorizontalTemplate.bind({});

export const Vertical = VerticalTemplate.bind({});
