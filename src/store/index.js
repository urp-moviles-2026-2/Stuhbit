import { configureStore } from "@reduxjs/toolkit";
import scheduleReducer from "./scheduleSlice";

export const store = configureStore({
  reducer: {
    schedule: scheduleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true, // Garantiza que no haya avisos de valores no serializables
    }),
});