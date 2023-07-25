import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Typography from '../../../src/components/atoms/Typography';
import Button from '../../../src/components/atoms/Button';
import { DocContainer, DocTextHighlight, FilledContainer } from '../../utils/storyStyles';

const options = {
  title: 'Foundations/Spacing',
  argTypes: {
    size: {
      defaultValue: 15,
      description: 'Use `theme.spacing(number)` function',
      control: {
        type: 'select',
        options: [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 12, 15]
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lVrTKiHj5zFUmCjjHF6Rc4/CARTO-Foundations?node-id=8776%3A64661'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const SpacingBox = ({ size }) => {
  const theme = useTheme();
  const sizeVariant = theme.spacing(size);

  return (
    <Grid item xs={4} sm={3} md={2}>
      <Box>
        <Typography variant='subtitle1'>{`Spacing ${size}`}</Typography>
        <Typography component='p' variant='caption' mb={0.5}>
          {sizeVariant}
        </Typography>
      </Box>
      <FilledContainer
        style={{
          width: sizeVariant,
          height: sizeVariant
        }}
      />
    </Grid>
  );
};

const Template = () => {
  return (
    <Grid container>
      <SpacingBox size={0.5} />
      <SpacingBox size={1} />
      <SpacingBox size={1.5} />
      <SpacingBox size={2} />
      <SpacingBox size={2.5} />
      <SpacingBox size={3} />
      <SpacingBox size={4} />
      <SpacingBox size={5} />
      <SpacingBox size={6} />
      <SpacingBox size={7} />
      <SpacingBox size={8} />
      <SpacingBox size={9} />
      <SpacingBox size={12} />
      <SpacingBox size={15} />
    </Grid>
  );
};

const DocTemplate = () => {
  return (
    <DocContainer
      severity='warning'
      action={
        <Button
          variant='outlined'
          size='small'
          color='inherit'
          href='/?path=/docs/foundations-spacing-guide--page'
        >
          Guide
        </Button>
      }
    >
      Check the usage guide before using{' '}
      <DocTextHighlight variant='inherit' component='span'>
        spacing
      </DocTextHighlight>{' '}
      values, specially{' '}
      <DocTextHighlight variant='inherit' component='span'>
        theme.spacing
      </DocTextHighlight>{' '}
      function.
    </DocContainer>
  );
};

export const Playground = SpacingBox.bind({});

export const Guide = DocTemplate.bind({});

export const Spacings = Template.bind({});
