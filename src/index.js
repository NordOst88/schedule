import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app/app';
import ErrorBoundary from './components/error-boundary/error-boundary';

import store from './store';

// todo: delete before deploy

// import SwaggerService from './services/swagger-service';

// const api = new SwaggerService();

// todo: add events on back-end
// api.writeBackend();

// todo: clear all events on back-end
// api.clearBackend();

render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
);
