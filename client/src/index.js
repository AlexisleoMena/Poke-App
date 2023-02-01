import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";
import store from './redux/store';
import App from './App';
import './style/index.css';


ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-nyte84tlib6rbh3p.us.auth0.com"
      clientId="bza3F4T1b7jIL94d4tpSHL5hNVF8tH3A"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
);
