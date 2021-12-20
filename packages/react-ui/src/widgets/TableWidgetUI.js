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
  Checkbox,
  TableSortLabel,
  TablePagination
} from '@material-ui/core';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: theme.palette.common.white,
    '& .MuiTableCell-head': {
      border: 'none'
    },
    '& .MuiTableCell-head, & .MuiTableCell-head span': {
      ...theme.typography.subtitle2,
      color: theme.palette.primary.main
    }
  },
  tableHeadSelecting: {
    '& .MuiTableCell-head': {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    '& .MuiTableCell-head, & .MuiTableCell-head span:not(.MuiIconButton-label)': {
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
    // TODO: as prop
    // '&:nth-of-type(odd)': {
    //   backgroundColor: fade(theme.palette.primary.relatedLight, 0.05),
    // },
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
  },
  visuallyHidden: {
    position: 'absolute',
    top: 20,
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    border: 0,
    clip: 'rect(0 0 0 0)',
    overflow: 'hidden'
  }
}));

// TODO: title and isLoading
function TableWidgetUI(props) {
  const {
    columns,
    rows,
    sorting,
    selecting,
    order,
    orderBy,
    pagination,
    rowsPerPage,
    rowsPerPageOptions,
    clickable,
    onRowClick
  } = props;
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [tableOrder, setOrder] = useState(order);
  const [tableOrderBy, setOrderBy] = useState(orderBy);
  const [page, setPage] = useState(0);
  const [tableRowsPerPage, setRowsPerPage] = useState(
    rowsPerPageOptions[0] !== rowsPerPage ? rowsPerPageOptions[0] : rowsPerPage
  );

  const handleSort = (prop) => {
    const isAsc = tableOrderBy === prop && tableOrder === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(prop);
  };

  const onSelectAll = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((r) => r.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const onSelectRow = (id) => {
    const newSelecteds = new Set(selected);

    if (newSelecteds.has(id)) {
      newSelecteds.delete(id);
    } else {
      newSelecteds.add(id);
    }
    setSelected([...newSelecteds]);
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

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeaderComponent
            columns={columns}
            sorting={sorting}
            selecting={selecting}
            order={tableOrder}
            orderBy={tableOrderBy}
            numSelected={selected.length}
            rowCount={rows.length}
            onSort={handleSort}
            onSelectAll={onSelectAll}
          />
          <TableBodyComponent
            columns={columns}
            rows={rows}
            selecting={selecting}
            selected={selected}
            order={tableOrder}
            orderBy={tableOrderBy}
            pagination={pagination}
            page={page}
            rowsPerPage={tableRowsPerPage}
            onSelect={onSelectRow}
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
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}

function TableHeaderComponent({
  columns,
  sorting,
  selecting,
  order,
  orderBy,
  numSelected,
  rowCount,
  onSelectAll,
  onSort
}) {
  const classes = useStyles();

  const handleRequestSort = (prop) => {
    onSort(prop);
  };

  const handleSelectAll = (event) => {
    onSelectAll(event);
  };

  return (
    <TableHead
      className={`${classes.tableHead} ${selecting ? classes.tableHeadSelecting : ''}`}
    >
      <TableRow>
        {selecting && (
          <TableCell padding='checkbox'>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={handleSelectAll}
              inputProps={{ 'aria-label': 'select all rows' }}
            />
          </TableCell>
        )}
        {columns.map((headCell) => (
          <TableCell
            key={headCell.field}
            align={headCell.align || 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {sorting && headCell.sort ? (
              <TableSortLabel
                active={orderBy === headCell.field}
                direction={orderBy === headCell.field ? order : 'asc'}
                onClick={() => handleRequestSort(headCell.field)}
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

function TableBodyComponent({
  columns,
  rows,
  selecting,
  onSelect,
  selected,
  order,
  orderBy,
  page,
  rowsPerPage,
  pagination,
  clickable,
  onRowClick
}) {
  const classes = useStyles();
  const pageFrom = pagination ? page * rowsPerPage : 0;
  const pageTo = pagination ? page * rowsPerPage + rowsPerPage : rows.length;
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleSelect = (id) => {
    onSelect(id);
  };

  const handleRowClick = (row) => {
    onRowClick(row);
  };

  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(pageFrom, pageTo)
        .map((row, r) => {
          const isItemSelected = isSelected(row.id);

          return (
            <TableRow
              key={row.id}
              className={classes.tableRow}
              hover={clickable}
              onClick={() => clickable && handleRowClick(row)}
            >
              {selecting && (
                <TableCellWithCheckbox
                  selected={isItemSelected}
                  onChange={(event) => handleSelect(row.id)}
                />
              )}
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
          );
        })}
    </TableBody>
  );
}

function TableCellWithCheckbox({ selected, onChange }) {
  return (
    <TableCell padding='checkbox'>
      <Checkbox
        checked={selected}
        onChange={onChange}
        inputProps={{ 'aria-label': 'select row' }}
      />
    </TableCell>
  );
}

TableWidgetUI.defaultProps = {
  isLoading: false,
  sorting: false,
  selecting: false,
  order: 'asc',
  pagination: false,
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 25],
  clickable: false
};

TableWidgetUI.propTypes = {
  isLoading: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  sorting: PropTypes.bool,
  selecting: PropTypes.bool,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  pagination: PropTypes.bool,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  clickable: PropTypes.bool,
  onRowClick: PropTypes.func
};

export default TableWidgetUI;
