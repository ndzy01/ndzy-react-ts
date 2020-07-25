import { combineReducers, createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger';
import faviconReducer from './favicon';

const middlewares = [];
middlewares.push(promiseMiddleware);
if (process.env.NODE_ENV === 'development') {
  //创建中间件logger 并只在开发时使用
  const logger = createLogger({
    predicate: () => {
      return true;
    },
  });
  middlewares.push(logger);
}

const reducer = combineReducers({
  faviconReducer,
});
//  window.STATE_FROM_SERVER 可以有第二个参数,表示 State 的最初状态。这通常是服务器给出的。
const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
