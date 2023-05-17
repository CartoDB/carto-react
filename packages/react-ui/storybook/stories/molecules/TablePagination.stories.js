import React, { useState } from 'react';
import {
  Box,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  TablePagination,
  TableFooter
} from '@mui/material';

function createData(name, calories, fat) {
  return { name, calories, fat };
}
const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  createData('KitKat', 518, 26.0)
];

const options = {
  title: 'Molecules/TablePagination',
  component: TablePagination,
  argTypes: {},
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/C4R-Components?node-id=1534-33541&t=EpJKKbIbCuhioYR9-0'
    },
    status: {
      type: 'readyToReview'
    }
  }
};

export default options;

const PlaygroundTemplate = (args) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

const TableExampleTemplate = (args) => {
  return (
    <Box>
      <TableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Fat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...rows].map((row, index) => (
              <TableRow hover key={index}>
                <TableCell component='th' scope='row'>
                  {index + 1}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={20}
                page={0}
                rowsPerPage={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {};

export const TableExample = TableExampleTemplate.bind({});
TableExample.args = {};
