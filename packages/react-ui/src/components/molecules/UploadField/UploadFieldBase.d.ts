import React, { Ref } from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import { InputProps } from '@mui/material';

export type UploadFieldBaseProps = Omit<TextFieldProps, 'placeholder' | 'error'> & {
  name?: string;
  multiple?: boolean;
  handleReset?: () => void;
  handleOpen?: () => void;
  dragOver?: boolean;
  error?: string | React.ReactNode;
  placeholder?: string | React.ReactNode;
  buttonText?: string;
  inProgress?: boolean;
  inputProps?: Partial<InputProps>;
  size?: 'small' | 'medium';
  hasFiles?: boolean;
  cursor?: 'pointer' | 'default';
};

declare const UploadFieldBase: (props: UploadFieldBaseProps) => JSX.Element;
export default UploadFieldBase;
