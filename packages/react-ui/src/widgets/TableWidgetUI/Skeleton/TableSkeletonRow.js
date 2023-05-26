import React from 'react';
import { Skeleton, TableCell } from '@mui/material';

const TableSkeletonRow = ({ width, rows = 4, rowNumber }) => {
  function getSkeletonSize(index) {
    const sizes = [72, 48, 96, 32, 64];
    let chosenIndex = index % sizes.length;

    return sizes[chosenIndex];
  }

  return [...Array(rows)].map((_, i) => (
    <TableCell key={i}>
      <Skeleton width={width || getSkeletonSize(rowNumber)} height={8} />
    </TableCell>
  ));
};

export default TableSkeletonRow;
