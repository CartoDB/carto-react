import { AlertProps as MuiAlertProps } from '@mui/material/Alert';

export type AlertProps = Omit<MuiAlertProps, 'severity'> &
  Omit<MuiAlertProps, 'title'> & {
    content?: 'inline' | 'block';
    severity?: CartoAlertSeverity;
    open?: boolean;
    title?: React.ReactNode | string;
    isSticky?: boolean;
  };

export type CartoAlertSeverity = 'neutral' | 'info' | 'success' | 'warning' | 'error';

declare const Alert: (props: AlertProps) => JSX.Element;
export default Alert;
