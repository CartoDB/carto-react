import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryWidgetUI from '../../src/widgets/CategoryWidgetUI';
import { currencyFormatter } from './testUtils';

const DATA = [...Array(5)].map((_, idx) => ({
  name: `Category ${idx + 1}`,
  value: (idx + 1) * 1234
}));

// Mock animations
jest.mock('../../src/widgets/utils/animations');
// eslint-disable-next-line import/first
import { animateValues } from '../../src/widgets/utils/animations';

animateValues.mockImplementation(({ end, drawFrame }) => {
  drawFrame(end); // draw final step, no intermediate ones
});

describe('CategoryWidgetUI', () => {
  test('empty', () => {
    render(<CategoryWidgetUI data={[]} />);

    const NO_DATA_TEXT = /No data available/;
    const NO_RESULT_TEXT = /There are no results for the combination of filters applied to your data. Try tweaking your filters, or zoom and pan the map to adjust the Map View./;

    expect(screen.getByText(NO_DATA_TEXT)).toBeInTheDocument();
    expect(screen.getByText(NO_RESULT_TEXT)).toBeInTheDocument();
  });

  test('item skeleton should display', () => {
    const { container } = render(<CategoryWidgetUI data={[]} isLoading={true} />);

    expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument();
  });

  test('simple', () => {
    render(<CategoryWidgetUI data={DATA} />);

    expect(screen.getByText(/Category 1/)).toBeInTheDocument();
    expect(screen.getByText(/1234/)).toBeInTheDocument();
  });

  test('with currency formatter', () => {
    render(<CategoryWidgetUI data={DATA} formatter={currencyFormatter} />);

    expect(screen.getByText(/Category 1/)).toBeInTheDocument();
    expect(screen.getByText(/\$1\.23K/)).toBeInTheDocument();
  });

  test('with one selected category', () => {
    render(<CategoryWidgetUI data={DATA} selectedCategories={['Category 1']} />);

    expect(screen.getByText(/1 selected/)).toBeInTheDocument();
  });

  describe('order', () => {
    test('ranking', () => {
      render(<CategoryWidgetUI data={DATA} />);

      const renderedCategories = screen.getAllByText(/Category/);
      expect(renderedCategories[0].textContent).toBe('Category 5');
    });

    test('fixed', () => {
      render(<CategoryWidgetUI data={DATA} order='fixed' />);

      const renderedCategories = screen.getAllByText(/Category/);
      expect(renderedCategories[0].textContent).toBe('Category 1');
    });
  });

  describe('events', () => {
    test('category change', () => {
      const mockOnSelectedCategoriesChange = jest.fn();
      render(
        <CategoryWidgetUI
          data={DATA}
          onSelectedCategoriesChange={mockOnSelectedCategoriesChange}
        />
      );

      fireEvent.click(screen.getByText(1234));
      expect(mockOnSelectedCategoriesChange).toHaveBeenCalledTimes(1);
    });

    test('clear', () => {
      const mockOnSelectedCategoriesChange = jest.fn();
      render(
        <CategoryWidgetUI
          data={DATA}
          selectedCategories={['Category 1']}
          onSelectedCategoriesChange={mockOnSelectedCategoriesChange}
        />
      );

      fireEvent.click(screen.getByText(/Clear/));
      expect(mockOnSelectedCategoriesChange).toHaveBeenCalledTimes(1);
    });

    test('lock', () => {
      const mockOnSelectedCategoriesChange = jest.fn();
      render(
        <CategoryWidgetUI
          data={DATA}
          selectedCategories={['Category 1']}
          onSelectedCategoriesChange={mockOnSelectedCategoriesChange}
        />
      );

      fireEvent.click(screen.getByText(1234));
      expect(screen.getByText(/Lock/)).toBeInTheDocument();
      expect(mockOnSelectedCategoriesChange).toHaveBeenCalledTimes(1);
    });

    test('unlock', () => {
      const mockOnSelectedCategoriesChange = jest.fn();
      render(
        <CategoryWidgetUI
          data={DATA}
          selectedCategories={['Category 1']}
          onSelectedCategoriesChange={mockOnSelectedCategoriesChange}
        />
      );

      fireEvent.click(screen.getByText(1234));
      fireEvent.click(screen.getByText(/Lock/));
      fireEvent.click(screen.getByText(/Unlock/));
      expect(mockOnSelectedCategoriesChange).toHaveBeenCalledTimes(2);
    });

    test('search cycle', () => {
      const mockOnSelectedCategoriesChange = jest.fn();
      render(
        <CategoryWidgetUI
          data={DATA}
          maxItems={1}
          onSelectedCategoriesChange={mockOnSelectedCategoriesChange}
        />
      );

      fireEvent.click(screen.getByText(/Search in 4 elements/));
      fireEvent.click(screen.getByText(/Category 1/));
      fireEvent.click(screen.getByText(/Apply/));
      fireEvent.click(screen.getByText(/Unlock/));
      expect(mockOnSelectedCategoriesChange).toHaveBeenCalledTimes(2);
    });

    test('search category', () => {
      HTMLElement.prototype.scrollIntoView = jest.fn();
      const mockOnSelectedCategoriesChange = jest.fn();
      render(
        <CategoryWidgetUI
          data={DATA}
          maxItems={1}
          onSelectedCategoriesChange={mockOnSelectedCategoriesChange}
        />
      );

      fireEvent.click(screen.getByText(/Search in 4 elements/));
      userEvent.type(screen.getByRole('textbox'), 'Category 1');
      fireEvent.click(screen.getByText(/Category 1/));
      fireEvent.click(screen.getByText(/Apply/));
    });

    test('cancel search', () => {
      render(<CategoryWidgetUI data={DATA} maxItems={1} />);

      expect(screen.getByText(/Search in 4 elements/)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/Search in 4 elements/));
      fireEvent.click(screen.getByText(/Cancel/));
    });
  });
});
