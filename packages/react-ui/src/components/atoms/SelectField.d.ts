import { SelectProps } from '@mui/material/Select';
import { TextFieldProps } from '@mui/material/TextField';
import React from 'react';

export type SelectFieldProps = SelectProps &
  Omit<TextFieldProps, 'placeholder'> & {
    children?: React.ReactNode;
    onChange?: Function;
    placeholder?: React.ReactNode;
    size?: 'small' | 'medium';
    customRenderValue?: (value) => React.ReactNode;
  };

declare const SelectField: (props: SelectFieldProps) => JSX.Element;
export default SelectField;
