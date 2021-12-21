import React, { useState } from 'react';
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
import { stableSort } from './utils/dataSorter';

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
  initialSortOrder,
  initialSortColumn,
  pagination,
  rowsPerPage,
  rowsPerPageOptions,
  clickable,
  onRowClick
}) {
  const classes = useStyles();
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [sortColumn, setSortColumn] = useState(initialSortColumn);
  const [page, setPage] = useState(0);
  const [tableRowsPerPage, setRowsPerPage] = useState(
    rowsPerPageOptions[0] !== rowsPerPage ? rowsPerPageOptions[0] : rowsPerPage
  );

  const handleSort = (sortField) => {
    const isAsc = sortColumn === sortField && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortColumn(sortField);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (row) => {
    onRowClick(row);
  };

  // TODO: memo
  const pageFrom = pagination ? page * rowsPerPage : 0;
  const pageTo = pagination ? page * rowsPerPage + rowsPerPage : rows.length;
  const sortedRows =
    sortOrder && sortColumn ? stableSort(rows, { sortOrder, sortColumn }) : rows;
  const visibleRows = sortedRows.slice(pageFrom, pageTo);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeaderComponent
            columns={columns}
            sorting={sorting}
            sortOrder={sortOrder}
            sortColumn={sortColumn}
            onSort={handleSort}
          />
          <TableBodyComponent
            columns={columns}
            rows={visibleRows}
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
          count={rows.length}
          rowsPerPage={tableRowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}

function TableHeaderComponent({ columns, sorting, sortOrder, sortColumn, onSort }) {
  const classes = useStyles();

  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.field}
            align={headCell.align || 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {sorting && headCell.sort ? (
              <TableSortLabel
                active={sortColumn === headCell.field}
                direction={sortColumn === headCell.field ? sortOrder : 'asc'}
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
      {rows.map((row, r) => (
        <TableRow
          key={row.id}
          className={classes.tableRow}
          hover={clickable}
          onClick={() => clickable && onRowClick(row)}
        >
          {columns.map(
            (column, c) =>
              column.headerName && (
                <TableCell
                  key={`${r}_${c}`}
                  scope='row'
                  align={column.align || 'left'}
                  style={{ width: column.width, maxWidth: column.width }}
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
  initialSortOrder: 'asc',
  pagination: false,
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 25],
  clickable: false
};

TableWidgetUI.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  sorting: PropTypes.bool,
  initialSortOrder: PropTypes.string,
  initialSortColumn: PropTypes.string,
  pagination: PropTypes.bool,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  clickable: PropTypes.bool,
  onRowClick: PropTypes.func
};

export default TableWidgetUI;
