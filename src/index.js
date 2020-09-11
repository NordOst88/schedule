import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app/app';
import ErrorBoundary from './components/error-boundary/error-boundary';

import store from './store';

// import SwaggerService from './services/swagger-service';

// const api = new SwaggerService();

// const obj = {};

// todo: add events on back-end
// obj.data.forEach(async (el) => {
//   console.log(el);
//   await api.addEvent(el);
// });

// todo: clear all events on back-end
// console.log(obj);
// async function clearStore() {
//   const allEv = await api.getAllEvents();
//   console.log(allEv);
//   allEv.forEach((el) => api.deleteEventById(el.id));
// }
// clearStore();

// todo: only for extension redux devtool. Delete before deploy

render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
);
