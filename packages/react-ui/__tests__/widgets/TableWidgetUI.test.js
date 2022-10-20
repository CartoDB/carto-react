import React from 'react';
import { render, fireEvent, screen } from '../widgets/utils/testUtils';
import TableWidgetUI from '../../src/widgets/TableWidgetUI/TableWidgetUI';
import { getMaterialUIContext } from './testUtils';
import { columns, rows } from '../../src/widgets/TableWidgetUI/mockData';

describe('TableWidgetUI', () => {
  const Widget = (props) =>
    getMaterialUIContext(<TableWidgetUI columns={columns} rows={rows} {...props} />);

  test('renders with default props', () => {
    render(<Widget />);
    expect(screen.queryByText('State / Province')).toBeInTheDocument();
  });

  test('renders only specified columns', () => {
    const keptFields = ['address', 'city'];
    const filteredColumns = columns.filter((col) => keptFields.includes(col.field));
    render(<Widget columns={filteredColumns} />);
    columns.forEach((col) => {
      if (keptFields.includes(col.field)) {
        expect(screen.queryByText(col.headerName)).toBeInTheDocument();
      } else {
        expect(screen.queryByText(col.headerName)).not.toBeInTheDocument();
      }
    });
  });

  test('calls callback when clicking on a row', () => {
    const mockOnRowClick = jest.fn();

    render(<Widget onRowClick={mockOnRowClick} />);

    const row = rows[1];
    fireEvent.click(screen.getByText(row.address));
    expect(mockOnRowClick).toHaveBeenCalledWith(row);
  });

  describe('sorting', () => {
    test('clicking on a column name triggers a sort on this field', () => {
      const mockOnSetSortBy = jest.fn();
      const mockOnSetSortDirection = jest.fn();

      render(
        <Widget
          sorting
          onSetSortBy={mockOnSetSortBy}
          onSetSortDirection={mockOnSetSortDirection}
        />
      );

      fireEvent.click(screen.getByText('Address'));
      expect(mockOnSetSortBy).toHaveBeenCalledWith('address');
    });

    test('clicking a second time reverse the sort direction', () => {
      const mockOnSetSortBy = jest.fn();
      const mockOnSetSortDirection = jest.fn();

      const props = {
        sorting: true,
        onSetSortBy: mockOnSetSortBy,
        onSetSortDirection: mockOnSetSortDirection
      };

      const { rerender } = render(<Widget {...props} />);

      fireEvent.click(screen.getByText('Address'));
      expect(mockOnSetSortBy).toHaveBeenCalledWith('address');
      expect(mockOnSetSortDirection).toHaveBeenCalledWith('asc');

      // the component is fully controlled so we need to simulate the change of sort props
      rerender(<Widget {...props} sortBy='address' sortDirection='asc' />);
      fireEvent.click(screen.getByText('Address'));
      expect(mockOnSetSortDirection).toHaveBeenCalledWith('desc');
    });
  });
});
