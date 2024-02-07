import {
  Box,
  IconButton,
  InputAdornment,
  Popover,
  Slider,
  TextField,
  Tooltip
} from '@mui/material';
import { styles } from './LegendWidgetUI.styles';
import { useIntl } from 'react-intl';
import useImperativeIntl from '../../hooks/useImperativeIntl';
import OpacityIcon from '../../assets/icons/OpacityIcon';

/**
 * @param {object} props
 * @param {React.MutableRefObject} props.menuRef - Ref object for the menu anchor
 * @param {boolean} props.open - Open state of the popover
 * @param {(open: boolean) => void} props.toggleOpen - Callback function for open state change
 * @param {number} props.opacity - Opacity value
 * @param {(opacity: number) => void} props.onChange - Callback function for opacity change
 * @returns {React.ReactNode}
 */
export default function LegendOpacityControl({
  menuRef,
  open,
  toggleOpen,
  opacity,
  onChange
}) {
  const intl = useIntl();
  const intlConfig = useImperativeIntl(intl);

  function handleTextFieldChange(e) {
    const newOpacity = parseInt(e.target.value || '0');
    const clamped = Math.min(Math.max(newOpacity, 0), 100);
    onChange(clamped / 100);
  }

  return (
    <>
      <Tooltip title={intlConfig.formatMessage({ id: 'c4r.widgets.legend.opacity' })}>
        <IconButton
          size='small'
          color={open ? 'primary' : 'default'}
          onClick={() => toggleOpen(!open)}
        >
          <OpacityIcon />
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        onClose={() => toggleOpen(false)}
        anchorEl={menuRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        slotProps={{
          root: {
            sx: { transform: 'translate(-12px, 36px)' }
          }
        }}
      >
        <Box sx={styles.opacityControl}>
          <Slider
            value={opacity * 100}
            onChange={(_, v) => onChange(v / 100)}
            min={0}
            max={100}
            step={1}
          />
          <TextField
            size='small'
            type='number'
            value={Math.round(opacity * 100)}
            onChange={handleTextFieldChange}
            sx={styles.opacityInput}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              style: { appearance: 'textfield' },
              'data-testid': 'opacity-slider'
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' sx={{ margin: 0 }}>
                  {' '}
                  %
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Popover>
    </>
  );
}
