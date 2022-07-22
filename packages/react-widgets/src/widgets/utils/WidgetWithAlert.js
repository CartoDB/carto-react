import React from 'react';
import { checkIfSourceIsDroppingFeature } from '@carto/react-redux';
import { NoDataAlert } from '@carto/react-ui/';
import { useSelector } from 'react-redux';
import { defaultDroppingFeaturesAlertProps } from './defaultDroppingFeaturesAlertProps';

export default function WidgetWithAlert({
  dataSource,
  droppingFeaturesAlertProps = defaultDroppingFeaturesAlertProps,
  showDroppingFeaturesAlert = true,
  noDataAlertProps = {},
  warning,
  global = false,
  children
}) {
  const isDroppingFeatures = useSelector((state) =>
    checkIfSourceIsDroppingFeature(state, dataSource)
  );

  return (!global && isDroppingFeatures && showDroppingFeaturesAlert) ||
    warning ||
    !children ? (
    <NoDataAlert
      {...(isDroppingFeatures
        ? droppingFeaturesAlertProps
        : warning
        ? { ...noDataAlertProps, body: warning }
        : noDataAlertProps)}
    />
  ) : (
    children
  );
}
