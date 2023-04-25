import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  Select,
  Tooltip,
  Typography
} from '@mui/material';

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
  argTypes: {
    maxWidth: {
      control: {
        type: 'number'
      }
    },
    maxHeight: {
      control: {
        type: 'number'
      }
    }
  },
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
    <TableContainer sx={{ maxWidth: '100%' }}>
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
                <FormControl sx={{ minWidth: 120 }} size='small'>
                  <Select
                    placeholder='Placeholder'
                    labelId='demo-select-small-label'
                    id='demo-select-small'
                    label='Age'
                  >
                    <MenuItem value='' selected>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
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

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {};

const ScrollTemplate = ({ maxHeight, maxWidth }) => (
  <Box sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxWidth, maxHeight }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
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
                <FormControl sx={{ minWidth: 120 }} size='small'>
                  <Select
                    placeholder='Placeholder'
                    labelId='demo-select-small-label'
                    id='demo-select-small'
                    label='Age'
                  >
                    <MenuItem value='' selected>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
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

export const Scroll = ScrollTemplate.bind(
  {},
  {
    maxHeight: 300,
    maxWidth: 440
  }
);
ScrollTemplate.args = {
  maxHeight: 300,
  maxWidth: 440
};
