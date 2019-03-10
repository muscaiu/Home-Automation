import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Firebase, { FirebaseContext } from 'components/Firebase';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: '#f44336',
    },
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
