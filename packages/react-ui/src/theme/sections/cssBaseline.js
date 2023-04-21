import { getSpacing } from '../themeUtils';
import { commonPalette } from './palette';
import { themeTypography } from './typography';

export const CssBaseline = {
  // Custom scrollbars
  '*::-webkit-scrollbar': {
    position: 'fixed',
    width: '5px',
    height: '5px'
  },
  '*::-webkit-scrollbar-track': {
    boxShadow: 'none',
    background: 'transparent'
  },
  '*::-webkit-scrollbar-thumb': {
    borderRadius: '3px',
    background: commonPalette.action.focus,
    outline: 'none'
  },

  // iOS Search clear button
  'input[type="search"]::-webkit-search-cancel-button': {
    WebkitAppearance: 'none',
    appearance: 'none',
    height: getSpacing(2),
    width: getSpacing(2),
    display: 'block',
    backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAn0lEQVR42u3UMQrDMBBEUZ9WfQqDmm22EaTyjRMHAlM5K+Y7lb0wnUZPIKHlnutOa+25Z4D++MRBX98MD1V/trSppLKHqj9TTBWKcoUqffbUcbBBEhTjBOV4ja4l4OIAZThEOV6jHO8ARXD+gPPvKMABinGOrnu6gTNUawrcQKNCAQ7QeTxORzle3+sDfjJpPCqhJh7GixZq4rHcc9l5A9qZ+WeBhgEuAAAAAElFTkSuQmCC)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: getSpacing(2)
  },

  // Mapbox controls
  '.mapboxgl-ctrl.mapboxgl-ctrl-attrib': {
    padding: getSpacing(0, 1),
    borderRadius: getSpacing(0.5, 0, 0, 0),

    '& .mapboxgl-ctrl-attrib-inner': {
      ...themeTypography.overline,
      textTransform: 'none',
      letterSpacing: '0.75px',

      '& a': {
        color: commonPalette.primary.main
      }
    },

    '&.mapboxgl-compact': {
      backgroundColor: 'transparent',
      right: getSpacing(0.5),
      bottom: getSpacing(2.5),

      // Mobile
      '@media (max-width: 600px)': {
        bottom: getSpacing(0.5)
      },

      '& .mapboxgl-ctrl-attrib-button': {
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24'%20viewBox='0%200%2024%2024'%20width='24'%3E%3Cg%3E%3Crect%20fill='none'%20height='24'%20width='24'%20x='0'/%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cpath%20d='M11.88,9.14c1.28,0.06,1.61,1.15,1.63,1.66h1.79c-0.08-1.98-1.49-3.19-3.45-3.19C9.64,7.61,8,9,8,12.14%20c0,1.94,0.93,4.24,3.84,4.24c2.22,0,3.41-1.65,3.44-2.95h-1.79c-0.03,0.59-0.45,1.38-1.63,1.44C10.55,14.83,10,13.81,10,12.14%20C10,9.25,11.28,9.16,11.88,9.14z%20M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z%20M12,20c-4.41,0-8-3.59-8-8%20s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z'%20fill='${commonPalette.text.secondary}'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundColor: 'rgba(255,255,255,.8)',
        top: 'auto',
        bottom: 0,
        right: 0,

        '&:not(:disabled):hover': {
          backgroundColor: 'rgba(255,255,255,.8)'
        }
      },

      '& .mapboxgl-ctrl-attrib-inner': {
        backgroundColor: 'rgba(255,255,255,.8)',
        padding: getSpacing(0.5, 1),
        borderRadius: getSpacing(1.5),
        marginRight: getSpacing(2.5),
        color: commonPalette.text.secondary
      },

      '&.mapboxgl-compact-show': {
        '& .mapboxgl-ctrl-attrib-button': {
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24'%20viewBox='0%200%2024%2024'%20width='24'%3E%3Cpath%20d='M0%200h24v24H0z'%20fill='none'/%3E%3Cpath%20d='M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z'%20fill='white'/%3E%3C/svg%3E")`,
          backgroundColor: commonPalette.common.black,

          '&:not(:disabled):hover': {
            backgroundColor: commonPalette.common.black
          }
        }
      }
    }
  }
};
