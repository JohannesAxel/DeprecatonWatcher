import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#52b69a',
    },
    secondary: {
      main: '#1a759f',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
