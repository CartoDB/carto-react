import React from 'react';
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  styled
} from '@mui/material';
import TableSkeletonRow from './TableSkeletonRow';

const Pagination = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: theme.spacing(2),
  margin: 0,
  padding: theme.spacing(2, 1)
}));

const TableSkeleton = ({ style, dense, pagination }) => {
  return (
    <>
      <TableContainer style={style}>
        <Table aria-label='skeleton table' size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableSkeletonRow rows={1} width={8} />
              <TableSkeletonRow width={56} />
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(10)].map((_, i) => (
              <TableRow key={i}>
                <TableSkeletonRow rows={1} width={8} />
                <TableSkeletonRow index={i} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <Pagination>
          <Skeleton width={56} height={8} />
          <Box mr={1}>
            <Skeleton width={52} height={16} />
          </Box>
          <Skeleton width={60} height={8} />
          <Skeleton width={16} height={16} />
          <Skeleton width={16} height={16} />
        </Pagination>
      )}
    </>
  );
};

export default TableSkeleton;
