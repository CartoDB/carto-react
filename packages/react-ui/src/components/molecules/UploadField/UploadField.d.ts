import { Ref } from 'react';
import { TextFieldProps } from '@mui/material/TextField';

export type UploadFieldProps = Omit<TextFieldProps, 'onChange'> & {
  name: string;
  buttonText?: string;
  accept?: string[] | string | null;
  files?: [];
  multiple?: boolean;
  onChange?: (file?: File | null) => void;
  inputRef?: Ref<any>;
  inProgress?: boolean;
};

declare const UploadField: (props: UploadFieldProps) => JSX.Element;
export default UploadField;
