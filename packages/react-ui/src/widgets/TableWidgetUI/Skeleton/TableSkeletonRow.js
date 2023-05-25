import { Skeleton, TableCell } from '@mui/material';

const TableSkeletonRow = ({ width = 32, rows = 4 }) => {
  return [...Array(rows)].map((_, i) => (
    <TableCell key={i}>
      <Skeleton width={width} height={8} />
    </TableCell>
  ));
};

export default TableSkeletonRow;
