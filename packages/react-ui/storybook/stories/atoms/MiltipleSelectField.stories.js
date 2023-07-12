import React, { useState } from 'react';
import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  styled
} from '@mui/material';
import Typography from '../../../src/components/atoms/Typography';
import MultipleSelectField from '../../../src/components/atoms/MultipleSelectField';
import { Container, Label } from '../../utils/storyStyles';

const options = {
  title: 'Atoms/Multiple Select Field',
  component: MultipleSelectField,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['outlined', 'filled', 'standard']
      }
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium']
      }
    },
    required: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    disabled: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    error: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    label: {
      control: {
        type: 'text'
      }
    },
    placeholder: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A29965'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const ChipWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'small'
})(({ theme, small }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  overflow: 'auto',
  height: theme.spacing(small ? 3 : 4)
}));

const menuItems = [
  {
    label: 'Ten: super large text with overflow',
    value: '10'
  },
  {
    label: 'Twenty',
    value: '20'
  },
  {
    label: 'Thirty',
    value: '30'
  }
];

const menuItemsLong = [
  {
    label: 'table_openstreetmap_pointsofinterest',
    value: '10Long'
  },
  {
    label: 'Twenty',
    value: '20'
  },
  {
    label: 'Thirty',
    value: '30'
  }
];

const MultipleSelectFieldItem = ({ label, required, placeholder, ...rest }) => {
  const [content, setContent] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setContent(
      // On autofill we get a stringified value
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <MultipleSelectField
      {...rest}
      label={label}
      placeholder={placeholder}
      items={menuItems}
      onChange={handleChange}
      value={content}
    />
  );
};

const PlaygroundTemplate = (args) => <MultipleSelectFieldItem {...args} />;

const MultipleTemplate = ({
  label,
  placeholder,
  defaultValue,
  helperText,
  size,
  ...rest
}) => {
  const [personName, setPersonName] = React.useState([]);
  const isSmall = size === 'small';

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Default (custom component)'}</Label>
          <MultipleSelectFieldItem
            {...rest}
            multiple
            size={size}
            label={label}
            placeholder={placeholder}
            items={menuItems}
          />
        </Container>
      </Grid>
      <Grid item xs={3}>
        <Container>
          <Label variant='body2'>{'Select (with custom chips)'}</Label>
          <Select
            {...rest}
            label={label}
            size={size}
            multiple
            displayEmpty
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography variant={isSmall ? 'body2' : 'body1'} color='text.hint'>
                    Placeholder
                  </Typography>
                );
              }

              return (
                <ChipWrapper small={isSmall}>
                  {selected.map((value) => (
                    <Chip size='inherit' color='default' key={value} label={value} />
                  ))}
                </ChipWrapper>
              );
            }}
          >
            {[...Array(10)].map((x, index) => (
              <MenuItem key={index} value={`Option item ${index + 1}`}>
                {`Option item ${index + 1}`}
              </MenuItem>
            ))}
          </Select>
        </Container>
      </Grid>
    </Grid>
  );
};

const commonArgs = {
  label: 'Label text',
  placeholder: 'Placeholder text',
  helperText: 'Helper text.'
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = { ...commonArgs };

export const MultipleSelection = MultipleTemplate.bind({});
MultipleSelection.args = { ...commonArgs };
