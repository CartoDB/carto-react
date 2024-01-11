import React from 'react';
import { SelectProps } from '@mui/material/Select';
import { MenuProps } from '@mui/material/Menu';
import { InputProps } from '@mui/material/Input';

export type SelectFieldProps<Value = unknown> = Omit<
  SelectProps<Value>,
  'placeholder'
> & {
  placeholder?: React.ReactNode | string;
  size?: 'small' | 'medium';
  menuProps?: Partial<MenuProps>;
  inputProps?: Partial<InputProps>;
  helperText?: React.ReactNode | string;
};

declare const SelectField: <Value>(props: SelectFieldProps<Value>) => JSX.Element;
export default SelectField;
