import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';
import Typography from '../components/atoms/Typography';

function AlertBody({ color = undefined, children }) {
  return children ? (
    <Box mt={0.5}>
      <Typography
        component='div'
        variant='caption'
        color={color || 'inherit'}
        style={{ fontWeight: 'normal' }}
      >
        {children}
      </Typography>
    </Box>
  ) : (
    <Box mt={-1} />
  );
}

function NoDataAlert({
  title = 'No data available',
  body = 'There are no results for the combination of filters applied to your data. Try tweaking your filters, or zoom and pan the map to adjust the Map View.',
  severity = undefined,
  ...otherProps
}) {
  return severity ? (
    <Alert severity={severity} {...otherProps}>
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertBody>{body}</AlertBody>
    </Alert>
  ) : (
    <Box {...otherProps}>
      {title && <Typography variant='body2'>{title}</Typography>}
      <AlertBody color='textSecondary'>{body}</AlertBody>
    </Box>
  );
}

export default NoDataAlert;
