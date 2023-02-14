import React from 'react';
import ComparativeCategoryWidgetUI from '../../src/widgets/comparative/ComparativeCategoryWidgetUI/ComparativeCategoryWidgetUI';
import { fireEvent, render, screen } from '../widgets/utils/testUtils';
import userEvent from '@testing-library/user-event';

const SAMPLE_DATA = [
  [
    { name: 'data 1', value: 245 },
    { name: 'data 2', value: 354 },
    { name: 'data 3', value: 245 },
    { name: 'data 4', value: 354 },
    { name: 'data 5', value: 245 },
    { name: 'data 6', value: 354 }
  ],
  [
    { name: 'data 1', value: 454 },
    { name: 'data 2', value: 346 },
    { name: 'data 3', value: 454 },
    { name: 'data 4', value: 346 },
    { name: 'data 5', value: 454 },
    { name: 'data 6', value: 346 }
  ],
  [
    { name: 'data 1', value: 532 },
    { name: 'data 2', value: 758 },
    { name: 'data 3', value: 532 },
    { name: 'data 4', value: 760 },
    { name: 'data 5', value: 532 },
    { name: 'data 6', value: 754 }
  ]
];

const SAMPLE_NAMES = ['serie 1', 'serie 2', 'serie 3'];

describe('ComparativeCategoryWidgetUI', () => {
  test('item skeleton should display', () => {
    const { container } = render(<ComparativeCategoryWidgetUI data={[]} />);
    expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument();
  });

  test('simple', () => {
    render(
      <ComparativeCategoryWidgetUI
        data={SAMPLE_DATA}
        names={SAMPLE_NAMES}
        animation={false}
      />
    );

    expect(screen.getByText(/data 1/)).toBeInTheDocument();

    SAMPLE_DATA.map((s) => s[0]).forEach((item) => {
      expect(screen.getAllByText(new RegExp(String(item.value)))[0]).toBeInTheDocument();
    });
  });

  test('with one selected category', () => {
    render(
      <ComparativeCategoryWidgetUI
        data={SAMPLE_DATA}
        names={SAMPLE_NAMES}
        animation={false}
        selectedCategories={['data 1']}
      />
    );

    expect(screen.getByText(/1 selected/)).toBeInTheDocument();
  });

  describe('order', () => {
    test('fixed', () => {
      render(
        <ComparativeCategoryWidgetUI
          data={SAMPLE_DATA}
          names={SAMPLE_NAMES}
          animation={false}
          order={'fixed'}
        />
      );

      const renderedCategories = screen.getAllByText(/data \d/);
      expect(renderedCategories[0].textContent).toBe('data 1');
    });
    test('ranking', () => {
      render(
        <ComparativeCategoryWidgetUI
          data={SAMPLE_DATA}
          names={SAMPLE_NAMES}
          animation={false}
          order={'ranking'}
        />
      );

      const renderedCategories = screen.getAllByText(/data \d/);
      expect(renderedCategories[0].textContent).toBe('data 4');
    });
  });

  describe('events', () => {
    test('category change', () => {
      const mockOnSelectedCategoriesChange = jest.fn();
      render(
        <ComparativeCategoryWidgetUI
          data={SAMPLE_DATA}
          names={SAMPLE_NAMES}
          animation={false}
          onSelectedCategoriesChange={mockOnSelectedCategoriesChange}
        />
      );

      fireEvent.click(screen.getByText(/data 1/));
      expect(mockOnSelectedCategoriesChange).toHaveBeenCalledTimes(1);
    });

    test('clear', () => {
      const mockOnSelectedCategoriesChange = jest.fn();
      render(
        <ComparativeCategoryWidgetUI
          data={SAMPLE_DATA}
          names={SAMPLE_NAMES}
          animation={false}
          selectedCategories={['data 1']}
          onSelectedCategoriesChange={mockOnSelectedCategoriesChange}
        />
      );

      fireEvent.click(screen.getByText(/Clear/));
      expect(mockOnSelectedCategoriesChange).toHaveBeenCalledTimes(1);
    });

    test('lock', () => {
      const mockOnSelectedCategoriesChange = jest.fn();
      render(
        <ComparativeCategoryWidgetUI
          data={SAMPLE_DATA}
          names={SAMPLE_NAMES}
          animation={false}
          selectedCategories={['data 1']}
          onSelectedCategoriesChange={mockOnSelectedCategoriesChange}
        />
      );

      fireEvent.click(screen.getByText(/data 1/));
      expect(screen.getByText(/Lock/)).toBeInTheDocument();
      expect(mockOnSelectedCategoriesChange).toHaveBeenCalledTimes(1);
    });

    test('unlock', () => {
      const mockOnSelectedCategoriesChange = jest.fn();
      render(
        <ComparativeCategoryWidgetUI
          data={SAMPLE_DATA}
          names={SAMPLE_NAMES}
          animation={false}
          selectedCategories={['data 1']}
          onSelectedCategoriesChange={mockOnSelectedCategoriesChange}
        />
      );

      fireEvent.click(screen.getByText(/data 1/));
      expect(mockOnSelectedCategoriesChange).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByText(/Lock/));
      expect(screen.queryByText(/Unlock/)).toBeInTheDocument();
      expect(screen.queryByText(/Lock/)).not.toBeInTheDocument();

      fireEvent.click(screen.getByText(/Unlock/));
      expect(screen.queryByText(/Lock/)).toBeInTheDocument();
      expect(screen.queryByText(/Unlock/)).not.toBeInTheDocument();
    });

    test('search cycle', () => {
      const mockOnSelectedCategoriesChange = jest.fn();
      render(
        <ComparativeCategoryWidgetUI
          data={SAMPLE_DATA}
          names={SAMPLE_NAMES}
          animation={false}
          onSelectedCategoriesChange={mockOnSelectedCategoriesChange}
        />
      );

      fireEvent.click(screen.getByText(/Search in 1 elements/));
      fireEvent.click(screen.getByText(/data 1/));
      fireEvent.click(screen.getByText(/Apply/));
      expect(mockOnSelectedCategoriesChange).toHaveBeenCalledTimes(1);
    });

    test('search category', () => {
      HTMLElement.prototype.scrollIntoView = jest.fn();
      const mockOnSelectedCategoriesChange = jest.fn();
      render(
        <ComparativeCategoryWidgetUI
          data={SAMPLE_DATA}
          names={SAMPLE_NAMES}
          animation={false}
          onSelectedCategoriesChange={mockOnSelectedCategoriesChange}
        />
      );

      fireEvent.click(screen.getByText(/Search in 1 elements/));
      userEvent.type(screen.getByRole('textbox'), 'data 1');
      fireEvent.click(screen.getByText(/data 1/));
      fireEvent.click(screen.getByText(/Apply/));
      expect(mockOnSelectedCategoriesChange).toHaveBeenCalledTimes(1);
    });

    test('search cancel', () => {
      const mockOnSelectedCategoriesChange = jest.fn();
      render(
        <ComparativeCategoryWidgetUI
          data={SAMPLE_DATA}
          names={SAMPLE_NAMES}
          animation={false}
          onSelectedCategoriesChange={mockOnSelectedCategoriesChange}
        />
      );

      expect(screen.getByText(/Search in 1 elements/)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/Search in 1 elements/));
      fireEvent.click(screen.getByText(/Cancel/));
      expect(screen.getByText(/Search in 1 elements/)).toBeInTheDocument();
    });

    test('searchable props', () => {
      render(
        <ComparativeCategoryWidgetUI
          data={SAMPLE_DATA}
          names={SAMPLE_NAMES}
          animation={false}
          searchable={false}
        />
      );

      expect(screen.queryByText('Search in 1 elements')).not.toBeInTheDocument();
      expect(screen.getByText('Others (1)')).toBeInTheDocument();
    });
  });
});
