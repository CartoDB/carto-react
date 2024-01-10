import React from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import { InputProps } from '@mui/material/Input';

export type UploadFieldBaseProps = Omit<TextFieldProps, 'placeholder'> & {
  name?: string;
  multiple?: boolean;
  handleReset?: () => void;
  handleOpen?: () => void;
  dragOver?: boolean;
  placeholder?: string | React.ReactNode;
  buttonText?: string;
  inProgress?: boolean;
  InputProps?: Partial<InputProps>;
  size?: 'small' | 'medium';
  hasFiles?: boolean;
  cursor?: 'pointer' | 'default';
};

declare const UploadFieldBase: (props: UploadFieldBaseProps) => JSX.Element;
export default UploadFieldBase;
