import { TablePaginationActionsProps as MuiTablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';

export type TablePaginationActionsProps = MuiTablePaginationActionsProps & {
  lastPageTooltip?: string;
};

declare const TablePaginationActions: (props: TablePaginationActionsProps) => JSX.Element;
export default TablePaginationActions;
