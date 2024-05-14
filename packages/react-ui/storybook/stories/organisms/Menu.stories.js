import React, { useState } from 'react';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Menu,
  Box,
  Grid,
  Divider,
  Chip
} from '@mui/material';
import {
  CloudOutlined,
  ContentCopyOutlined,
  ContentCutOutlined,
  ContentPasteOutlined,
  DeleteOutline
} from '@mui/icons-material';
import Typography from '../../../src/components/atoms/Typography';
import { Container, DocContainer, DocHighlight, Label } from '../../utils/storyStyles';
import Button from '../../../src/components/atoms/Button';
import Avatar from '../../../src/components/molecules/Avatar';

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
    },
    selected: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    destructive: {
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
      type: 'readyToReview'
    }
  }
};
export default options;

const TemplateMenuItemSize = ({ label, selected, ...args }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Dense'}</Label>
          <MenuItem dense selected={selected}>
            <ListItemIcon>
              <ContentCutOutlined />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Default'}</Label>
          <MenuItem selected={selected}>
            <ListItemIcon>
              <ContentCutOutlined />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Extended'}</Label>
          <MenuItem extended selected={selected}>
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
      </Grid>
    </Grid>
  );
};

const TemplateMenuItemStates = ({ label, ...args }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Default'}</Label>
          <MenuItem>
            <ListItemIcon>
              <ContentCutOutlined />
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
          <MenuItem selected>
            <ListItemIcon>
              <ContentCutOutlined />
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
          <Label variant='body2'>{'Disabled'}</Label>
          <MenuItem disabled>
            <ListItemIcon>
              <ContentCutOutlined />
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
    </Grid>
  );
};

const TemplateMenuItemContent = ({ label, selected, ...args }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only text'}</Label>
          <MenuItem dense selected={selected}>
            {label}
          </MenuItem>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Prefix'}</Label>
          <MenuItem selected={selected}>
            <ListItemIcon>
              <ContentCutOutlined />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
          <MenuItem selected={selected}>
            <ListItemIcon>
              <Chip size='small' label='B' />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
          <MenuItem extended selected={selected}>
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
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Suffix'}</Label>
          <MenuItem selected={selected}>
            <ListItemText>{label}</ListItemText>
            <Chip size='small' label='type' />
          </MenuItem>
          <MenuItem selected={selected}>
            <ListItemIcon>
              <ContentCutOutlined />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
            <Chip size='small' label='type' />
          </MenuItem>
          <MenuItem selected={selected}>
            <ListItemIcon>
              <Chip size='small' label='B' />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
            <Chip size='small' label='type' />
          </MenuItem>
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
          <MenuItem destructive>
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
          <MenuItem destructive selected>
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
          <MenuItem destructive disabled>
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

const TemplateMenu = ({ label, ...args }) => {
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
        id='menu'
        MenuListProps={{ 'aria-labelledby': 'menu-button' }}
      >
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
      </Menu>
    </Box>
  );
};

const DocTemplate = () => {
  return (
    <DocContainer
      severity='warning'
      content='block'
      action={
        <Button
          variant='outlined'
          size='small'
          color='inherit'
          href='/?path=/docs/organisms-list-guide--page'
        >
          Guide
        </Button>
      }
    >
      In order <DocHighlight component='span'>ListItem</DocHighlight> to be interactive,
      you need to use <DocHighlight component='span'>MenuItem</DocHighlight> component, or
      use <DocHighlight component='span'>ListItemButton</DocHighlight> instead.
      <Typography mt={2}>Note that {'<ListItem button />'} is deprecated.</Typography>
    </DocContainer>
  );
};

const commonArgs = { label: 'Label' };

export const Guide = DocTemplate.bind({});

export const Size = TemplateMenuItemSize.bind({});
Size.args = { ...commonArgs };

export const States = TemplateMenuItemStates.bind({});
States.args = { ...commonArgs };

export const Content = TemplateMenuItemContent.bind({});
Content.args = { ...commonArgs };

export const Destructive = TemplateMenuItemDestructive.bind({});
Destructive.args = { ...commonArgs };

export const MenuWrapper = TemplateMenu.bind({});
MenuWrapper.args = { ...commonArgs };
