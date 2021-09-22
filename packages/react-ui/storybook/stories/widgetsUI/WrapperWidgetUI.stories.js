import React from 'react';
import { Typography } from '@material-ui/core';
import ColorizeIcon from '@material-ui/icons/Colorize';
import MenuIcon from '@material-ui/icons/Menu';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import WrapperWidgetUI from '.../../../src/widgets/WrapperWidgetUI';

const options = {
  title: 'Widgets UI/WrapperWidgetUI',
  component: WrapperWidgetUI,
  argTypes: {
    actions: {
      table: { disable: true }
    },
    options: {
      table: { disable: true }
    },
    children: {
      table: { disable: true }
    }
  }
};
export default options;

const Template = (args) => (
  <WrapperWidgetUI {...args}>
    <Typography>Your Content</Typography>
  </WrapperWidgetUI>
);

export const Default = Template.bind({});
const DefaultProps = { title: 'Default wrapper' };
Default.args = DefaultProps;

export const OnlyTitle = Template.bind({});
OnlyTitle.args = DefaultProps;

export const Expandable = Template.bind({});
const ExpandableProps = { title: 'Expandable', expandable: true };
Expandable.args = ExpandableProps;

export const NotExpandable = Template.bind({});
const NotExpandableProps = { title: 'Not Expandable', expandable: false };
NotExpandable.args = NotExpandableProps;

export const Loading = Template.bind({});
const LoadingProps = { title: 'Loading', loading: true };
Loading.args = LoadingProps;

export const WithActions = Template.bind({});
WithActions.args = {
  title: 'Wrapper with actions',
  actions: [
    {
      id: 'a1',
      name: 'Autostyle',
      icon: <ColorizeIcon />,
      action: () => alert('Action!')
    }
  ]
};
WithActions.parameters = {
  docs: {
    source: {
      code: `<WrapperWidgetUI
  title='Wrapper with actions'
  actions={[
    {
      id: 'a1',
      name: 'Autostyle',
      icon: <ColorizeIcon />,
      action: () => alert('Action!')
    }
  ]}
>
  <Typography>Your Content</Typography>
</WrapperWidgetUI>`
    }
  }
};

export const WithOptions = Template.bind({});
WithOptions.args = {
  title: 'Wrapper with options',
  options: [
    { id: 'o1', name: 'Option 1', action: () => alert('Option 1!') },
    { id: 'o2', name: 'Option 2 too long', action: () => alert('Option 2!') },
    { id: 'o3', name: 'Option 2', action: () => alert('Option 2!') },
    { id: 'o4', name: 'Option 2 too long here', action: () => alert('Option 2!') },
    { id: 'o5', name: 'Option 2', action: () => alert('Option 2!') },
    { id: 'o6', name: 'Option 2', action: () => alert('Option 2!') },
    { id: 'o7', name: 'Option 2', action: () => alert('Option 2!') },
    { id: 'o8', name: 'Option 2', action: () => alert('Option 2!') },
    { id: 'o9', name: 'Option 2', action: () => alert('Option 2!') }
  ]
};
WithOptions.parameters = {
  docs: {
    source: {
      code: `<WrapperWidgetUI
  title='Wrapper with options'
  options={[
    { id: 'o1', name: 'Option 1', action: () => alert('Option 1!') },
    { id: 'o2', name: 'Option 2 too long', action: () => alert('Option 2!') },
    { id: 'o3', name: 'Option 2', action: () => alert('Option 2!') },
    { id: 'o4', name: 'Option 2 too long here', action: () => alert('Option 2!') },
    { id: 'o5', name: 'Option 2', action: () => alert('Option 2!') },
    { id: 'o6', name: 'Option 2', action: () => alert('Option 2!') },
    { id: 'o7', name: 'Option 2', action: () => alert('Option 2!') },
    { id: 'o8', name: 'Option 2', action: () => alert('Option 2!') },
    { id: 'o9', name: 'Option 2', action: () => alert('Option 2!') }
  ]}
>
  <Typography>Your Content</Typography>
</WrapperWidgetUI>`
    }
  }
};

export const WithActionsAndOptions = Template.bind({});
WithActionsAndOptions.args = {
  title: 'Wrapper with actions and options',
  actions: [
    {
      id: 'a1',
      name: 'Autostyle',
      icon: <ColorizeIcon />,
      action: () => alert('Action!')
    }
  ],
  options: [
    { id: 'o1', name: 'Option 1', action: () => alert('Option 1!') },
    { id: 'o2', name: 'Option 2', action: () => alert('Option 2!') }
  ]
};
WithActionsAndOptions.parameters = {
  docs: {
    source: {
      code: `<WrapperWidgetUI
  title='Wrapper with actions and options'
  actions={[
    {
      id: 'a1',
      name: 'Autostyle',
      icon: <ColorizeIcon />,
      action: () => alert('Action!')
    }
  ]}
  options={[
    { id: 'o1', name: 'Option 1', action: () => alert('Option 1!') },
    { id: 'o2', name: 'Option 2', action: () => alert('Option 2!') }
  ]}
>
  <Typography>Your Content</Typography>
</WrapperWidgetUI>`
    }
  }
};

export const WithOptionsAndCustomIcon = Template.bind({});
WithOptionsAndCustomIcon.args = {
  title: 'Wrapper with options and custom icon',
  options: [
    { id: 'o1', name: 'Option 1', action: () => alert('Option 1!') },
    { id: 'o2', name: 'Option 2', action: () => alert('Option 2!') }
  ],
  optionsIcon: <MenuIcon />
};
WithOptionsAndCustomIcon.parameters = {
  docs: {
    source: {
      code: `<WrapperWidgetUI
  title='Wrapper with options and custom icon'
  options={[
    { id: 'o1', name: 'Option 1', action: () => alert('Option 1!') },
    { id: 'o2', name: 'Option 2', action: () => alert('Option 2!') }
  ]}
  optionsIcon={<MenuIcon />}
>
  <Typography>Your Content</Typography>
</WrapperWidgetUI>`
    }
  }
};

export const WithActionsTooltip = Template.bind({});
WithActionsTooltip.args = {
  title: 'Wrapper with actions tooltip',
  actions: [
    {
      id: 'a1',
      name: 'Autostyle',
      icon: <ColorizeIcon />,
      action: () => alert('Action!'),
      tooltip: {
        text: 'Tooltip default'
      }
    },
    {
      id: 'a2',
      name: 'Autostyle',
      icon: <AddLocationIcon />,
      action: () => alert('Action!'),
      tooltip: {
        text: 'Tooltip on bottom',
        placement: 'bottom'
      }
    }
  ]
};
WithActionsTooltip.parameters = {
  docs: {
    source: {
      code: `<WrapperWidgetUI
  title='Wrapper with actions tooltip'
  actions={[
    {
      id: 'a1',
      name: 'Autostyle',
      icon: <ColorizeIcon />,
      action: () => alert('Action!'),
      tooltip: {
        text: 'Tooltip default'
      }
    },
    {
      id: 'a2',
      name: 'Autostyle',
      icon: <AddLocationIcon />,
      action: () => alert('Action!'),
      tooltip: {
        text: 'Tooltip on bottom',
        placement: 'bottom'
      }
    }
  ]}
>
  <Typography>Your Content</Typography>
</WrapperWidgetUI>`
    }
  }
};
