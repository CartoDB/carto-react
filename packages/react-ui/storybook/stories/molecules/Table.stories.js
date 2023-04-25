import React from 'react';
import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  TableBody,
  Table
} from '@mui/material';
import SelectField from '../../../src/components/atoms/SelectField';

const rows = [
  { name: 'Test Data 1', type: 'string', mode: '', description: 'Test Data 1' },
  {
    name: 'very long text that should trigger the overflow style',
    type: 'string',
    mode: '',
    description: 'Test Data 2'
  },
  { name: 'Test Data 3', type: 'string', mode: '', description: 'Test Data 3' },
  {
    name: 'Test Data 4',
    type: 'string',
    mode: '',
    description: 'very long text that should trigger the overflow style'
  },
  { name: 'Test Data 5', type: 'string', mode: '', description: 'Test Data 5' }
];

const options = {
  title: 'Molecules/Table',
  component: Table,
  argTypes: {},
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/C4R-Components?node-id=1534-33541&t=EpJKKbIbCuhioYR9-0'
    },
    status: {
      type: 'validated'
    }
  }
};

export default options;

const PlaygroundTemplate = (args) => {
  return (
    <TableContainer>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Mode</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow hover key={index}>
              <TableCell component='th' scope='row'>
                {index + 1}
              </TableCell>
              <TableCell sx={{ maxWidth: 160 }}>
                {index === 1 ? (
                  <Tooltip title={row.name}>
                    <Typography variant='inherit' noWrap>
                      {row.name}
                    </Typography>
                  </Tooltip>
                ) : (
                  row.name
                )}
              </TableCell>
              <TableCell>
                <Chip size='small' color='default' label={row.type} />
              </TableCell>
              <TableCell>
                <SelectField
                  size='small'
                  placeholder='Placeholder'
                  items={[
                    { value: '1', label: 'One' },
                    { value: '2', label: 'Two' },
                    { value: '3', label: 'Three' }
                  ]}
                />
              </TableCell>
              <TableCell sx={{ maxWidth: 160 }}>
                {index === 3 ? (
                  <Tooltip title={row.description}>
                    <Typography variant='inherit' noWrap>
                      {row.description}
                    </Typography>
                  </Tooltip>
                ) : (
                  row.description
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ScrollTemplate = (args) => (
  <Box sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxWidth: 440, maxHeight: 300 }}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Mode</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...rows, ...rows, ...rows, ...rows].map((row, index) => (
            <TableRow hover key={index}>
              <TableCell component='th' scope='row'>
                {index + 1}
              </TableCell>
              <TableCell sx={{ maxWidth: 160 }}>
                {index % rows.length === 1 ? (
                  <Tooltip title={row.name}>
                    <Typography variant='inherit' noWrap>
                      {row.name}
                    </Typography>
                  </Tooltip>
                ) : (
                  row.name
                )}
              </TableCell>
              <TableCell>
                <Chip size='small' color='default' label={row.type} />
              </TableCell>
              <TableCell>
                <SelectField
                  size='small'
                  placeholder='Placeholder'
                  items={[
                    { value: '1', label: 'One' },
                    { value: '2', label: 'Two' },
                    { value: '3', label: 'Three' }
                  ]}
                />
              </TableCell>
              <TableCell sx={{ maxWidth: 160 }}>
                {index % rows.length === 3 ? (
                  <Tooltip title={row.description}>
                    <Typography variant='inherit' noWrap>
                      {row.description}
                    </Typography>
                  </Tooltip>
                ) : (
                  row.description
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {};

export const Scroll = ScrollTemplate.bind({});
ScrollTemplate.args = {};
