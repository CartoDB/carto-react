import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  styled
} from '@mui/material';
import TableSkeleton from './Skeleton/TableSkeleton';

const TableHeadCellLabel = styled(TableSortLabel)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary
}));

const TableRowStyled = styled(TableRow)(({ theme }) => ({
  maxHeight: theme.spacing(6.5),
  transition: 'background-color 0.25s ease',
  '&.MuiTableRow-hover:hover': {
    cursor: 'pointer',
    backgroundColor: theme.palette.background.default
  }
}));

const TableCellStyled = styled(TableCell)(() => ({
  overflow: 'hidden',
  '& p': {
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

function TableWidgetUI({
  columns,
  rows,
  sorting,
  sortBy,
  sortDirection,
  onSetSortBy,
  onSetSortDirection,
  pagination,
  totalCount,
  page,
  onSetPage,
  rowsPerPage,
  rowsPerPageOptions,
  onSetRowsPerPage,
  onRowClick,
  height,
  dense,
  isLoading
}) {
  const paginationRef = useRef(null);

  const handleSort = (sortField) => {
    const isAsc = sortBy === sortField && sortDirection === 'asc';
    onSetSortDirection(isAsc ? 'desc' : 'asc');
    onSetSortBy(sortField);
  };

  const handleChangePage = (_event, newPage) => {
    onSetPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onSetRowsPerPage(parseInt(event.target.value, 10));
    onSetPage(0);
  };

  const fixedHeightStyle = {};
  if (height) {
    const paginationHeight = paginationRef?.current?.clientHeight || 0;
    fixedHeightStyle.height = `calc(${height} - ${paginationHeight}px)`;
  }

  if (isLoading) return <TableSkeleton style={fixedHeightStyle} />;

  return (
    <>
      <TableContainer style={fixedHeightStyle}>
        <Table stickyHeader size={dense ? 'small' : 'medium'}>
          <TableHeaderComponent
            columns={columns}
            sorting={sorting}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <TableBodyComponent columns={columns} rows={rows} onRowClick={onRowClick} />
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          ref={paginationRef}
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}

function TableHeaderComponent({ columns, sorting, sortBy, sortDirection, onSort }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map(({ field, headerName, align }) => (
          <TableCell key={field} align={align || 'left'}>
            {sorting ? (
              <TableHeadCellLabel
                active={sortBy === field}
                direction={sortBy === field ? sortDirection : 'asc'}
                onClick={() => onSort(field)}
              >
                {headerName}
              </TableHeadCellLabel>
            ) : (
              headerName
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function TableBodyComponent({ columns, rows, onRowClick }) {
  return (
    <TableBody>
      {rows.map((row, i) => {
        const rowKey = row.cartodb_id || row.id || i;

        return (
          <TableRowStyled
            key={rowKey}
            hover={!!onRowClick}
            onClick={() => onRowClick && onRowClick(row)}
          >
            {columns.map(
              ({ field, headerName, align, component }) =>
                headerName && (
                  <TableCellStyled
                    key={`${rowKey}_${field}`}
                    scope='row'
                    align={align || 'left'}
                  >
                    {component ? component(row[field]) : row[field]}
                  </TableCellStyled>
                )
            )}
          </TableRowStyled>
        );
      })}
    </TableBody>
  );
}

TableWidgetUI.defaultProps = {
  sorting: false,
  sortDirection: 'asc',
  pagination: false,
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 25],
  dense: false
};

TableWidgetUI.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  sorting: PropTypes.bool,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.string,
  onSetSortBy: PropTypes.func,
  onSetSortDirection: PropTypes.func,
  pagination: PropTypes.bool,
  totalCount: PropTypes.number,
  page: PropTypes.number,
  onSetPage: PropTypes.func,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  onSetRowsPerPage: PropTypes.func,
  onRowClick: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  dense: PropTypes.bool,
  isLoading: PropTypes.bool
};

export default TableWidgetUI;
