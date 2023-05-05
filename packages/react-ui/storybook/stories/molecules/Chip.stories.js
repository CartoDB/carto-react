import React from 'react';
import { Avatar, Chip, Grid, Tooltip } from '@mui/material';
import { FileUploadOutlined } from '@mui/icons-material';
import { Container, Header, Label } from '../../utils/storyStyles';

const options = {
  title: 'Molecules/Chip',
  component: Chip,
  argTypes: {
    avatar: {
      description: 'Avatar element. Type: `element`.'
    },
    clickable: {
      defaultValue: false,
      description:
        'If `true`, the chip will appear clickable, and will raise when pressed, even if the onClick prop is not defined. If false, the chip will not be clickable, even if onClick prop is defined. This can be used, for example, along with the component prop to indicate an anchor Chip is clickable.',
      control: {
        type: 'boolean'
      }
    },
    color: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'default']
      }
    },
    deleteIcon: {
      description:
        'Override the default delete icon element. Shown only if `onDelete` is set. Type: `element`.'
    },
    disabled: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    icon: {
      description: 'Icon element. Type: `element`.'
    },
    label: {
      defaultValue: 'Chip content',
      control: {
        type: 'text'
      }
    },
    onDelete: {
      description:
        'Callback function fired when the delete icon is clicked. If set, the delete icon will be shown.',
      defaultValue: null
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium']
      }
    },
    variant: {
      control: {
        type: 'select',
        options: ['filled', 'outlined']
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A28895'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const Template = ({ ...args }) => {
  return <Chip {...args} />;
};

const VariantsTemplate = ({ ...args }) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Filled'}</Label>
          <Chip {...args} />
        </Container>
      </Grid>

      <Grid item>
        <Container>
          <Label variant='body2'>{'Outlined'}</Label>
          <Chip {...args} variant='outlined' />
        </Container>
      </Grid>
    </Grid>
  );
};

