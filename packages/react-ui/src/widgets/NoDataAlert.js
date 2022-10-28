import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { Box } from '@mui/material';
import Typography from '../atoms/Typography';

function AlertBody({ color = undefined, children }) {
  return children ? (
    <Box mt={0.5}>
      <Typography
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
  severity = undefined
}) {
  return severity ? (
    <Alert severity={severity}>
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertBody>{body}</AlertBody>
    </Alert>
  ) : (
    <Box>
      {title && <Typography variant='body2'>{title}</Typography>}
      <AlertBody color='textSecondary'>{body}</AlertBody>
    </Box>
  );
}

export default NoDataAlert;
