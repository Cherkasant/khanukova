import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from './Reducers/authReducer';
import postsReducer from './Reducers/postReducer';
import profileReducer from './Reducers/profileReducer';
import { rootSaga } from './Sagas/rootSaga';
import resoursesReducer from './Reducers/ResoursesReducer';
import calendarReducer from './Reducers/calendarReducer';
import commentReducer from './Reducers/commentReducer';
import statusApi from './Reducers/statusApi';
import chatReducer from './Reducers/chatReducer';
import notificationReducer from './Reducers/notificationReducer';
import slotReducer from './Reducers/slotReducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    authReducer,
    postsReducer,
    profileReducer,
    resoursesReducer,
    calendarReducer,
    commentReducer,
    statusApi,
    chatReducer,
    notificationReducer,
    slotReducer
  },
  middleware: [sagaMiddleware]
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
