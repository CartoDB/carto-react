import React from 'react';
import { Typography } from '@mui/material';
import ColorizeIcon from '@mui/icons-material/Colorize';
import MenuIcon from '@mui/icons-material/Menu';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WrapperWidgetUI from '.../../../src/widgets/WrapperWidgetUI';
import { buildReactPropsAsString } from '../../utils';

const options = {
  title: 'Custom Components/WrapperWidgetUI',
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
  },
  parameters: {
    docs: {
      source: {
        type: 'auto'
      }
    }
  }
};
export default options;

const Template = (args) => (
  <WrapperWidgetUI {...args}>
    <div>Your Content</div>
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

export const NotExpanded = Template.bind({});
const NotExpandedProps = { title: 'Not expanded/collapsed', expanded: false };
NotExpanded.args = NotExpandedProps;

export const NotExpandable = Template.bind({});
const NotExpandableProps = { title: 'Not Expandable', expandable: false };
NotExpandable.args = NotExpandableProps;

export const Loading = Template.bind({});
const LoadingProps = { title: 'Loading', loading: true };
Loading.args = LoadingProps;

export const Disabled = Template.bind({});
const DisabledProps = { title: 'Disabled', disabled: true };
Disabled.args = DisabledProps;

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
/>`
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
/>`
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
/>`
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
/>`
    }
  }
};

export const WithCustomMargins = Template.bind({});
WithCustomMargins.args = {
  title: 'Wrapper custom margins',
  margin: 100
};
WithCustomMargins.parameters = {
  docs: {
    source: {
      code: `<WrapperWidgetUI
  title='Wrapper custom margins'
  margin={100}
/>`
    }
  }
};

export const WithActionsTooltip = Template.bind({});
WithActionsTooltip.args = {
  title:
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
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
/>`
    }
  }
};
