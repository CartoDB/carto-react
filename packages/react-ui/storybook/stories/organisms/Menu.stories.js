import React from 'react';
import { Divider, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import {
  CloudOutlined,
  ContentCopyOutlined,
  ContentCutOutlined,
  ContentPasteOutlined
} from '@mui/icons-material';
import Typography from '../../../src/components/atoms/Typography';

const options = {
  title: 'Organisms/Menu',
  component: MenuList,
  argTypes: {
    label: {
      control: {
        type: 'text'
      }
    },
    dense: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A29229&t=0T8NJiytWngAdJeO-0'
    },
    status: {
      type: 'needsUpdate'
    }
  }
};
export default options;

const Template = ({ label, ...args }) => {
  return (
    <MenuList {...args}>
      <MenuItem>
        <ListItemIcon>
          <ContentCutOutlined />
        </ListItemIcon>
        <ListItemText>{label}</ListItemText>
        <Typography variant='body2' color='text.secondary'>
          ⌘X
        </Typography>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <ContentCopyOutlined />
        </ListItemIcon>
        <ListItemText>{label}</ListItemText>
        <Typography variant='body2' color='text.secondary'>
          ⌘C
        </Typography>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <ContentPasteOutlined />
        </ListItemIcon>
        <ListItemText>{label}</ListItemText>
        <Typography variant='body2' color='text.secondary'>
          ⌘V
        </Typography>
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <CloudOutlined />
        </ListItemIcon>
        <ListItemText>{label}</ListItemText>
      </MenuItem>
    </MenuList>
  );
};

const commonArgs = { label: 'Label', dense: false };

export const Playground = Template.bind({});
Playground.args = { ...commonArgs };
