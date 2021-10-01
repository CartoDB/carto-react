import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

function NoDataAlert({
  title = 'No data available',
  body = 'There are no results for the combination of filters applied to your data. Try tweaking your filters, or zoom and pan the map to adjust the Map View.'
}) {
  return (
    <Alert severity='warning'>
      <AlertTitle>{title}</AlertTitle>
      {body}
    </Alert>
  );
}

export default NoDataAlert;
