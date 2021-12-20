import React, { useState } from 'react';
import {
  Checkbox,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  makeStyles
} from '@material-ui/core';

const options = {
  title: 'Common/Table/TableHead',
  component: TableHead
};

export default options;

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: theme.palette.common.white,
    '& .MuiTableCell-head, & .MuiTableCell-head span': {
      border: 'none',
      ...theme.typography.subtitle2,
      color: theme.palette.primary.main
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

const Template = () => {
  const classes = useStyles();

  const headCells = [
    { id: 'address', label: 'Address' },
    { id: 'city', label: 'City' },
    { id: 'state', label: 'State / Province' },
    { id: 'zip', label: 'Post Code' },
    { id: 'country', label: 'Country' },
    { id: 'geocode', label: 'Geocode', align: 'right' }
  ];

  return (
    <TableContainer>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.align || 'left'}
                padding={headCell.disablePadding ? 'none' : 'default'}
              >
                {headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

const TemplateSorting = () => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('address');

  const headCells = [
    { id: 'address', label: 'Address' },
    { id: 'city', label: 'City' },
    { id: 'state', label: 'State / Province' },
    { id: 'zip', label: 'Post Code' },
    { id: 'country', label: 'Country' },
    { id: 'geocode', label: 'Geocode', align: 'right' }
  ];

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.align || 'left'}
                padding={headCell.disablePadding ? 'none' : 'default'}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => handleRequestSort(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

const TemplateSelecting = () => {
  const classes = useStyles();
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const rowCount = rows.length;
  const numSelected = 2;

  const headCells = [
    { id: 'address', label: 'Address' },
    { id: 'city', label: 'City' },
    { id: 'state', label: 'State / Province' },
    { id: 'zip', label: 'Post Code' },
    { id: 'country', label: 'Country' },
    { id: 'geocode', label: 'Geocode', align: 'right' }
  ];

  const handleSelectAllClick = (event) => {
    // ...
  };

  return (
    <TableContainer>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell padding='checkbox'>
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={handleSelectAllClick}
                inputProps={{ 'aria-label': 'select all rows' }}
              />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.align || 'left'}
                padding={headCell.disablePadding ? 'none' : 'default'}
              >
                {headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export const Default = Template.bind({});
export const Sorting = TemplateSorting.bind({});
export const Selecting = TemplateSelecting.bind({});
