import { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete';

export type AutocompleteProps = MuiAutocompleteProps & {
  creatable?: boolean;
};

declare const Autocomplete: (props: AutocompleteProps) => JSX.Element;
export default Autocomplete;