const PrefixTemplate = ({ ...args }) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Primary'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} avatar={<Avatar>M</Avatar>} />
            </Grid>
            <Grid item>
              <Chip {...args} variant='outlined' avatar={<Avatar>M</Avatar>} />
            </Grid>
            <Grid item>
              <Chip {...args} avatar={<Avatar label='Avatar' src='/avatar.jpeg' />} />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                variant='outlined'
                avatar={<Avatar label='Avatar' src='/avatar.jpeg' />}
              />
            </Grid>
            <Grid item>
              <Chip {...args} icon={<FileUploadOutlined />} />
            </Grid>
            <Grid item>
              <Chip {...args} variant='outlined' icon={<FileUploadOutlined />} />
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <Grid item>
        <Container>
          <Label variant='body2'>{'Secondary'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='secondary' avatar={<Avatar>M</Avatar>} />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='secondary'
                variant='outlined'
                avatar={<Avatar>M</Avatar>}
              />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='secondary'
                avatar={<Avatar label='Avatar' src='/avatar.jpeg' />}
              />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='secondary'
                variant='outlined'
                avatar={<Avatar label='Avatar' src='/avatar.jpeg' />}
              />
            </Grid>
            <Grid item>
              <Chip {...args} color='secondary' icon={<FileUploadOutlined />} />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='secondary'
                variant='outlined'
                icon={<FileUploadOutlined />}
              />
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <Grid item>
        <Container>
          <Label variant='body2'>{'Default'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='default' avatar={<Avatar>M</Avatar>} />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='default'
                variant='outlined'
                avatar={<Avatar>M</Avatar>}
              />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='default'
                avatar={<Avatar label='Avatar' src='/avatar.jpeg' />}
              />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='default'
                variant='outlined'
                avatar={<Avatar label='Avatar' src='/avatar.jpeg' />}
              />
            </Grid>
            <Grid item>
              <Chip {...args} color='default' icon={<FileUploadOutlined />} />
            </Grid>
            <Grid item>
              <Chip
                {...args}
                color='default'
                variant='outlined'
                icon={<FileUploadOutlined />}
              />
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

const RemovableTemplate = ({ ...args }) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Primary'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} variant='outlined' />
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <Grid item>
        <Container>
          <Label variant='body2'>{'Secondary'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='secondary' />
            </Grid>
            <Grid item>
              <Chip {...args} color='secondary' variant='outlined' />
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <Grid item>
        <Container>
          <Label variant='body2'>{'Default'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='default' />
            </Grid>
            <Grid item>
              <Chip {...args} color='default' variant='outlined' />
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

const ColorsTemplate = ({ ...args }) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Primary'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} variant='outlined' />
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Secondary'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='secondary' />
            </Grid>
            <Grid item>
              <Chip {...args} color='secondary' variant='outlined' />
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Default'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='default' />
            </Grid>
            <Grid item>
              <Chip {...args} color='default' variant='outlined' />
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

const SizeTemplate = ({ ...args }) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Header variant='subtitle1'>{'Primary'}</Header>
        <Container>
          <Label variant='body2'>{'Default (hover icon)'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} variant='outlined' />
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Label variant='body2'>{'Clickable (hover chip)'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} clickable />
            </Grid>
            <Grid item>
              <Chip {...args} variant='outlined' clickable />
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Label variant='body2'>{'Disabled'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} disabled />
            </Grid>
            <Grid item>
              <Chip {...args} variant='outlined' disabled />
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <Grid item>
        <Header variant='subtitle1'>{'Secondary'}</Header>
        <Container>
          <Label variant='body2'>{'Default (hover icon)'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='secondary' />
            </Grid>
            <Grid item>
              <Chip {...args} color='secondary' variant='outlined' />
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Label variant='body2'>{'Clickable (hover chip)'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='secondary' clickable />
            </Grid>
            <Grid item>
              <Chip {...args} color='secondary' variant='outlined' clickable />
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Label variant='body2'>{'Disabled'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='secondary' disabled />
            </Grid>
            <Grid item>
              <Chip {...args} color='secondary' variant='outlined' disabled />
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <Grid item>
        <Header variant='subtitle1'>{'Default'}</Header>
        <Container>
          <Label variant='body2'>{'Default (hover icon)'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='default' />
            </Grid>
            <Grid item>
              <Chip {...args} color='default' variant='outlined' />
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Label variant='body2'>{'Clickable (hover chip)'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='default' clickable />
            </Grid>
            <Grid item>
              <Chip {...args} color='default' variant='outlined' clickable />
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Label variant='body2'>{'Disabled'}</Label>
          <Grid container item spacing={6}>
            <Grid item>
              <Chip {...args} color='default' disabled />
            </Grid>
            <Grid item>
              <Chip {...args} color='default' variant='outlined' disabled />
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

const BehaviorTemplate = ({ ...args }) => {
  const longLabel = 'felipegomezcases@cartodb.com';

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Container>
          <Label variant='body2'>{'Overflow'}</Label>
          <Grid container spacing={1}>
            <Grid item>
              <Chip
                {...args}
                label={longLabel}
                avatar={<Avatar>M</Avatar>}
                onDelete={() => {}}
              />
            </Grid>
            <Grid item>
              <Chip {...args} label={longLabel} avatar={<Avatar>M</Avatar>} />
            </Grid>
            <Grid item>
              <Chip {...args} label={longLabel} />
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <Grid item>
        <Container>
          <Label variant='body2'>{'Hover with Tooltip'}</Label>
          <Grid container spacing={1}>
            <Grid item>
              <Tooltip title={longLabel}>
                <Chip
                  {...args}
                  label={longLabel}
                  avatar={<Avatar>M</Avatar>}
                  onDelete={() => {}}
                  clickable
                />
              </Tooltip>
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <Grid item>
        <Container style={{ maxWidth: '600px' }}>
          <Label variant='body2'>{'Pairing (Grid 8px)'}</Label>
          <Grid container spacing={1}>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} />
            </Grid>
            <Grid item>
              <Chip {...args} />
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

const commonArgs = {
  label: 'Chip content'
};
const SizeArgs = {
  onDelete: () => {},
  avatar: <Avatar>M</Avatar>
};
const disabledControlsCommonArgTypes = {
  avatar: { table: { disable: true } },
  deleteIcon: { table: { disable: true } },
  icon: { table: { disable: true } },
  onDelete: { table: { disable: true } }
};
const disabledControlsSizeArgTypes = {
  ...disabledControlsCommonArgTypes,
  variant: { table: { disable: true } }
};

export const Playground = Template.bind({});
Playground.args = { ...commonArgs };

export const Variants = VariantsTemplate.bind({});
Variants.argTypes = disabledControlsCommonArgTypes;

export const Colors = ColorsTemplate.bind({});
Colors.args = { ...commonArgs };
Colors.argTypes = disabledControlsCommonArgTypes;

export const Prefix = PrefixTemplate.bind({});
Prefix.args = { ...commonArgs };
Prefix.argTypes = disabledControlsCommonArgTypes;

export const Removable = RemovableTemplate.bind({});
Removable.args = { onDelete: () => {} };
Removable.argTypes = disabledControlsCommonArgTypes;

export const Medium = SizeTemplate.bind({});
Medium.args = { ...commonArgs, ...SizeArgs };
Medium.argTypes = disabledControlsSizeArgTypes;

export const Small = SizeTemplate.bind({});
Small.args = { ...commonArgs, ...SizeArgs, size: 'small' };
Small.argTypes = disabledControlsSizeArgTypes;

export const Behavior = BehaviorTemplate.bind({});
Behavior.args = { ...commonArgs };
Behavior.argTypes = disabledControlsCommonArgTypes;
