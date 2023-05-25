import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import TableSkeletonRow from './TableSkeletonRow';

const TableSkeleton = ({ style }) => {
  return (
    <TableContainer style={style}>
      <Table aria-label='skeleton table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableSkeletonRow width={56} />
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(10)].map((_, i) => (
            <TableRow key={i}>
              <TableSkeletonRow rows={1} width={8} />
              <TableSkeletonRow />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSkeleton;
