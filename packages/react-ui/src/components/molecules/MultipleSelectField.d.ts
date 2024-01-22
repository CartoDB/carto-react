import React from 'react';
import { SelectFieldProps } from '../atoms/SelectField';

type MultipleSelectFieldOption = {
  label: string | React.ReactNode;
  value: string | number;
  disabled?: boolean;
  tooltip?: string | false;
};

export type MultipleSelectFieldProps = Omit<
  SelectFieldProps,
  'onChange' | 'defaultValue' | 'value'
> & {
  options: MultipleSelectFieldOption[];
  selectedOptions?: string[];
  selectAllDisabled?: boolean;
  onChange: (options: string[]) => void;
  showCounter?: boolean;
  showFilters?: boolean;
};

declare const MultipleSelectField: (props: MultipleSelectFieldProps) => JSX.Element;
export default MultipleSelectField;
