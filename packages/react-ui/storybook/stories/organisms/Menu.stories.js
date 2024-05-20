import React, { useState } from 'react';
import {
  ListItemIcon,
  ListItemText,
  MenuList,
  Box,
  Grid,
  Divider,
  Chip
} from '@mui/material';
import {
  ContentCopyOutlined,
  DeleteOutline,
  EditOutlined,
  HistoryOutlined,
  RefreshOutlined
} from '@mui/icons-material';
import {
  Container,
  DocContainer,
  DocHighlight,
  DocLink,
  Label
} from '../../utils/storyStyles';
import Typography from '../../../src/components/atoms/Typography';
import Button from '../../../src/components/atoms/Button';
import Avatar from '../../../src/components/molecules/Avatar';
import Menu from '../../../src/components/molecules/Menu';
import MenuItem from '../../../src/components/molecules/MenuItem';

const options = {
  title: 'Organisms/Menu',
  component: MenuList,
  argTypes: {
    dense: {
      description: 'Menu / MenuItem prop',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    extended: {
      description: 'Menu prop',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    width: {
      description: 'Menu prop',
      defaultValue: false,
      control: {
        type: 'text'
      }
    },
    height: {
      description: 'Menu prop',
      defaultValue: false,
      control: {
        type: 'text'
      }
    },
    selected: {
      description: 'MenuItem prop',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    destructive: {
      description: 'MenuItem prop',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    subtitle: {
      description: 'MenuItem prop',
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
      type: 'readyToReview'
    }
  }
};
export default options;

const TemplateMenuItemStates = ({ label, ...args }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Default'}</Label>
          <MenuItem {...args}>
            <ListItemIcon>
              <EditOutlined />
            </ListItemIcon>
            <ListItemText>
              {label}
              <Typography component='p' variant='caption' color='text.secondary'>
                Secondary text
              </Typography>
            </ListItemText>
          </MenuItem>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Selected'}</Label>
          <Container pr={3}>
            <MenuItem {...args} selected>
              <ListItemIcon>
                <EditOutlined />
              </ListItemIcon>
              <ListItemText>
                {label}
                <Typography component='p' variant='caption' color='text.secondary'>
                  Secondary text
                </Typography>
              </ListItemText>
            </MenuItem>
          </Container>
          <Container>
            <MenuItem {...args} selected>
              <ListItemIcon>
                <ContentCopyOutlined />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
              <Chip size='small' label='type' color='primary' variant='outlined' />
            </MenuItem>
          </Container>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Disabled'}</Label>
          <Container pr={3}>
            <MenuItem {...args} disabled>
              <ListItemIcon>
                <EditOutlined />
              </ListItemIcon>
              <ListItemText>
                {label}
                <Typography component='p' variant='caption' color='text.secondary'>
                  Secondary text
                </Typography>
              </ListItemText>
            </MenuItem>
          </Container>
          <Container>
            <MenuItem {...args} extended disabled>
              <ListItemIcon>
                <Avatar>M</Avatar>
              </ListItemIcon>
              <ListItemText>
                {label}
                <Typography component='p' variant='caption' color='text.secondary'>
                  Secondary text
                </Typography>
              </ListItemText>
            </MenuItem>
          </Container>
        </Container>
      </Grid>
    </Grid>
  );
};

const TemplateMenuItemContent = ({ label, selected, ...args }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only text'}</Label>
          <MenuItem {...args} selected={selected}>
            {label}
          </MenuItem>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Prefix'}</Label>
          <Container pr={3}>
            <MenuItem {...args}>
              <ListItemIcon>
                <ContentCopyOutlined />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </MenuItem>
          </Container>
          <Container pr={3}>
            <MenuItem {...args}>
              <ListItemIcon>
                <Chip size='small' label='B' />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </MenuItem>
          </Container>
          <Container>
            <MenuItem {...args} extended>
              <ListItemIcon>
                <Avatar>M</Avatar>
              </ListItemIcon>
              <ListItemText>
                {label}
                <Typography component='p' variant='caption' color='text.secondary'>
                  Secondary text
                </Typography>
              </ListItemText>
            </MenuItem>
          </Container>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Suffix'}</Label>
          <Container pr={3}>
            <MenuItem {...args} selected={selected}>
              <ListItemText>{label}</ListItemText>
              <Chip size='small' label='type' color='default' variant='outlined' />
            </MenuItem>
          </Container>
          <Container pr={3}>
            <MenuItem {...args}>
              <ListItemIcon>
                <ContentCopyOutlined />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
              <Chip size='small' label='type' color='default' variant='outlined' />
            </MenuItem>
          </Container>
          <Container>
            <MenuItem {...args}>
              <ListItemIcon>
                <Chip size='small' label='B' />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
              <Chip size='small' label='type' color='default' variant='outlined' />
            </MenuItem>
          </Container>
        </Container>
      </Grid>
    </Grid>
  );
};

const TemplateMenuItemDestructive = ({ label, destructive, ...args }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Default'}</Label>
          <MenuItem {...args} destructive>
            <ListItemIcon>
              <DeleteOutline />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Selected'}</Label>
          <MenuItem {...args} destructive selected>
            <ListItemIcon>
              <DeleteOutline />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Disabled'}</Label>
          <MenuItem {...args} destructive disabled>
            <ListItemIcon>
              <DeleteOutline />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        </Container>
      </Grid>
    </Grid>
  );
};

const TemplateMenu = ({ label, subtitle, dense, ...args }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const openDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdown = () => {
    setAnchorEl(null);
  };

  return (
    <Box pb={12}>
      <Button
        variant='outlined'
        id='menu-button'
        aria-controls='menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={openDropdown}
        isOpen={open}
      >
        Open menu
      </Button>
      <Menu
        {...args}
        anchorEl={anchorEl}
        open={open}
        onClose={closeDropdown}
        dense={dense}
        id='menu'
        MenuListProps={{ 'aria-labelledby': 'menu-button' }}
      >
        {subtitle && <MenuItem subtitle>{'Subtitle'}</MenuItem>}
        <MenuItem dense={dense}>
          <ListItemIcon>
            <EditOutlined />
          </ListItemIcon>
          <ListItemText>{label}</ListItemText>
          <Chip size='small' label='type' color='default' variant='outlined' />
        </MenuItem>
        <MenuItem dense={dense}>
          <ListItemIcon>
            <ContentCopyOutlined />
          </ListItemIcon>
          <ListItemText>{label}</ListItemText>
        </MenuItem>
        {subtitle && <MenuItem subtitle>{'Subtitle'}</MenuItem>}
        <MenuItem dense={dense}>
          <ListItemIcon>
            <HistoryOutlined />
          </ListItemIcon>
          <ListItemText>{label}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem dense={dense}>
          <ListItemIcon>
            <RefreshOutlined />
          </ListItemIcon>
          <ListItemText>{label}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

const DocTemplate = () => {
  return (
    <DocContainer severity='warning' content='block'>
      We have our own
      <DocLink href='https://github.com/CartoDB/carto-react/blob/master/packages/react-ui/src/components/molecules/Menu.js'>
        Menu
      </DocLink>{' '}
      and{' '}
      <DocLink href='https://github.com/CartoDB/carto-react/blob/master/packages/react-ui/src/components/molecules/MenuItem.js'>
        MenuItem
      </DocLink>
      components that extends <i>Mui components</i> with some props (variant and
      backgroundColor support).
      <Typography mt={2}>
        So, instead of Mui Menu, you should use this one:
        <DocHighlight component='span'>
          react-ui/src/components/molecules/Menu
        </DocHighlight>
      </Typography>
      <Typography mt={2}>
        For external use:
        <DocHighlight component='span'>
          {'import { Menu, MenuItem } from "@carto/react-ui";'}
        </DocHighlight>
        .
      </Typography>
      <Typography mt={2}>
        Note: In order <DocHighlight component='span'>ListItem</DocHighlight> to be
        interactive, you need to use{' '}
        <DocHighlight component='span'>MenuItem</DocHighlight> component, or use{' '}
        <DocHighlight component='span'>ListItemButton</DocHighlight> instead (
        {'<ListItem button />'} is deprecated.)
      </Typography>
    </DocContainer>
  );
};

const commonArgs = { label: 'Label' };

export const Playground = TemplateMenu.bind({});
Playground.args = { ...commonArgs };

export const Guide = DocTemplate.bind({});

export const Dense = TemplateMenu.bind({});
Dense.args = { ...commonArgs, dense: true };

export const Extended = TemplateMenu.bind({});
Extended.args = { ...commonArgs, extended: true };

export const States = TemplateMenuItemStates.bind({});
States.args = { ...commonArgs };

export const Content = TemplateMenuItemContent.bind({});
Content.args = { ...commonArgs };

export const Destructive = TemplateMenuItemDestructive.bind({});
Destructive.args = { ...commonArgs };

export const Subtitle = TemplateMenu.bind({});
Subtitle.args = { ...commonArgs, subtitle: true };

export const TextOverflow = TemplateMenu.bind({});
TextOverflow.args = {
  ...commonArgs,
  width: '200px',
  label: 'Long text that will be truncated'
};

export const CustomWidth = TemplateMenu.bind({});
CustomWidth.args = { ...commonArgs, width: '400px' };

export const CustomHeight = TemplateMenu.bind({});
CustomHeight.args = { ...commonArgs, height: '100px' };
