import React from 'react';
import { Skeleton, TableCell } from '@mui/material';

const TableSkeletonRow = ({ width, rows = 4 }) => {
  function getRandomSize() {
    const sizes = [32, 48, 64, 72, 96];
    return sizes[Math.floor(Math.random() * sizes.length)];
  }

  return [...Array(rows)].map((_, i) => (
    <TableCell key={i}>
      <Skeleton width={width || getRandomSize()} height={8} />
    </TableCell>
  ));
};

export default TableSkeletonRow;
