import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Typography from '../../../src/components/atoms/Typography';
import { DocContainer, DocHighlight, FilledContainer } from '../../utils/storyStyles';

const options = {
  title: 'Foundations/Borders',
  argTypes: {
    size: {
      defaultValue: 1,
      description: 'Use `theme.spacing(number)` function',
      control: {
        type: 'select',
        options: [0.5, 1, 1.5, 2]
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lVrTKiHj5zFUmCjjHF6Rc4/CARTO-Foundations?node-id=9787%3A4001'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const BorderBox = ({ size }) => {
  const theme = useTheme();
  const sizeVariant = theme.spacing(size);

  return (
    <Grid item xs={6} sm={3}>
      <Box>
        <Typography variant='subtitle1'>{`Border Radius ${size}`}</Typography>
        <Typography component='p' variant='caption' mb={0.5}>
          {sizeVariant}
        </Typography>
      </Box>
      <FilledContainer
        style={{
          borderRadius: sizeVariant
        }}
      />
    </Grid>
  );
};

const Template = () => {
  return (
    <Grid container>
      <BorderBox size={0.5} />
      <BorderBox size={1} />
      <BorderBox size={1.5} />
      <BorderBox size={2} />
    </Grid>
  );
};

const DocTemplate = () => {
  return (
    <DocContainer severity='warning'>
      Use is restringed to a few specific values, defined in the design system, which are:{' '}
      <DocHighlight component='span'>0.5, 1, 1.5, 2</DocHighlight>
    </DocContainer>
  );
};

export const Playground = BorderBox.bind({});

export const Guide = DocTemplate.bind({});

export const BorderRadius = Template.bind({});
