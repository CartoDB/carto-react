import React from 'react';
import { checkIfSourceIsDroppingFeature } from '@carto/react-redux';
import { NoDataAlert } from '@carto/react-ui/';
import { useSelector } from 'react-redux';
import { defaultDroppingFeaturesAlertProps } from './defaultDroppingFeaturesAlertProps';

export default function WidgetWithAlert({
  dataSource,
  droppingFeaturesAlertProps = defaultDroppingFeaturesAlertProps,
  noDataAlertProps = {},
  global = false,
  children
}) {
  const isDroppingFeatures = useSelector((state) =>
    checkIfSourceIsDroppingFeature(state, dataSource)
  );

  return (!global && isDroppingFeatures) || !children ? (
    <NoDataAlert
      {...(isDroppingFeatures ? droppingFeaturesAlertProps : noDataAlertProps)}
    />
  ) : (
    children
  );
}
