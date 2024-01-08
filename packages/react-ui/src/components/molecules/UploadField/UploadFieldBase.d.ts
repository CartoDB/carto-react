import React, { Ref } from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import { InputProps } from '@mui/material';

export type UploadFieldBaseProps = Omit<TextFieldProps, 'onChange' | 'error'> & {
  name?: string;
  accept?: string[] | string | null;
  multiple?: boolean;
  onChange?: (file?: File | null) => void;
  handleReset?: () => void;
  handleOpen?: () => void;
  dragOver?: boolean;
  error?: string | React.ReactNode;
  inProgress?: boolean;
  muiInputProps?: Partial<InputProps>;
  nativeInputProps?: object;
  size?: 'small' | 'medium';
  buttonText?: string;
  filesText?: File | string | null;
  inputRef?: Ref<any>;
};

declare const UploadFieldBase: (props: UploadFieldBaseProps) => JSX.Element;
export default UploadFieldBase;
