import React from 'react';
import DialogTitle from '../../../src/components/molecules/DialogTitle';
import Alert from '../../../src/components/molecules/Alert';
import OpenDiagonallyRightIcon from '../../../src/assets/icons/OpenDiagonallyRightIcon';
import { IconButton } from '@mui/material';

const options = {
  title: 'Molecules/DialogTitle',
  component: DialogTitle,
  argTypes: {
    title: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/C4R-Components?node-id=1534%3A28896'
    },
    status: {
      type: 'readyToReview'
    }
  }
};
export default options;

const PlaygroundTemplate = (args) => {
  return <DialogTitle {...args} />;
};

const commonArgs = {
  title: 'Dialog title extra large that might trigger overflow ellipsis at some point'
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = { ...commonArgs };

export const CloseButton = PlaygroundTemplate.bind({});
CloseButton.args = { ...commonArgs, onClose: () => void 0 };

export const SecondaryButtons = PlaygroundTemplate.bind({});
SecondaryButtons.args = {
  ...commonArgs,
  onClose: () => void 0,
  secondaryButons: (
    <IconButton>
      <OpenDiagonallyRightIcon />
    </IconButton>
  )
};

export const WithChip = PlaygroundTemplate.bind({});
WithChip.args = {
  ...commonArgs,
  chipLabel: 'Chip label extra large that might trigger overflow ellipsis at some point'
};

export const CustomChildren = PlaygroundTemplate.bind({});
CustomChildren.args = {
  ...commonArgs,
  children: (
    <Alert severity='info' size='small'>
      Alert text in Dialog Header
    </Alert>
  )
};
