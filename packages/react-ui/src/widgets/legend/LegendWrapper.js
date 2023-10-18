import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Icon,
  Switch,
  ToggleButton,
  Tooltip,
  styled
} from '@mui/material';
import React, { createRef, useState } from 'react';
import LayerIcon from '../../assets/icons/LayerIcon';
import Typography from '../../components/atoms/Typography';
import OpacityControl from '../OpacityControl';
import Note from './Note';
import useImperativeIntl from '../../hooks/useImperativeIntl';

const Wrapper = styled(Box)(() => ({
  position: 'relative',
  maxWidth: '100%',
  padding: 0
}));

const LayerOptionsWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  marginTop: theme.spacing(2)
}));

export default function LegendWrapper({
  id,
  title,
  layerOptions,
  switchable = true,
  collapsible = true,
  collapsed = false,
  visible = true,
  hasChildren = true,
  note,
  attr,
  children,
  showOpacityControl,
  opacity,
  onChangeOpacity,
  onChangeVisibility,
  onChangeCollapsed
}) {
  const wrapper = createRef();
  const expanded = !collapsed;
  const [isLayerOptionsExpanded, setIsLayerOptionsExpanded] = useState(false);

  const intl = useImperativeIntl();

  const handleChangeOpacity = (newOpacity) => {
    if (onChangeOpacity) onChangeOpacity({ id, opacity: newOpacity });
  };

  const handleExpandClick = () => {
    if (collapsible && onChangeCollapsed)
      onChangeCollapsed({ id, collapsed: !collapsed });
  };

  const handleChangeVisibility = () => {
    if (onChangeVisibility) onChangeVisibility({ id, visible: !visible });
  };

  const handleToggleLayerOptions = () => {
    setIsLayerOptionsExpanded((oldState) => !oldState);
  };

  return (
    <Wrapper component='section' aria-label={title}>
      <Header
        title={title}
        switchable={switchable}
        visible={visible}
        expanded={expanded}
        collapsible={hasChildren && collapsible}
        onExpandClick={handleExpandClick}
        onChangeVisibility={handleChangeVisibility}
        layerOptionsEnabled={showOpacityControl || layerOptions.length > 0}
        onToggleLayerOptions={handleToggleLayerOptions}
        isLayerOptionsExpanded={isLayerOptionsExpanded}
      />
      {hasChildren && !!children && (
        <Collapse ref={wrapper} in={expanded} timeout='auto' unmountOnExit>
          <Box pt={1} pl={3} pr={2} pb={2}>
            <Grid container direction='column' spacing={1}>
              {attr && (
                <Typography xs mb={1} variant='caption'>
                  {intl.formatMessage({ id: 'c4r.widgets.legend.by' }, { attr })}
                </Typography>
              )}
              {children}
              <Collapse in={isLayerOptionsExpanded} timeout='auto' unmountOnExit>
                <LayerOptionsWrapper>
                  {showOpacityControl && (
                    <OpacityControl
                      opacity={opacity}
                      onChangeOpacity={handleChangeOpacity}
                    />
                  )}
                  {layerOptions}
                </LayerOptionsWrapper>
              </Collapse>
              <Note>{note}</Note>
            </Grid>
          </Box>
        </Collapse>
      )}
    </Wrapper>
  );
}

const GridHeader = styled(Grid)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '60px',
  padding: theme.spacing(1.25, 1.25, 1.25, 2.5)
}));

const ButtonHeader = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'collapsible'
})(({ theme, collapsible }) => ({
  padding: 0,
  flex: '1 1 auto',
  justifyContent: 'flex-start',
  cursor: collapsible ? 'pointer' : 'default',
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1)
  },
  '&:hover': {
    background: 'none'
  }
}));

const ParentIcon = ({ theme }) => ({
  display: 'block',
  fill: theme.palette.text.secondary
});

const MoreIconHeader = styled(ExpandMore)(({ theme }) => ParentIcon({ theme }));
const LessIconHeader = styled(ExpandLess)(({ theme }) => ParentIcon({ theme }));

function Header({
  title,
  switchable,
  visible,
  collapsible,
  expanded,
  onExpandClick,
  onChangeVisibility,
  layerOptionsEnabled,
  onToggleLayerOptions,
  isLayerOptionsExpanded
}) {
  const ExpandIcon = expanded ? LessIconHeader : MoreIconHeader;

  const intl = useImperativeIntl();

  return (
    <GridHeader container>
      <ButtonHeader
        collapsible={collapsible.toString()}
        startIcon={
          collapsible && (
            <Icon>
              <ExpandIcon />
            </Icon>
          )
        }
        onClick={onExpandClick}
      >
        <Typography variant='subtitle1'>{title}</Typography>
      </ButtonHeader>
      {!!layerOptionsEnabled && (
        <Tooltip title={intl.formatMessage({ id: 'c4r.widgets.legend.layerOptions' })}>
          <ToggleButton
            selected={isLayerOptionsExpanded}
            onClick={onToggleLayerOptions}
            value='check'
          >
            <LayerIcon />
          </ToggleButton>
        </Tooltip>
      )}
      {switchable && (
        <Tooltip
          title={intl.formatMessage({
            id: visible ? 'c4r.widgets.legend.showLayer' : 'c4r.widgets.legend.hideLayer'
          })}
        >
          <Switch checked={visible} onChange={onChangeVisibility} />
        </Tooltip>
      )}
    </GridHeader>
  );
}
