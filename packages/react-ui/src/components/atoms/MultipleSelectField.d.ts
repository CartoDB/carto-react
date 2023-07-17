import React from 'react';
import { SelectFieldProps } from './SelectField';

type MultipleSelectFieldItem = {
  label: string | React.ReactNode;
  value: string | number;
};

export type MultipleSelectFieldProps = SelectFieldProps & {
  items: MultipleSelectFieldItem[];
  itemChecked: Boolean[];
};

declare const MultipleSelectField: (props: MultipleSelectFieldProps) => JSX.Element;
export default MultipleSelectField;
