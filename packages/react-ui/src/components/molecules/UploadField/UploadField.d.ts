import { Ref } from 'react';
import { TextFieldProps } from '@mui/material/TextField';

export type UploadFieldProps = Omit<TextFieldProps, 'onChange'> & {
  name: string;
  buttonText?: string;
  accept?: string | null;
  files?: [];
  multiple?: boolean;
  onChange?: (file?: File | null) => void;
  validator?: (file: File) => Promise<string | undefined | null>;
  inputRef?: Ref<any>;
  inProgress?: boolean;
};

declare const UploadField: (props: UploadFieldProps) => JSX.Element;
export default UploadField;
