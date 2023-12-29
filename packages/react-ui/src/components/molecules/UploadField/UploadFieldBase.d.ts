import React, { Ref } from 'react';
import { TextFieldProps } from '@mui/material/TextField';

export type UploadFieldBaseProps = Omit<TextFieldProps, 'onChange' | 'error'> & {
  name?: string;
  buttonText?: string;
  multiple?: boolean;
  onChange?: (file?: File | null) => void;
  inProgress?: boolean;
  error?: string | React.ReactNode;
  inputRef?: Ref<HTMLInputElement>;
};

declare const UploadFieldBase: (props: UploadFieldBaseProps) => JSX.Element;
export default UploadFieldBase;
