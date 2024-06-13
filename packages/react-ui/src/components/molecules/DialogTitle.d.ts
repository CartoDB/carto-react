import React from 'react';
import { DialogTitleProps as MuiDialogTitleProps } from '@mui/material';

export type DialogTitleProps = MuiDialogTitleProps & {
  title: React.ReactNode;
  chipLabel?: string;
  secondaryButons?: React.ReactNode;
  onClose?: Function;
};

declare const DialogTitle: (props: MuiDialogTitleProps) => JSX.Element;
export default DialogTitle;
