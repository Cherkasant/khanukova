import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from './Reducers/authReducer';
import postsReducer from './Reducers/postReducer';
import profileReducer from './Reducers/profileReducer';
import { rootSaga } from './Sagas/rootSaga';
import resoursesReducer from './Reducers/ResoursesReducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { authReducer, postsReducer, profileReducer, resoursesReducer },
  middleware: [sagaMiddleware]
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
