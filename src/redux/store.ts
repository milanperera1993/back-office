import { configureStore } from "@reduxjs/toolkit";
import categoriesApi from "./categories/categoriesApi";
import productsApi from "./products/productsApi";

export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoriesApi.middleware, productsApi.middleware),
});
