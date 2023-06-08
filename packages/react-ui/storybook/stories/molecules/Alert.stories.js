import React from 'react';
import { Box, Button, Typography, capitalize, styled } from '@mui/material';
import { Standalone } from '../../utils/storyStyles';
import Alert from '../../../../react-ui/src/components/molecules/Alert';

const title = 'This is a title';
const inlineText = 'This is a Inline content alert';
const blockText =
  'This is a Block content alert. Use the Block content variant for alerts with a long paragraph, more than two lines, or a title and body text.';

const options = {
  title: 'Molecules/Alert',
  component: Alert,
  argTypes: {
    title: {
      control: {
        type: 'text'
      }
    },
    severity: {
      control: {
        type: 'select',
        options: ['info', 'success', 'warning', 'error']
      }
    },
    layout: {
      control: {
        type: 'select',
        options: ['inline', 'block']
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A36257'
    },
    status: {
      type: 'inDevelopment'
    }
  }
};
export default options;

const AlertPlaygroundTemplate = (args) => {
  return (
    <Standalone>
      <Alert {...args}>{blockText}</Alert>
    </Standalone>
  );
};

const Row = ({ title, description, children }) => (
  <Box display='flex' gap={3}>
    <Box sx={{ width: 180 }} flexShrink={0}>
      <Typography variant='body2'>{title}</Typography>
      {description && (
        <Typography variant='caption' color='textSecondary'>
          {description}
        </Typography>
      )}
    </Box>
    <Box display='flex' gap={1} width='100%'>
      {children}
    </Box>
  </Box>
);

const inlineProps = {
  layout: 'inline',
  children: inlineText
};

const blockProps = {
  layout: 'block',
  children: blockText
};

const singleAction = (
  <Button variant='outlined' size='small' color='inherit'>
    Action
  </Button>
);
const twoActions = (
  <>
    {singleAction}
    <Button size='small' color='inherit'>
      Action
    </Button>
  </>
);

const GreenDotIcon = styled('div')(({ theme }) => ({
  width: theme.spacing(1),
  height: theme.spacing(1),
  margin: theme.spacing(0.5),
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.main
}));

const LimitWidth = styled('div')(({ theme }) => ({
  width: 300
}));

const SeverityTemplate = (args) => {
  return (
    <Box display='flex' flexDirection='column' gap={3}>
      <Row
        title='Neutral'
        description={
          <div>
            <p>Default variant.</p>
            <p>Use to hightlight general information or actions that aren’t critical.</p>
            <p>Color for icons and buttons can be customized.</p>
          </div>
        }
      >
        <Box sx={{ width: '100%' }}>
          <Box mb={2}>
            <Alert
              {...args}
              layout='inline'
              severity='neutral'
              title='You haven’t published the lastest changes made.'
              icon={<GreenDotIcon />}
              action={
                <>
                  <Button size='small'>Open public map</Button>
                  <Button size='small' variant='contained'>
                    Publish updates
                  </Button>
                </>
              }
            >
              Last published 11 sec. ago
            </Alert>
          </Box>
          <LimitWidth>
            <Alert
              {...args}
              {...blockProps}
              severity='neutral'
              title={title}
              onClose={() => {}}
              action={singleAction}
            />
          </LimitWidth>
        </Box>
      </Row>
      {['info', 'success', 'warning', 'error'].map((severity) => (
        <Row key={severity} title={capitalize(severity)}>
          <LimitWidth>
            <Alert
              {...args}
              {...blockProps}
              severity={severity}
              title={title}
              action={singleAction}
              onClose={() => {}}
            />
          </LimitWidth>
        </Row>
      ))}
    </Box>
  );
};

const LayoutTemplate = (args) => {
  return (
    <Box display='flex' flexDirection='column' gap={3}>
      <Row
        title='Block content'
        description='Use the Block content variant for alerts with a long paragraph (more than two lines)'
      >
        <Alert {...args} {...blockProps} title={title} action={singleAction} />
        <div style={{ width: '100%' }} />
      </Row>

      <Row
        title='Inline'
        description='The Inline content alert is thought to save space vertically, use it with paragraphs with one or two lines or title and one line text.'
      >
        <Alert {...args} {...inlineProps} action={singleAction} />
        <Alert {...args} {...inlineProps} title={title} action={singleAction} />
      </Row>
    </Box>
  );
};

const TitleTemplate = (args) => {
  return (
    <Box display='flex' flexDirection='column' gap={3}>
      <Row title='Block content'>
        <Alert {...args} {...blockProps} title={title} />
        <Alert {...args} {...blockProps} />
      </Row>

      <Row title='Inline content'>
        <Alert {...args} {...inlineProps} title={title} />
        <Alert {...args} {...inlineProps} />
      </Row>
    </Box>
  );
};

const ActionsTemplate = (args) => {
  return (
    <Box display='flex' flexDirection='column' gap={3}>
      <Row title='Without actions'>
        <Alert {...args} {...inlineProps} />
        <Alert {...args} {...blockProps} title={title} />
      </Row>

      <Row title='Action'>
        <Alert {...args} {...inlineProps} action={singleAction} />
        <Alert {...args} {...blockProps} title={title} action={singleAction} />
      </Row>

      <Row title='Second action'>
        <Alert {...args} {...inlineProps} action={twoActions} />
        <Alert {...args} {...blockProps} title={title} action={twoActions} />
      </Row>
    </Box>
  );
};

const RemovableTemplate = (args) => {
  return (
    <Box display='flex' flexDirection='column' gap={3}>
      <Row title='Block content'>
        <Alert
          {...args}
          {...blockProps}
          title={title}
          onClose={() => {}}
          action={twoActions}
        />
        <Alert {...args} {...blockProps} title={title} onClose={() => {}} />
      </Row>

      <Row title='Inline content'>
        <Alert {...args} {...inlineProps} onClose={() => {}} action={twoActions} />
        <Alert {...args} {...inlineProps} onClose={() => {}} />
      </Row>
    </Box>
  );
};

export const Playground = AlertPlaygroundTemplate;
Playground.args = { title };

export const Severity = SeverityTemplate.bind({});

export const Layout = LayoutTemplate.bind({});

export const Title = TitleTemplate.bind({ title: 'popo' });

export const Actions = ActionsTemplate.bind({});

export const Removable = RemovableTemplate.bind({});
