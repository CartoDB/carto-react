import React from 'react';
import { InputProps, MenuProps } from '@mui/material';
import { SelectProps } from '@mui/material/Select';

export type SelectFieldProps = Omit<SelectProps, 'placeholder'> & {
  placeholder?: React.ReactNode | string;
  size?: 'small' | 'medium';
  menuProps?: Partial<MenuProps>;
  inputProps?: Partial<InputProps>;
  helperText?: React.ReactNode | string;
};

declare const SelectField: (props: SelectFieldProps) => JSX.Element;
export default SelectField;
