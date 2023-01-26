import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./Sagas/rootSaga";
import authReducer from "./Reducers/authReducer";
import postsReducer from "./Reducers/postReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { authReducer, postsReducer },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
