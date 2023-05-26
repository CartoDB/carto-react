import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled
} from '@mui/material';
import TableSkeletonRow from './TableSkeletonRow';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  overflow: 'hidden'
}));

const TableSkeleton = ({ style }) => {
  return (
    <StyledTableContainer style={style}>
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
              <TableSkeletonRow rowNumber={i} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default TableSkeleton;
