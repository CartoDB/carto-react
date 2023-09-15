import React from 'react';
import TableWidgetUI from '../../../src/widgets/TableWidgetUI/TableWidgetUI';
import { Box, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { columns, rows } from '../../../src/widgets/TableWidgetUI/mockData';
import Typography from '../../../src/components/atoms/Typography';
import LoadingTemplateWithSwitch from './LoadingTemplateWithSwitch';

const options = {
  title: 'Widgets/TableWidgetUI',
  component: TableWidgetUI,
  argTypes: {},
  parameters: {
    docs: {
      source: {
        type: 'auto'
      }
    }
  }
};
export default options;

const Template = (args) => {
  return <TableWidgetUI {...args} />;
};

const TableWidgetUiWithDefaults = (args) => {
  const theme = useTheme();
  return (
    <TableWidgetUI
      {...args}
      height={theme.spacing(36)}
      pagination={true}
      page={1}
      totalCount={rows.length}
      rowsPerPage={10}
    />
  );
};

const DefaultProps = { columns, rows };

export const Playground = Template.bind({});
Playground.args = {
  ...DefaultProps,
  rows: rows.slice(0, 5)
};

export const DenseLayout = Template.bind({});
DenseLayout.args = {
  ...DefaultProps,
  rows: rows.slice(0, 5),
  dense: true
};

export const Pagination = Template.bind({});
Pagination.args = {
  ...DefaultProps,
  rowsPerPage: 6,
  rows: rows.slice(0, 6),
  page: 1,
  pagination: true,
  rowsPerPageOptions: [4, 6, 8],
  totalCount: rows.length,
  lastPageTooltip: 'Custom text for the last page'
};

export const RowClick = Template.bind({});
RowClick.args = {
  ...DefaultProps,
  rows: rows.slice(0, 5),
  onRowClick: (row) => alert(row.address)
};

function CustomColumnComponent(value) {
  return (
    <Box display='flex' flexDirection='row' alignItems='center' justifyContent='flex-end'>
      <Typography variant='caption' color='textSecondary'>
        {value}
      </Typography>
      <Box ml={1}>
        <LocationOnIcon color='primary' />
      </Box>
    </Box>
  );
}

export const CustomComponent = Template.bind({});
CustomComponent.args = {
  ...DefaultProps,
  columns: columns.map((column) => {
    if (column.field === 'geocode') {
      return { ...column, component: CustomColumnComponent };
    } else {
      return column;
    }
  }),
  rows: rows.slice(0, 5)
};

const LoadingTemplate = LoadingTemplateWithSwitch(TableWidgetUiWithDefaults);

export const Loading = LoadingTemplate.bind({});
Loading.args = { ...DefaultProps, isLoading: true };

export const LoadingDense = LoadingTemplate.bind({});
LoadingDense.args = { ...DefaultProps, dense: true, isLoading: true };
