import React, { useState } from 'react';
import { NoDataAlert } from '@carto/react-ui';

export default function WidgetWithAlert({
  noDataAlertProps = {},
  warning,
  global = false,
  stableHeight, // if specified, "no-data" state will attempt to keep the same height as when rendered with data
  children
}) {
  const [childrenRef, setChildenRef] = useState();
  const [savedHeight, setSavedHeight] = useState();
  const noData = !global || warning || !children;

  if (stableHeight) {
    if (noData && childrenRef && savedHeight === undefined) {
      setSavedHeight(childrenRef?.clientHeight);
    } else if (!noData && savedHeight !== undefined) {
      setSavedHeight(undefined);
    }
  }

  return noData ? (
    <NoDataAlert
      {...(warning ? { ...noDataAlertProps, body: warning } : noDataAlertProps)}
      style={{ height: savedHeight }}
    />
  ) : (
    <div ref={setChildenRef}>{children}</div>
  );
}
