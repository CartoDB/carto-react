import React from 'react';
import { Box, Button, CircularProgress, Grid, LinearProgress } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const options = {
  title: 'Common/Progress',
  component: CircularProgress,
  argTypes: {
    color: {
      defaultValue: 'primary',
      control: {
        type: 'select',
        options: ['inherit', 'primary', 'secondary']
      }
    },
    size: {
      defaultValue: 40,
      control: {
        type: 'number'
      }
    },
    thickness: {
      defaultValue: 4,
      control: {
        type: 'number'
      }
    },
    valueBuffer: {
      control: {
        type: 'number'
      }
    },
    variant: {
      defaultValue: 'indeterminate',
      control: {
        type: 'select',
        options: ['determinate', 'indeterminate', 'static', 'buffer', 'query']
      }
    }
  }
};
export default options;

const Template = ({ ...args }) => {
  return (
    <Grid>
      <Box>
        <CircularProgress {...args} />
      </Box>
      <Box mt={4}>
        <LinearProgress {...args} />
      </Box>
    </Grid>
  );
};

const ProgressDeterminate = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Grid>
      <Box display='flex' flexDirection='row'>
        <Box mr={2}>
          <CircularProgress variant='determinate' value={25} />
        </Box>
        <Box mr={2}>
          <CircularProgress variant='determinate' value={50} />
        </Box>
        <Box mr={2}>
          <CircularProgress variant='determinate' value={75} />
        </Box>
        <Box mr={2}>
          <CircularProgress variant='determinate' value={100} />
        </Box>
        <Box>
          <CircularProgress variant='determinate' value={progress} />
        </Box>
      </Box>
      <Box mt={4}>
        <LinearProgress variant='determinate' value={progress} />
      </Box>
    </Grid>
  );
};

const ProgressBuffer = () => {
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <LinearProgress variant='buffer' value={progress} valueBuffer={buffer} />;
};

const ProgressIntegrated = () => {
  const [loading, setLoading] = React.useState(false);
  const timer = React.useRef(0);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <Grid container direction='row'>
      <Box mr={4}>
        <Button
          startIcon={
            loading ? <CircularProgress size={22} thickness={4} /> : <CheckIcon />
          }
          onClick={handleButtonClick}
        >
          {loading ? 'Loading' : 'Success'}
        </Button>
      </Box>
      <Box mr={4}>
        <Button
          endIcon={loading ? <CircularProgress size={22} thickness={4} /> : <CheckIcon />}
          onClick={handleButtonClick}
        >
          {loading ? 'Loading' : 'Success'}
        </Button>
      </Box>
      <Box>
        <Button onClick={handleButtonClick} style={{ overflow: 'hidden' }}>
          {loading ? 'Loading' : 'Success'}
          {loading && (
            <LinearProgress
              variant='indeterminate'
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                display: 'inline-block'
              }}
            />
          )}
        </Button>
      </Box>
    </Grid>
  );
};

export const Playground = Template.bind({});

export const Determinate = ProgressDeterminate.bind({});
export const LinearBuffer = ProgressBuffer.bind({});
export const Integrated = ProgressIntegrated.bind({});
