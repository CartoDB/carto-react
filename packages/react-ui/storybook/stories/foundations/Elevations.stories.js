import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Typography from '../../../src/components/atoms/Typography';
import { DocContainer, DocHighlight, FilledContainer } from '../../utils/storyStyles';

const options = {
  title: 'Foundations/Elevations',
  argTypes: {
    size: {
      defaultValue: 2,
      description:
        'Use `theme.shadows[number]`in styles, or `<Cmp elevation={number} />`',
      control: {
        type: 'select',
        options: [0, 1, 2, 4, 6, 8, 16, 24]
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lVrTKiHj5zFUmCjjHF6Rc4/CARTO-Foundations?node-id=8990%3A7615'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const ShadowBox = ({ size }) => {
  const theme = useTheme();
  const sizeVariant = theme.shadows[size];

  return (
    <Grid item xs={4} sm={3} md={2}>
      <Box>
        <Typography variant='subtitle1'>{`Elevation ${size}`}</Typography>
        <Typography
          component='p'
          variant='caption'
          mb={0.5}
        >{`shadows[${size}]`}</Typography>
      </Box>
      <FilledContainer
        style={{
          boxShadow: sizeVariant
        }}
      />
    </Grid>
  );
};

const Template = () => {
  return (
    <Grid container>
      <ShadowBox size={0} />
      <ShadowBox size={1} />
      <ShadowBox size={2} />
      <ShadowBox size={4} />
      <ShadowBox size={6} />
      <ShadowBox size={8} />
      <ShadowBox size={16} />
      <ShadowBox size={24} />
    </Grid>
  );
};

const DocTemplate = () => {
  return (
    <DocContainer severity='warning'>
      Use is restringed to a few specific values, defined in the design system, which are:
      <DocHighlight component='span'>0, 1, 2, 4, 6, 8, 16, 24</DocHighlight>.
    </DocContainer>
  );
};

export const Playground = ShadowBox.bind({});

export const Guide = DocTemplate.bind({});

export const Elevations = Template.bind({});
