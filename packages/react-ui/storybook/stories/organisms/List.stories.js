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
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Switch,
  Paper,
  styled,
  ListItemButton
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
import { DocContainer, DocHighlight } from '../../utils/storyStyles';
import Button from '../../../src/components/atoms/Button';

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
              <ListItemButton>
                <ListItemText primary='Home' secondary={secondary} />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Inbox' secondary={secondary} />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Drafts' secondary={secondary} />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary='Home' secondary={secondary} />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary='Inbox' secondary={secondary} />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemIcon>
                  <Drafts />
                </ListItemIcon>
                <ListItemText primary='Drafts' secondary={secondary} />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItemButton>
                <ListItemIcon>
                  <Checkbox edge='start' />
                </ListItemIcon>
                <ListItemText primary='Home' secondary={secondary} />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemIcon>
                  <Checkbox edge='start' />
                </ListItemIcon>
                <ListItemText primary='Inbox' secondary={secondary} />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemIcon>
                  <Checkbox edge='start' />
                </ListItemIcon>
                <ListItemText primary='Drafts' secondary={secondary} />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>
                    <Star />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Home' secondary={secondary} />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>
                    <Star />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Inbox' secondary={secondary} />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>
                    <Star />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Drafts' secondary={secondary} />
              </ListItemButton>
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
              <ListItemButton>
                <ListItemText primary='Home' />
                <MetaValueLabel value={args.metaValue}></MetaValueLabel>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Inbox' />
                <MetaValueLabel value={args.metaValue}></MetaValueLabel>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Drafts' />
                <MetaValueLabel value={args.metaValue}></MetaValueLabel>
              </ListItemButton>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItemButton>
                <ListItemText primary='Home' secondary={secondary} />
                <MetaValueLabel value={args.metaValue}></MetaValueLabel>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Inbox' secondary={secondary} />
                <MetaValueLabel value={args.metaValue}></MetaValueLabel>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Drafts' secondary={secondary} />
                <MetaValueLabel value={args.metaValue}></MetaValueLabel>
              </ListItemButton>
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
              <ListItemButton>
                <ListItemText primary='Home' />
                <ExpandMore />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Inbox' />
                <ExpandMore />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Drafts' />
                <ExpandMore />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItemButton>
                <ListItemText primary='Home' />
                <ListItemSecondaryAction>
                  <Checkbox edge='end' />
                </ListItemSecondaryAction>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Inbox' />
                <ListItemSecondaryAction>
                  <Checkbox edge='end' />
                </ListItemSecondaryAction>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Drafts' />
                <ListItemSecondaryAction>
                  <Checkbox edge='end' />
                </ListItemSecondaryAction>
              </ListItemButton>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItemButton>
                <ListItemText primary='Home' />
                <ListItemSecondaryAction>
                  <IconButton size='small' edge='end' aria-label='delete'>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Inbox' />
                <ListItemSecondaryAction>
                  <IconButton size='small' edge='end' aria-label='delete'>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Drafts' />
                <ListItemSecondaryAction>
                  <IconButton size='small' edge='end' aria-label='delete'>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItemButton>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItemButton>
                <ListItemText primary='Home' />
                <ListItemSecondaryAction>
                  <Switch edge='end' />
                </ListItemSecondaryAction>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Inbox' />
                <ListItemSecondaryAction>
                  <Switch edge='end' />
                </ListItemSecondaryAction>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Drafts' />
                <ListItemSecondaryAction>
                  <Switch edge='end' />
                </ListItemSecondaryAction>
              </ListItemButton>
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
              <ListItemButton>
                <ListItemText primary='Home' />
                <ExpandLess />
              </ListItemButton>
              <Collapse in={true} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Sub item' />
                  </ListItemButton>
                  <List component='div' disablePadding>
                    <ListItemButton>
                      <ListItemText primary='Sub item 2' />
                    </ListItemButton>
                    <List component='div' disablePadding>
                      <ListItemButton>
                        <ListItemText primary='Sub item 3' />
                      </ListItemButton>
                      <List component='div' disablePadding>
                        <ListItemButton>
                          <ListItemText primary='Sub item 4' />
                        </ListItemButton>
                      </List>
                    </List>
                  </List>
                </List>
              </Collapse>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Inbox' />
                <ExpandMore />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary='Drafts' />
                <ExpandMore />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </RootWrapper>
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

export const Playground = Template.bind({});

export const Guide = DocTemplate.bind({});

export const OneLine = Template.bind({});

export const TwoLines = Template.bind({});
TwoLines.args = { secondary: 'Secondary text' };

export const SecondaryActions = TemplateSecondaryActions.bind({});

export const MetaValue = TemplateMetaValue.bind({});
MetaValue.args = { secondary: 'Secondary text too long here', metaValue: '$1,234.87' };

export const NestedOptions = TemplateNested.bind({});
