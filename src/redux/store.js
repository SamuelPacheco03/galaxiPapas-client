import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import messagesReducer from "./reducers/messages";
import codeReducer from "./reducers/code";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer,
    code: codeReducer
  },
  // No es necesario agregar thunk manualmente
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
