import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import categoriesApi from "./categories/categoriesApi";
import productsApi from "./products/productsApi";
import productReducer from "./products/productSlice"; // persistent product slice

export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/REGISTER",
          "persist/PURGE",
        ],
      },
    }).concat(categoriesApi.middleware, productsApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;