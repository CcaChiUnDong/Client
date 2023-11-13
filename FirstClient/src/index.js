import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux'; // createStore와 compose를 가져와야 함
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import reducer from './reducers';

// Redux DevTools 확장 기능 활성화
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Redux 미들웨어를 적용한 createStore
// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk);

// const store = createStore(
//   reducer,
//   composeEnhancers(createStoreWithMiddleware)
// );

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
