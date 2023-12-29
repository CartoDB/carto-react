import { Ref } from 'react';
import { TextFieldProps } from '@mui/material/TextField';

export type UploadField4Props = Omit<TextFieldProps, 'onChange'> & {
  name?: string;
  buttonText?: string;
  accept?: string[] | string | null;
  files?: [];
  multiple?: boolean;
  onChange?: (file?: File | null) => void;
  inProgress?: boolean;
};

declare const UploadField4: (props: UploadField4Props) => JSX.Element;
export default UploadField4;
