import React from 'react';
import { Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
import {
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatUnderlined
} from '@mui/icons-material';

const options = {
  title: 'Common/Divider',
  component: Divider,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A28897'
    }
  }
};
export default options;

const Template = ({ ...args }) => {
  return (
    <List component='nav' aria-label='mailbox folders'>
      <ListItem button>
        <ListItemText primary='Inbox' />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary='Drafts' />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary='Settings' />
      </ListItem>
      <Divider />
    </List>
  );
};

const VerticalDividerTemplate = ({ ...args }) => {
  return (
    <Grid container alignItems='center'>
      <FormatAlignLeft />
      <FormatAlignCenter />
      <FormatAlignRight />
      <Divider orientation='vertical' flexItem />
      <FormatBold />
      <FormatItalic />
      <FormatUnderlined />
    </Grid>
  );
};

export const Playground = Template.bind({});

export const ListWithDivider = Template.bind({});

export const VerticalDivider = VerticalDividerTemplate.bind({});
VerticalDivider.args = {};
