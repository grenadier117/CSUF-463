import { PaletteMode } from '@mui/material';
import { amber, grey } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: '#000',
            secondary: grey[500],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#FFFFFF',
          },
          secondary: {
            main: '#595959',
          },
          background: {
            paper: '#404040',
            default: '#FF0000',
          },
          action: {
            active: '#FFF',
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
    typography: {
      body1: {
        fontSize: '12px',
      },
      body2: {
        fontSize: '12px',
      },
    },
  },
});
