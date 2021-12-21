import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  TableSortLabel,
  TablePagination
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: theme.palette.common.white,
    '& .MuiTableCell-head': {
      border: 'none'
    },
    '& .MuiTableCell-head, & .MuiTableCell-head span': {
      ...theme.typography.caption,
      color: theme.palette.text.secondary
    }
  },
  tableRow: {
    maxHeight: theme.spacing(6.5),
    transition: 'background-color 0.25s ease',
    '&.MuiTableRow-hover:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.background.default
    }
  },
  tableCell: {
    overflow: 'hidden',
    '& p': {
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  },
  pagination: {
    '& .MuiTablePagination-caption': {
      ...theme.typography.caption
    },
    '& .MuiTablePagination-caption:first-of-type': {
      color: theme.palette.text.secondary
    },
    '& .MuiTablePagination-input': {
      minHeight: theme.spacing(4.5),
      border: `2px solid ${theme.palette.divider}`,
      borderRadius: theme.spacing(0.5)
    }
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
  clickable,
  onRowClick
}) {
  const classes = useStyles();

  const handleSort = (sortField) => {
    const isAsc = sortBy === sortField && sortDirection === 'asc';
    onSetSortDirection(isAsc ? 'desc' : 'asc');
    onSetSortBy(sortField);
  };

  const handleChangePage = (event, newPage) => {
    onSetPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onSetRowsPerPage(parseInt(event.target.value, 10));
    onSetPage(0);
  };

  const handleRowClick = (row) => {
    onRowClick(row);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeaderComponent
            columns={columns}
            sorting={sorting}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <TableBodyComponent
            columns={columns}
            rows={rows}
            clickable={clickable}
            onRowClick={handleRowClick}
          />
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          className={classes.pagination}
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
  const classes = useStyles();

  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell key={headCell.field} align={headCell.align || 'left'}>
            {sorting ? (
              <TableSortLabel
                active={sortBy === headCell.field}
                direction={sortBy === headCell.field ? sortDirection : 'asc'}
                onClick={() => onSort(headCell.field)}
              >
                {headCell.headerName}
              </TableSortLabel>
            ) : (
              headCell.headerName
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function TableBodyComponent({ columns, rows, clickable, onRowClick }) {
  const classes = useStyles();

  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.cartodb_id}
          className={classes.tableRow}
          hover={clickable}
          onClick={() => clickable && onRowClick(row)}
        >
          {columns.map(
            (column) =>
              column.headerName && (
                <TableCell
                  key={`${row.cartodb_id}_${column.field}`}
                  scope='row'
                  align={column.align || 'left'}
                  className={classes.tableCell}
                >
                  {column.component
                    ? column.component(row[column.field])
                    : row[column.field]}
                </TableCell>
              )
          )}
        </TableRow>
      ))}
    </TableBody>
  );
}

TableWidgetUI.defaultProps = {
  sorting: false,
  sortDirection: 'asc',
  pagination: false,
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 25],
  clickable: false
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
  clickable: PropTypes.bool,
  onRowClick: PropTypes.func
};

export default TableWidgetUI;
