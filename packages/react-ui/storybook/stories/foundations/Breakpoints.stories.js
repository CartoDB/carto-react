import React from 'react';
import { BREAKPOINTS } from '../../../src/theme/themeConstants';
import Typography from '../../../src/components/atoms/Typography';
import { FilledContainer } from '../../utils/storyStyles';

const options = {
  title: 'Foundations/Breakpoints',
  argTypes: {
    breakpoint: {
      defaultValue: '100%',
      control: {
        type: 'select',
        options: { ...BREAKPOINTS }
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lVrTKiHj5zFUmCjjHF6Rc4/CARTO-Foundations?node-id=10472%3A3871'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const BreakpointBox = ({ breakpoint }) => {
  return (
    <FilledContainer
      style={{
        width: breakpoint
      }}
    >
      <Typography variant={'subtitle1'}>{breakpoint}</Typography>
    </FilledContainer>
  );
};

export const Breakpoints = BreakpointBox.bind({});
