import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { createBrowserHistory } from 'history';


export default function createStore(preloadedState) {
  // Create browser history object for tracking browser state
  const history = createBrowserHistory();

  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga);

  // Return our store and history
  return { store, history };
};
