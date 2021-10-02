import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import './app.css';
import { theme } from './global-styles';
import { Routes } from './routes';
import React from 'react';
import { StylesProvider } from '@mui/styles';

export const store = configureAppStore();

export const App = (): JSX.Element => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <React.StrictMode>
            <Routes />
          </React.StrictMode>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
};
