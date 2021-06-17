import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';


//Set fake data
async function setData (){
  const developersResponse = await fetch("http://localhost:3000/Developers.json")
  .then(response => {
    return response.json();
  })
  
  const requestsResponse = await fetch("http://localhost:3000/Requests.json")
  .then(response => {
    return response.json();
  })
  
  const endpointsResponse =  await fetch("http://localhost:3000/Endpoints.json")
  .then(response => {
    return response.json();
  })

  const deprecationsResponse =  await fetch("http://localhost:3000/Deprecations.json")
  .then(response => {
    return response.json();
  })

  window.sessionStorage.setItem("developers", JSON.stringify(developersResponse))
  
  window.sessionStorage.setItem("requests", JSON.stringify(requestsResponse))
  
  window.sessionStorage.setItem("endpoints", JSON.stringify(endpointsResponse))

  window.sessionStorage.setItem("deprecations", JSON.stringify(deprecationsResponse))
}

setData()

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