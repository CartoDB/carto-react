import React from 'react';
import { Box, Button, Grid, IconButton, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '../../../src/components/atoms/Typography';
import { InfoOutlined } from '@mui/icons-material';

const options = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  argTypes: {
    title: {
      defaultValue: 'Hello World!',
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
    },
    interactive: {
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
      type: 'inDevelopment'
    }
  }
};
export default options;

const useStylesContainer = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4)
  }
}));

const TooltipBox = ({ ...args }) => {
  const classes = useStylesContainer();

  return (
    <Box className={classes.container}>
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
              <Button>Sample</Button>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip
              title='This is an example to show that 
tooltip text can be longer.'
            >
              <Button>Sample</Button>
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
            <Button>Sample</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};

const TooltipPositionTemplate = () => {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <TooltipBox arrow={false} />
      </Grid>
      <Grid item>
        <TooltipBox />
      </Grid>
      <Grid item>
        <TooltipBox placement='bottom' />
      </Grid>
      <Grid item>
        <TooltipBox placement='right' />
      </Grid>
      <Grid item>
        <TooltipBox placement='left' />
      </Grid>
    </Grid>
  );
};

export const Playground = TooltipBox;

export const Text = TooltipTextTemplate.bind({});

export const Data = TooltipDataTemplate.bind({});

export const Position = TooltipPositionTemplate.bind({});
