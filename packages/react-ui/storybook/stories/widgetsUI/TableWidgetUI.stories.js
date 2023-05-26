import React from 'react';
import TableWidgetUI from '../../../src/widgets/TableWidgetUI/TableWidgetUI';
import { Box, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { columns, rows } from '../../../src/widgets/TableWidgetUI/mockData';
import Typography from '../../../src/components/atoms/Typography';
import { Label, ThinContainer } from '../../utils/storyStyles';

const options = {
  title: 'Organisms/Widgets/TableWidgetUI',
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

const LoadingTemplate = (args) => {
  const theme = useTheme();

  return (
    <>
      <Label variant='body1' mb={3}>
        {'Limited width'}
      </Label>
      <ThinContainer>
        <TableWidgetUI {...args} />
      </ThinContainer>

      <Label variant='body1' mt={8} mb={3}>
        {'Limited height'}
      </Label>
      <TableWidgetUI {...args} height={theme.spacing(36)} />

      <Label variant='body1' mt={8} mb={3}>
        {'Responsive'}
      </Label>
      <TableWidgetUI {...args} />
    </>
  );
};

const DefaultProps = { columns, rows };

export const Playground = Template.bind({});
Playground.args = { ...DefaultProps, rows: rows.slice(0, 5) };

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
  page: 0,
  pagination: true,
  rowsPerPageOptions: [4, 6, 8],
  totalCount: rows.length
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

export const Loading = LoadingTemplate.bind({});
Loading.args = { ...DefaultProps, isLoading: true };
