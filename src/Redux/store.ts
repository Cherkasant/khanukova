import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./Sagas/rootSaga";
import authReducer from "./Reducers/authReducer";
import postsReducer from "./Reducers/postReducer";
import profileReducer from './Reducers/profileReducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { authReducer, postsReducer, profileReducer },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
