import { AlertProps as MuiAlertProps } from '@mui/material/Alert';

export type AlertProps = MuiAlertProps & {
  layout?: 'inline' | 'block';
  severity?: CartoAlertSeverity;
};

export type CartoAlertSeverity = 'neutral' | 'info' | 'success' | 'warning' | 'error';

declare const Alert: (props: AlertProps) => JSX.Element;
export default Alert;
