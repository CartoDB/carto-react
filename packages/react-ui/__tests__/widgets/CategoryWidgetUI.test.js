import React from 'react';
import { render, fireEvent, screen } from '../widgets/utils/testUtils';
import userEvent from '@testing-library/user-event';
import CategoryWidgetUI from '../../src/widgets/CategoryWidgetUI/CategoryWidgetUI';
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

    test('searchable prop', () => {
      render(<CategoryWidgetUI data={DATA} maxItems={1} searchable={false} />);
      expect(screen.queryByText('Search in 4 elements')).not.toBeInTheDocument();
      expect(screen.getByText('Others (4)')).toBeInTheDocument();
    });
  });

  describe('when data name is not string', () => {
    const NotStringData = [
      {
        name: true,
        value: 100
      },
      {
        name: false,
        value: 101
      }
    ];
    test('should render properly', () => {
      render(<CategoryWidgetUI data={NotStringData} />);

      expect(screen.getByText(/true/)).toBeInTheDocument();
      expect(screen.getByText(/101/)).toBeInTheDocument();
    });

    test('should maintain typing when filters', () => {
      const onSelectedCategoriesChangeFn = jest.fn();
      render(
        <CategoryWidgetUI
          data={NotStringData}
          onSelectedCategoriesChange={onSelectedCategoriesChangeFn}
        />
      );
      userEvent.click(screen.getByText(/true/));
      expect(onSelectedCategoriesChangeFn).toHaveBeenCalledWith([true]);
    });
  });
});
