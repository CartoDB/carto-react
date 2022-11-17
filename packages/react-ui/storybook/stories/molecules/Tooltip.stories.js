import React from 'react';
import { Box, Grid, IconButton, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '../../../src/components/atoms/Typography';
import { InfoOutlined } from '@mui/icons-material';

const options = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  argTypes: {
    title: {
      control: {
        type: 'text'
      }
    },
    placement: {
      control: {
        type: 'select',
        options: ['top', 'left', 'right', 'bottom']
      }
    },
    arrow: {
      control: {
        type: 'boolean'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A36257'
    },
    status: {
      type: 'readyToReview'
    }
  }
};
export default options;

const useStylesContainer = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(4)
  },
  standalone: {
    display: 'flex',
    justifyContent: 'center'
  },
  label: {
    minWidth: '200px'
  }
}));

const TooltipBox = ({ title, ...args }) => {
  const classes = useStylesContainer();

  return (
    <Box className={classes.container}>
      <Typography variant='body2' className={classes.label}>
        {title}
      </Typography>

      <Tooltip {...args} title={title}>
        <IconButton>
          <InfoOutlined />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const TooltipPlaygroundTemplate = (args) => {
  const classes = useStylesContainer();

  return (
    <Box className={classes.standalone}>
      <Tooltip {...args}>
        <IconButton>
          <InfoOutlined />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const TooltipTextTemplate = () => {
  const classes = useStylesContainer();

  return (
    <Box className={classes.container}>
      <Grid container spacing={2}>
        <Grid item container spacing={2}>
          <Grid item xs={4}>
            <Tooltip title='Tooltip'>
              <IconButton>
                <InfoOutlined />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip
              title='This is an example to show that 
tooltip text can be longer.'
            >
              <IconButton>
                <InfoOutlined />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  data: {
    padding: theme.spacing(0.5)
  },
  list: {
    listStyle: 'none',
    paddingLeft: 0,
    margin: theme.spacing(0.5, 0, 0, 0),
    fontWeight: theme.typography.fontWeightRegular
  },
  item: {
    display: 'inline-block',
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: '50%',
    marginRight: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
    '&:not(:last-child())': {
      marginBottom: theme.spacing(0.5)
    }
  }
}));

const DataComponent = () => {
  const classes = useStyles();
  return (
    <Grid container direction='column' className={classes.data}>
      <Typography color='inherit' variant='caption'>
        Category
      </Typography>
      <ul className={classes.list}>
        <li>
          <span className={classes.item}></span>123,000
        </li>
        <li>
          <span className={classes.item}></span>123,000
        </li>
      </ul>
    </Grid>
  );
};

const TooltipDataTemplate = () => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item>
          <Tooltip title={<DataComponent />}>
            <IconButton>
              <InfoOutlined />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};

const TooltipArrowTemplate = (args) => {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <TooltipBox {...args} title='No arrow' arrow={false} />
      </Grid>
      <Grid item>
        <TooltipBox {...args} title='Tooltip with arrow' />
      </Grid>
    </Grid>
  );
};

const TooltipPositionTemplate = (args) => {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <TooltipBox {...args} title='Tooltip top' />
      </Grid>
      <Grid item>
        <TooltipBox {...args} title='Tooltip right' placement='right' />
      </Grid>
      <Grid item>
        <TooltipBox {...args} title='Tooltip left' placement='left' />
      </Grid>
      <Grid item>
        <TooltipBox {...args} title='Tooltip bottom' placement='bottom' />
      </Grid>
    </Grid>
  );
};

export const Playground = TooltipPlaygroundTemplate;
Playground.args = { title: 'Text' };

export const Text = TooltipTextTemplate.bind({});

export const Data = TooltipDataTemplate.bind({});

export const Arrow = TooltipArrowTemplate.bind({});

export const Position = TooltipPositionTemplate.bind({});
