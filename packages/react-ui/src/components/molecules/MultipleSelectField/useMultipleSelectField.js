import { useState, useEffect } from 'react';

export default function useMultipleSelectField({ selectedOptions, options, onChange }) {
  const [currentOptions, setCurrentOptions] = useState(selectedOptions || []);

  const areAllSelected = options.length === currentOptions.length;
  const areAnySelected = currentOptions.length > 0;

  useEffect(() => {
    if (currentOptions !== selectedOptions) {
      setCurrentOptions(currentOptions);
    }
    // intentionally ignore currentOptions as we only want to trigger on external updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    const options =
      typeof value === 'string' ? value.split(',') : value.filter((v) => v !== undefined);
    setCurrentOptions(options);
    onChange(options);
  };

  const selectAll = () => {
    const optionsValues = options
      ?.filter(({ disabled }) => !disabled)
      .map(({ value }) => value);

    if (optionsValues) {
      const allSelected = optionsValues.every((value) => currentOptions.includes(value));
      if (allSelected) {
        // Deselect all options
        setCurrentOptions([]);
        onChange([]);
      } else {
        // Select all options
        setCurrentOptions(optionsValues);
        onChange(optionsValues);
      }
    }
  };

  const unselectAll = () => {
    setCurrentOptions([]);
    onChange([]);
  };

  return {
    areAllSelected,
    areAnySelected,
    currentOptions,
    handleChange,
    selectAll,
    unselectAll
  };
}
