import React, { useRef, useState } from 'react';
import {
  ListItemIcon,
  ListItemText,
  Box,
  Grid,
  Divider,
  Chip,
  Tooltip,
  Popper,
  ClickAwayListener,
  Paper,
  Grow
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
import MenuList from '../../../src/components/molecules/MenuList';
import MenuItem from '../../../src/components/molecules/MenuItem';

const icon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='13.504'
    height='13.5'
    viewBox='0 0 13.504 13.5'
  >
    <path
      fill='#8a2be2'
      fill-rule='evenodd'
      d='M6.078 0a6.075 6.075 0 0 1 4.92 9.637l.034.028 2.39 2.39a.283.283 0 0 1 0 .4l-.966.965a.283.283 0 0 1-.4 0l-2.39-2.39a.283.283 0 0 1-.029-.033 6.075 6.075 0 1 1-3.561-11Zm0 1.573a4.509 4.509 0 1 0 4.511 4.506 4.508 4.508 0 0 0-4.511-4.506Zm.675 2.754V9.45a5.4 5.4 0 0 1-.674 0 5.379 5.379 0 0 1-.75-.041V4.327Zm-2.4 1.633v2.95a3.314 3.314 0 0 1-1.027-.973l-.127-.2V5.96Zm4.657.695v.995a3.374 3.374 0 0 1-1.147 1.229v-2.22H9.01Z'
    />
  </svg>
);

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
      control: {
        type: 'text'
      }
    },
    height: {
      description: 'Menu prop',
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
    disabled: {
      description: 'MenuItem prop',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    subtitle: {
      description: 'MenuItem prop',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    iconColor: {
      description: 'MenuItem prop',
      defaultValue: 'primary',
      control: {
        type: 'select',
        options: ['primary', 'default']
      }
    },
    fixed: {
      description: 'MenuItem prop',
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
      type: 'validated'
    }
  }
};
export default options;

const TemplateMenuItemStates = ({ label, disabled, ...args }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Default'}</Label>
          <MenuItem {...args} disabled={disabled}>
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
            <MenuItem {...args} selected disabled={disabled}>
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
            <MenuItem {...args} selected disabled={disabled}>
              <ListItemIcon>
                <ContentCopyOutlined />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
              <Box>
                <Chip
                  size='small'
                  label='type'
                  color='primary'
                  variant='outlined'
                  disabled={disabled}
                />
              </Box>
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

const TemplateMenuItemContent = ({ label, selected, disabled, ...args }) => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Only text'}</Label>
          <MenuItem {...args} selected={selected} disabled={disabled}>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Prefix'}</Label>
          <Container pr={3}>
            <MenuItem {...args} disabled={disabled}>
              <ListItemIcon>
                <ContentCopyOutlined />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </MenuItem>
          </Container>
          <Container pr={3}>
            <MenuItem {...args} disabled={disabled}>
              <ListItemIcon>
                <Chip size='small' label='B' disabled={disabled} />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </MenuItem>
          </Container>
          <Container>
            <MenuItem {...args} extended disabled={disabled}>
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
            <MenuItem {...args} selected={selected} disabled={disabled}>
              <ListItemText>{label}</ListItemText>
              <Box>
                <Chip
                  size='small'
                  label='type'
                  color='default'
                  variant='outlined'
                  disabled={disabled}
                />
              </Box>
            </MenuItem>
          </Container>
          <Container pr={3}>
            <MenuItem {...args} disabled={disabled}>
              <ListItemIcon>
                <ContentCopyOutlined />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
              <Box>
                <Chip
                  size='small'
                  label='type'
                  color='default'
                  variant='outlined'
                  disabled={disabled}
                />
              </Box>
            </MenuItem>
          </Container>
          <Container>
            <MenuItem {...args} disabled={disabled}>
              <ListItemIcon>
                <Chip size='small' label='B' disabled={disabled} />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
              <Box>
                <Chip
                  size='small'
                  label='type'
                  color='default'
                  variant='outlined'
                  disabled={disabled}
                />
              </Box>
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

const TemplateMenuIconColor = ({ label, iconColor, ...args }) => {
  return (
    <>
      <DocContainer severity='info'>
        Default keeps the color of the icon as is, Primary changes the color of the icon
        to theme.palette.text.primary.
      </DocContainer>
      <Grid container direction='column' spacing={6}>
        <Grid item>
          <Container>
            <Label variant='body2'>{'Primary'}</Label>
            <MenuItem {...args} iconColor='primary'>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </MenuItem>
          </Container>
        </Grid>
        <Grid item>
          <Container>
            <Label variant='body2'>{'Default'}</Label>
            <MenuItem {...args} iconColor='default'>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </MenuItem>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

const TemplateMenu = ({ label, subtitle, dense, disabled, destructive, ...args }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdown = () => {
    setAnchorEl(null);
  };

  return (
    <Box py={20} mx='auto' textAlign='center'>
      <Button
        variant='outlined'
        id='menu-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={openDropdown}
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
        {subtitle && <MenuItem subtitle>{'Subtitle'}</MenuItem>}
        <MenuItem
          onClick={closeDropdown}
          dense={dense}
          disabled={disabled}
          destructive={destructive}
        >
          <ListItemIcon>
            <EditOutlined />
          </ListItemIcon>
          <ListItemText>{label}</ListItemText>
          <Box>
            <Chip
              size='small'
              label='type'
              color='default'
              variant='outlined'
              disabled={disabled}
            />
          </Box>
        </MenuItem>
        <MenuItem
          onClick={closeDropdown}
          dense={dense}
          disabled={disabled}
          destructive={destructive}
        >
          <ListItemIcon>
            <ContentCopyOutlined />
          </ListItemIcon>
          <ListItemText>{label}</ListItemText>
        </MenuItem>
        {subtitle && <MenuItem subtitle>{'Subtitle'}</MenuItem>}
        <MenuItem
          onClick={closeDropdown}
          dense={dense}
          disabled={disabled}
          destructive={destructive}
        >
          <ListItemIcon>
            <HistoryOutlined />
          </ListItemIcon>
          <ListItemText>{label}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={closeDropdown}
          dense={dense}
          disabled={disabled}
          destructive={destructive}
        >
          <ListItemIcon>
            <RefreshOutlined />
          </ListItemIcon>
          <ListItemText>{label}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

const TemplateMenuList = ({ label, subtitle, dense, disabled, destructive, ...args }) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const closeDropdown = () => {
    setOpen(null);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box py={20} mx='auto' textAlign='center'>
      <Button
        variant='outlined'
        id='menu-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleToggle}
        ref={anchorRef}
      >
        Open menu
      </Button>
      <Popper anchorEl={anchorRef.current} open={open}>
        <Grow in={open}>
          <Paper
            elevation={8}
            onKeyDown={(ev) => {
              if (ev.key === 'Escape') {
                closeDropdown();
              }
            }}
          >
            <ClickAwayListener onClickAway={closeDropdown}>
              <MenuList
                {...args}
                id='menu'
                MenuListProps={{ 'aria-labelledby': 'menu-button' }}
              >
                {subtitle && <MenuItem subtitle>{'Subtitle'}</MenuItem>}
                <MenuItem
                  onClick={closeDropdown}
                  dense={dense}
                  disabled={disabled}
                  destructive={destructive}
                >
                  <ListItemIcon>
                    <EditOutlined />
                  </ListItemIcon>
                  <ListItemText>{label}</ListItemText>
                  <Box>
                    <Chip
                      size='small'
                      label='type'
                      color='default'
                      variant='outlined'
                      disabled={disabled}
                    />
                  </Box>
                </MenuItem>
                <MenuItem
                  onClick={closeDropdown}
                  dense={dense}
                  disabled={disabled}
                  destructive={destructive}
                >
                  <ListItemIcon>
                    <ContentCopyOutlined />
                  </ListItemIcon>
                  <ListItemText>{label}</ListItemText>
                </MenuItem>
                {subtitle && <MenuItem subtitle>{'Subtitle'}</MenuItem>}
                <MenuItem
                  onClick={closeDropdown}
                  dense={dense}
                  disabled={disabled}
                  destructive={destructive}
                >
                  <ListItemIcon>
                    <HistoryOutlined />
                  </ListItemIcon>
                  <ListItemText>{label}</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={closeDropdown}
                  dense={dense}
                  disabled={disabled}
                  destructive={destructive}
                >
                  <ListItemIcon>
                    <RefreshOutlined />
                  </ListItemIcon>
                  <ListItemText>{label}</ListItemText>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      </Popper>
    </Box>
  );
};

const TemplateMenuOverflow = ({
  label,
  subtitle,
  dense,
  disabled,
  destructive,
  ...args
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdown = () => {
    setAnchorEl(null);
  };

  return (
    <Box py={20} mx='auto' textAlign='center'>
      <Button
        variant='outlined'
        id='menu-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={openDropdown}
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
        {subtitle && <MenuItem subtitle>{'Subtitle'}</MenuItem>}
        <MenuItem
          onClick={closeDropdown}
          dense={dense}
          disabled={disabled}
          destructive={destructive}
        >
          <ListItemIcon>
            <EditOutlined />
          </ListItemIcon>
          <Tooltip title={label}>
            <ListItemText>{label}</ListItemText>
          </Tooltip>
          <Box>
            <Chip
              size='small'
              label='type'
              color='default'
              variant='outlined'
              disabled={disabled}
            />
          </Box>
        </MenuItem>
        <MenuItem
          onClick={closeDropdown}
          dense={dense}
          disabled={disabled}
          destructive={destructive}
        >
          <ListItemIcon>
            <ContentCopyOutlined />
          </ListItemIcon>
          <Tooltip title={label}>
            <ListItemText>{label}</ListItemText>
          </Tooltip>
        </MenuItem>
        {subtitle && <MenuItem subtitle>{'Subtitle'}</MenuItem>}
        <MenuItem
          onClick={closeDropdown}
          dense={dense}
          disabled={disabled}
          destructive={destructive}
        >
          <ListItemIcon>
            <HistoryOutlined />
          </ListItemIcon>
          <Tooltip title={label}>
            <ListItemText>{label}</ListItemText>
          </Tooltip>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={closeDropdown}
          dense={dense}
          disabled={disabled}
          destructive={destructive}
        >
          <ListItemIcon>
            <RefreshOutlined />
          </ListItemIcon>
          <Tooltip title={label}>
            <ListItemText>{label}</ListItemText>
          </Tooltip>
        </MenuItem>
      </Menu>
    </Box>
  );
};

const TemplateMenuItemFixed = ({
  label,
  subtitle,
  dense,
  disabled,
  destructive,
  ...args
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdown = () => {
    setAnchorEl(null);
  };

  return (
    <Box py={20} mx='auto' textAlign='center'>
      <Button
        variant='outlined'
        id='menu-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={openDropdown}
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
        {subtitle && <MenuItem subtitle>{'Subtitle'}</MenuItem>}
        {[...Array(12)].map((_, i) => (
          <MenuItem
            key={i}
            onClick={closeDropdown}
            dense={dense}
            disabled={disabled}
            destructive={destructive}
            fixed={i === 0 ? true : false}
          >
            <ListItemIcon>
              <ContentCopyOutlined />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
            <Box>
              <Chip
                size='small'
                label='type'
                color='default'
                variant='outlined'
                disabled={disabled}
              />
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const TemplateMenuExtended = ({
  label,
  subtitle,
  dense,
  disabled,
  destructive,
  ...args
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdown = () => {
    setAnchorEl(null);
  };

  return (
    <Box py={20} mx='auto' textAlign='center'>
      <Button
        variant='outlined'
        id='menu-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={openDropdown}
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
        {subtitle && <MenuItem subtitle>{'Subtitle'}</MenuItem>}
        <MenuItem
          onClick={closeDropdown}
          dense={dense}
          disabled={disabled}
          destructive={destructive}
        >
          <ListItemIcon>
            <Avatar>Ar</Avatar>
          </ListItemIcon>
          <ListItemText>
            {label}
            <Typography component='p' variant='caption' color='text.secondary'>
              Secondary text
            </Typography>
          </ListItemText>
          <Box>
            <Chip
              size='small'
              label='type'
              color='default'
              variant='outlined'
              disabled={disabled}
            />
          </Box>
        </MenuItem>
        <MenuItem
          onClick={closeDropdown}
          dense={dense}
          disabled={disabled}
          destructive={destructive}
        >
          <ListItemIcon>
            <Avatar>Mr</Avatar>
          </ListItemIcon>
          <ListItemText>
            {label}
            <Typography component='p' variant='caption' color='text.secondary'>
              Secondary text
            </Typography>
          </ListItemText>
        </MenuItem>
        {subtitle && <MenuItem subtitle>{'Subtitle'}</MenuItem>}
        <MenuItem
          onClick={closeDropdown}
          dense={dense}
          disabled={disabled}
          destructive={destructive}
        >
          <ListItemIcon>
            <Avatar>Av</Avatar>
          </ListItemIcon>
          <ListItemText>{label}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={closeDropdown}
          dense={dense}
          disabled={disabled}
          destructive={destructive}
        >
          <ListItemIcon>
            <Avatar>Lm</Avatar>
          </ListItemIcon>
          <ListItemText>
            {label}
            <Typography component='p' variant='caption' color='text.secondary'>
              Secondary text
            </Typography>
          </ListItemText>
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

export const Extended = TemplateMenuExtended.bind({});
Extended.args = {
  ...commonArgs,
  extended: true
};

export const States = TemplateMenuItemStates.bind({});
States.args = { ...commonArgs };

export const Content = TemplateMenuItemContent.bind({});
Content.args = { ...commonArgs };

export const IconColor = TemplateMenuIconColor.bind({});
IconColor.args = {
  ...commonArgs
};

export const Destructive = TemplateMenuItemDestructive.bind({});
Destructive.args = { ...commonArgs };

export const Subtitle = TemplateMenu.bind({});
Subtitle.args = { ...commonArgs, subtitle: true };

export const TextOverflow = TemplateMenuOverflow.bind({});
TextOverflow.args = {
  ...commonArgs,
  width: '200px',
  label: 'Long text that will be truncated with ellipsis'
};

export const FixedMenuItem = TemplateMenuItemFixed.bind({});
FixedMenuItem.args = { ...commonArgs };

export const MenuListWrapper = TemplateMenuList.bind({});
MenuListWrapper.args = { ...commonArgs };

export const CustomWidth = TemplateMenu.bind({});
CustomWidth.args = { ...commonArgs, width: '400px' };

export const CustomHeight = TemplateMenu.bind({});
CustomHeight.args = { ...commonArgs, height: '100px' };

export const PlacementTop = TemplateMenu.bind({});
PlacementTop.args = {
  ...commonArgs,
  transformOrigin: { vertical: 'bottom', horizontal: 'left' },
  anchorOrigin: { vertical: -8, horizontal: 'left' }
};

export const PlacementRight = TemplateMenu.bind({});
PlacementRight.args = {
  ...commonArgs,
  transformOrigin: { vertical: 'top', horizontal: 'right' },
  anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
};
