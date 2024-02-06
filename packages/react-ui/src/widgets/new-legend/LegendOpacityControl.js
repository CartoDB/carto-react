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
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM17.625 19V17.625H19V15.375H17.625V13.125H19V10.875H17.625V8.625H19V6.375H17.625V5H15.375V6.375H13.125V5H10.875V6.375H8.625V5H6.375V6.375H5V8.625H6.375V10.875H5V13.125H6.375V15.375H5V17.625H6.375V19H8.625V17.625H10.875V19H13.125V17.625H15.375V19H17.625ZM15.375 15.375H17.625V17.625H15.375V15.375ZM13.125 15.375H15.375V13.125H17.625V10.875H15.375V8.625H17.625V6.375H15.375V8.625H13.125V6.375H10.875V8.625H8.625V6.375H6.375V8.625H8.625V10.875H6.375V13.125H8.625V15.375H6.375V17.625H8.625V15.375H10.875V17.625H13.125V15.375ZM13.125 13.125H15.375V10.875H13.125V8.625H10.875V10.875H8.625V13.125H10.875V15.375H13.125V13.125ZM13.125 13.125H10.875V10.875H13.125V13.125Z'
            />
          </svg>
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
