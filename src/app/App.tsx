import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import './App.css';
import { theme } from './global-styles';
import { Routes } from './Routes';

export const store = configureAppStore();

console.info('@JAKE - store', store);

export const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </ThemeProvider>
  );
};
