import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Firebase, { FirebaseContext } from 'components/Firebase';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import lime from '@material-ui/core/colors/lime';

import "assets/css/material-dashboard-react.css?v=1.6.0";

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: lime
  },
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
