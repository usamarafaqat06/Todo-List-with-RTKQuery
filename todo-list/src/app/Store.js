import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { fetchApi } from "./Todiapi";

const rootReducer = combineReducers({
  fetchApi: fetchApi.reducer,
});

const store = configureStore({
  reducer: rootReducer, // Add the api reducer

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchApi.middleware),
});

export default store;
