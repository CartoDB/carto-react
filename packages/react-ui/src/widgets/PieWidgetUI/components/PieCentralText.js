import React from 'react';
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/material';
import Typography from '../../../components/atoms/Typography';

const Root = styled(Box)(({ theme }) => ({
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: theme.spacing(1)
}));

const Category = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  textTransform: 'uppercase'
}));

const MarkerColor = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  borderRadius: theme.spacing(0.5),
  width: theme.spacing(1),
  height: theme.spacing(1)
}));

function PieCentralText({ item }) {
  const { name, percentage, color } = item;

  if (!item) {
    return null;
  }

  return (
    <Root>
      <Typography variant='h5'>{percentage}</Typography>
      <Category variant='body2'>
        <MarkerColor bgcolor={color} component='span' /> {name}
      </Category>
    </Root>
  );
}

PieCentralText.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    percentage: PropTypes.string,
    color: PropTypes.string
  })
};

export default PieCentralText;
