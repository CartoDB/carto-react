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
  TablePagination
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  tableHeadCellLabel: {
    ...theme.typography.caption,
    color: theme.palette.text.secondary
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
  dense
}) {
  const classes = useStyles();
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
    <TableHead>
      <TableRow>
        {columns.map(({ field, headerName, align }) => (
          <TableCell key={field} align={align || 'left'}>
            {sorting ? (
              <TableSortLabel
                active={sortBy === field}
                direction={sortBy === field ? sortDirection : 'asc'}
                onClick={() => onSort(field)}
                className={classes.tableHeadCellLabel}
              >
                {headerName}
              </TableSortLabel>
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
  const classes = useStyles();

  return (
    <TableBody>
      {rows.map((row, i) => {
        const rowKey = row.cartodb_id || row.id || i;

        return (
          <TableRow
            key={rowKey}
            className={classes.tableRow}
            hover={!!onRowClick}
            onClick={() => onRowClick && onRowClick(row)}
          >
            {columns.map(
              ({ field, headerName, align, component }) =>
                headerName && (
                  <TableCell
                    key={`${rowKey}_${field}`}
                    scope='row'
                    align={align || 'left'}
                    className={classes.tableCell}
                  >
                    {component ? component(row[field]) : row[field]}
                  </TableCell>
                )
            )}
          </TableRow>
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
  dense: PropTypes.bool
};

export default TableWidgetUI;
