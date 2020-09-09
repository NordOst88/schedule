import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app/app';
import ErrorBoundary from './components/error-boundary/error-boundary';
import SwaggerService from './services/swagger-service';

import store from './store';

const api = new SwaggerService();

// todo: only for extension redux devtool. Delete before deploy

const result = api.getAllEvents();

console.log('+++', result, store.getState());

render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
);

// const obj = {
//   data: [
//     {
//       week: '0',
//       dateTime: '1599087906',
//       deadline: '1599188006',
//       name: 'Computer Science Basics',
//       description:
//         'Курс состоит из нескольких крупных модулей, каждый из которых содержит короткие видео и тесты. Задача тестов - проверить, насколько хорошо стала понятна тема. Тесты можно проходить неограниченное количество раз, более того, во многих из них есть пояснения к неправильным ответам. Этот курс максимально гибкий: нет deadlineов, нет возможности "завалить" тест, можно проходить обучение в удобное время в удобном месте.',
//       descriptionUrl: 'https://learn.epam.com/detailsPage?id=4b131384-7829-4204-a27b-21c538b41f88',
//       type: ['js task', 'optional'],
//       estimatedTime: '8h',
//       timeZone: '',
//       place: 'online',
//       links: [
//         { name: 'LearnJs', url: 'https://learnjs.ru' },
//         { name: 'GitHub', url: 'https://github.com' },
//       ],
//       comment:
//         'Курс проходится за полчаса кликами по кнопке Next и перебором вариантов ответа в тестах.',
//       organizer: ['1', '2'],
//     },
//     {
//       week: '0',
//       dateTime: '1599089906',
//       deadline: '1599188006',
//       name: 'Computer Science Basics',
//       description:
//         'Курс состоит из нескольких крупных модулей, каждый из которых содержит короткие видео и тесты. Задача тестов - проверить, насколько хорошо стала понятна тема. Тесты можно проходить неограниченное количество раз, более того, во многих из них есть пояснения к неправильным ответам. Этот курс максимально гибкий: нет deadlineов, нет возможности "завалить" тест, можно проходить обучение в удобное время в удобном месте.',
//       descriptionUrl: 'https://learn.epam.com/detailsPage?id=4b131384-7829-4204-a27b-21c538b41f88',
//       type: ['js task', 'optional'],
//       estimatedTime: '8h',
//       timeZone: '',
//       place: 'online',
//       links: [
//         { name: 'LearnJs', url: 'https://learnjs.ru' },
//         { name: 'GitHub', url: 'https://github.com' },
//       ],
//       comment:
//         'Курс проходится за полчаса кликами по кнопке Next и перебором вариантов ответа в тестах.',
//       organizer: ['1', '2'],
//     },
//     {
//       week: '0',
//       dateTime: '1599090906',
//       deadline: '1599188006',
//       name: 'Computer Science Basics',
//       description:
//         'Курс состоит из нескольких крупных модулей, каждый из которых содержит короткие видео и тесты. Задача тестов - проверить, насколько хорошо стала понятна тема. Тесты можно проходить неограниченное количество раз, более того, во многих из них есть пояснения к неправильным ответам. Этот курс максимально гибкий: нет deadlineов, нет возможности "завалить" тест, можно проходить обучение в удобное время в удобном месте.',
//       descriptionUrl: 'https://learn.epam.com/detailsPage?id=4b131384-7829-4204-a27b-21c538b41f88',
//       type: ['js task', 'optional'],
//       estimatedTime: '8h',
//       timeZone: '',
//       place: 'online',
//       links: ['1', '2'],
//       comment:
//         'Курс проходится за полчаса кликами по кнопке Next и перебором вариантов ответа в тестах.',
//       organizer: [
//         {
//           name: 'Vitali Shulha',
//           url: 'https://github.com/vitalliuss/',
//         },
//       ],
//     },
//   ],
// };

// todo: add events on back-end
// obj.data.forEach(async (el) => {
//   console.log(el);
//   await api.addEvent(el);
// });

// todo: clear all events on back-end
// async function clearStore() {
//   const allEv = await api.getAllEvents();
//   console.log(allEv);
//   allEv.forEach((el) => api.deleteEventById(el.id));
// }
// clearStore();
