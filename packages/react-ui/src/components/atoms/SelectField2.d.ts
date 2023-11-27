import { MenuProps } from '@mui/material';
import { SelectProps } from '@mui/material/Select';
import { TextFieldProps } from '@mui/material/TextField';
import React from 'react';

export type SelectFieldProps2 = Omit<TextFieldProps, 'placeholder'> &
  SelectProps & {
    placeholder?: React.ReactNode | string;
    size?: 'small' | 'medium';
    renderValue?: (value: string[]) => React.ReactNode;
    menuProps?: Partial<MenuProps>;
    label?: React.ReactNode | string;
    helperText?: React.ReactNode | string;
  };

declare const SelectField2: (props: SelectFieldProps2) => JSX.Element;
export default SelectField2;
