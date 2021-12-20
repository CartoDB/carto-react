import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';

const options = {
  title: 'Common/Table/Table',
  component: Table
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

  const tableBodyCells = [
    {
      id: 'r1',
      address: 'Calle Ebro nº1',
      city: 'Sevilla',
      state: 'Sevilla',
      zip: '41013',
      country: 'Spain',
      geocode: '37.35559, -5.98317'
    },
    {
      id: 'r2',
      address: 'Calle Ebro nº1',
      city: 'Sevilla',
      state: 'Sevilla',
      zip: '41013',
      country: 'Spain',
      geocode: '37.35559, -5.98317'
    },
    {
      id: 'r3',
      address: 'Calle Ebro nº1',
      city: 'Sevilla',
      state: 'Sevilla',
      zip: '41013',
      country: 'Spain',
      geocode: '37.35559, -5.98317'
    }
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
        <TableBody>
          {tableBodyCells.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell>{row.zip}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell align='right'>{row.geocode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const Default = Template.bind({});

// NOTE: only for table body rows
// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// NOTE: only for table body rows
// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }
