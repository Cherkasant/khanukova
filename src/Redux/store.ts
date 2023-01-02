import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./Sagas/rootSaga";
import authReducer from "./Reducers/authReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { authReducer },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
