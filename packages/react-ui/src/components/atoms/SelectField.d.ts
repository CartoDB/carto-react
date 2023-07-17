import { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { TextFieldProps } from '@mui/material/TextField';
import React from 'react';

export type SelectFieldProps = Omit<SelectProps, 'placeholder'> &
  Omit<TextFieldProps, 'placeholder'> & {
    children?: React.ReactNode;
    onChange?: (event: SelectChangeEvent<string[]>, child: React.ReactNode) => void;
    placeholder?: React.ReactNode;
    size?: 'small' | 'medium';
    customRenderValue?: (value: string[]) => React.ReactNode;
  };

declare const SelectField: (props: SelectFieldProps) => JSX.Element;
export default SelectField;
