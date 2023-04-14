import React from 'react';
import {
  Avatar,
  Box,
  Checkbox,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Switch,
  Paper,
  styled
} from '@mui/material';
import {
  Drafts,
  Delete,
  ExpandLess,
  ExpandMore,
  Home,
  Inbox,
  Star
} from '@mui/icons-material';

const options = {
  title: 'Organisms/List',
  component: List,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A29228'
    },
    status: {
      type: 'needsUpdate'
    }
  }
};
export default options;

const RootWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  margin: theme.spacing(-4),
  padding: theme.spacing(4)
}));

const Template = ({ secondary, ...args }) => {
  return (
    <RootWrapper container spacing={6}>
      <Grid container item spacing={2}>
        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItem button>
                <ListItemText primary='Home' secondary={secondary} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary='Inbox' secondary={secondary} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary='Drafts' secondary={secondary} />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItem button>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary='Home' secondary={secondary} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary='Inbox' secondary={secondary} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <Drafts />
                </ListItemIcon>
                <ListItemText primary='Drafts' secondary={secondary} />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItem button>
                <ListItemIcon>
                  <Checkbox edge='start' />
                </ListItemIcon>
                <ListItemText primary='Home' secondary={secondary} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <Checkbox edge='start' />
                </ListItemIcon>
                <ListItemText primary='Inbox' secondary={secondary} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <Checkbox edge='start' />
                </ListItemIcon>
                <ListItemText primary='Drafts' secondary={secondary} />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Star />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Home' secondary={secondary} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Star />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Inbox' secondary={secondary} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Star />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Drafts' secondary={secondary} />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </RootWrapper>
  );
};

const TemplateMetaValue = ({ secondary, ...args }) => {
  const MetaValueLabel = ({ value }) => {
    return (
      <Box alignSelf='flex-start' marginY={0.75}>
        <Typography variant='body2' align='right'>
          {value}
        </Typography>
      </Box>
    );
  };

  return (
    <RootWrapper container spacing={6}>
      <Grid container item spacing={2}>
        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItem button>
                <ListItemText primary='Home' />
                <MetaValueLabel value={args.metaValue}></MetaValueLabel>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary='Inbox' />
                <MetaValueLabel value={args.metaValue}></MetaValueLabel>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary='Drafts' />
                <MetaValueLabel value={args.metaValue}></MetaValueLabel>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItem button>
                <ListItemText primary='Home' secondary={secondary} />
                <MetaValueLabel value={args.metaValue}></MetaValueLabel>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary='Inbox' secondary={secondary} />
                <MetaValueLabel value={args.metaValue}></MetaValueLabel>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary='Drafts' secondary={secondary} />
                <MetaValueLabel value={args.metaValue}></MetaValueLabel>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </RootWrapper>
  );
};

const TemplateSecondaryActions = ({ ...args }) => {
  return (
    <RootWrapper container spacing={6}>
      <Grid container item spacing={2}>
        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItem button>
                <ListItemText primary='Home' />
                <ExpandMore />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary='Inbox' />
                <ExpandMore />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary='Drafts' />
                <ExpandMore />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItem button>
                <ListItemText primary='Home' />
                <ListItemSecondaryAction>
                  <Checkbox edge='end' />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary='Inbox' />
                <ListItemSecondaryAction>
                  <Checkbox edge='end' />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary='Drafts' />
                <ListItemSecondaryAction>
                  <Checkbox edge='end' />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItem button>
                <ListItemText primary='Home' />
                <ListItemSecondaryAction>
                  <IconButton size='small' edge='end' aria-label='delete'>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary='Inbox' />
                <ListItemSecondaryAction>
                  <IconButton size='small' edge='end' aria-label='delete'>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary='Drafts' />
                <ListItemSecondaryAction>
                  <IconButton size='small' edge='end' aria-label='delete'>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItem button>
                <ListItemText primary='Home' />
                <ListItemSecondaryAction>
                  <Switch edge='end' />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary='Inbox' />
                <ListItemSecondaryAction>
                  <Switch edge='end' />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary='Drafts' />
                <ListItemSecondaryAction>
                  <Switch edge='end' />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </RootWrapper>
  );
};

const TemplateNested = ({ ...args }) => {
  return (
    <RootWrapper container spacing={6}>
      <Grid container item spacing={2}>
        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItem button>
                <ListItemText primary='Home' />
                <ExpandLess />
              </ListItem>
              <Collapse in={true} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  <ListItem button>
                    <ListItemText primary='Sub item' />
                  </ListItem>
                  <List component='div' disablePadding>
                    <ListItem button>
                      <ListItemText primary='Sub item 2' />
                    </ListItem>
                    <List component='div' disablePadding>
                      <ListItem button>
                        <ListItemText primary='Sub item 3' />
                      </ListItem>
                      <List component='div' disablePadding>
                        <ListItem button>
                          <ListItemText primary='Sub item 4' />
                        </ListItem>
                      </List>
                    </List>
                  </List>
                </List>
              </Collapse>
              <Divider />
              <ListItem button>
                <ListItemText primary='Inbox' />
                <ExpandMore />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary='Drafts' />
                <ExpandMore />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </RootWrapper>
  );
};

export const Playground = Template.bind({});

export const OneLine = Template.bind({});

export const TwoLines = Template.bind({});
TwoLines.args = { secondary: 'Secondary text' };

export const SecondaryActions = TemplateSecondaryActions.bind({});

export const MetaValue = TemplateMetaValue.bind({});
MetaValue.args = { secondary: 'Secondary text too long here', metaValue: '$1,234.87' };

export const NestedOptions = TemplateNested.bind({});
