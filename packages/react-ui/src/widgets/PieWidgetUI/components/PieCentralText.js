import React from 'react';
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/material';
import Typography from '../../../components/atoms/Typography';

const Root = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  zIndex: -1,
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

function PieCentralText({ data, selectedItem }) {
  const { name, value, color } = selectedItem;

  if (!selectedItem) {
    return null;
  }

  return (
    <Root>
      <Typography variant='h5'>{'48.16%'}</Typography>
      <Category variant='body2'>
        <MarkerColor bgcolor={color} component='span' /> {name}
      </Category>
    </Root>
  );
}

PieCentralText.propTypes = {
  selectedItem: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number,
      color: PropTypes.string
    })
  )
};

export default PieCentralText;
