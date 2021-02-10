import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { CategoryWidgetUI } from 'src/ui';
import { currencyFormatter } from './utils';

const DATA = [...Array(5)].map((_, idx) => ({
  category: `Category ${idx}`,
  value: (idx + 1) * 1234
}));

describe('CategoryWidgetUI', () => {
  test('empty', () => {
    render(<CategoryWidgetUI data={[]} />);

    const noDataValue = /No data available/i;
    const noResultsValue = /There are no results for the combination of filters applied to your data. Try tweaking your filters, or zoom and pan the map to adjust the Map View./i;

    expect(screen.getByText(noDataValue)).toBeInTheDocument();
    expect(screen.getByText(noResultsValue)).toBeInTheDocument();
  });

  test('simple', () => {
    render(<CategoryWidgetUI data={DATA} />);

    expect(screen.getByText(/Category 0/)).toBeInTheDocument();
    expect(screen.getByText(/1234/)).toBeInTheDocument();
  });

  test('with currency formatter', () => {
    render(<CategoryWidgetUI data={DATA} formatter={currencyFormatter} />);

    expect(screen.getByText(/Category 1/)).toBeInTheDocument();
    expect(screen.getByText(/\$1\.23K/)).toBeInTheDocument();
  });

  test('with one selected category', () => {
    render(<CategoryWidgetUI data={DATA} selectedCategories={['Category 0']} />);

    expect(screen.getByText(/1 selected/)).toBeInTheDocument();
  });

  describe('events', () => {
    test('category change', () => {
      const mockOnSelectedChange = jest.fn();
      render(
        <CategoryWidgetUI data={DATA} onSelectedCategoriesChange={mockOnSelectedChange} />
      );

      fireEvent.click(screen.getByText(1234));
      expect(mockOnSelectedChange).toHaveBeenCalledTimes(1);
    });

    test('clear', () => {
      const mockOnClear = jest.fn();
      render(
        <CategoryWidgetUI
          data={DATA}
          selectedCategories={['Category 0']}
          onSelectedCategoriesChange={mockOnClear}
        />
      );

      fireEvent.click(screen.getByText(/Clear/));
      expect(mockOnClear).toHaveBeenCalledTimes(1);
    });

    test('lock', () => {
      const mockOnLock = jest.fn();
      render(
        <CategoryWidgetUI
          data={DATA}
          selectedCategories={['Category 0']}
          onSelectedCategoriesChange={mockOnLock}
        />
      );

      fireEvent.click(screen.getByText(1234));
      expect(screen.getByText(/Lock/)).toBeInTheDocument();
      expect(mockOnLock).toHaveBeenCalledTimes(1);
    });

    test('unlock', () => {
      const mockOnSelectedChange = jest.fn();
      render(
        <CategoryWidgetUI
          data={DATA}
          selectedCategories={['Category 0']}
          onSelectedCategoriesChange={mockOnSelectedChange}
        />
      );

      fireEvent.click(screen.getByText(1234));
      fireEvent.click(screen.getByText(/Lock/));
      fireEvent.click(screen.getByText(/Unlock/));
      expect(mockOnSelectedChange).toHaveBeenCalledTimes(2);
    });

    test('search cycle', () => {
      const mockOnSelectedChange = jest.fn();
      render(
        <CategoryWidgetUI
          data={DATA}
          maxItems={1}
          onSelectedCategoriesChange={mockOnSelectedChange}
        />
      );

      fireEvent.click(screen.getByText(/Search in 4 elements/));
      fireEvent.click(screen.getByText(/Category 0/));
      fireEvent.click(screen.getByText(/Apply/));
      fireEvent.click(screen.getByText(/Unlock/));
      expect(mockOnSelectedChange).toHaveBeenCalledTimes(2);
    });

    test('cancel search', () => {
      render(<CategoryWidgetUI data={DATA} maxItems={1} />);

      expect(screen.getByText(/Search in 4 elements/)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/Search in 4 elements/));
      fireEvent.click(screen.getByText(/Cancel/));
    });
  });
});
