import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/common";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer } from "redux-persist";

interface ProductState {
  updatedProduct: Product | null;
}

const initialState: ProductState = {
  updatedProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setUpdatedProduct: (state, action) => {
      state.updatedProduct = action.payload;
    },
    clearUpdatedProduct: (state) => {
      state.updatedProduct = null;
    },
  },
});

export const { setUpdatedProduct, clearUpdatedProduct } = productSlice.actions;

const persistConfig = {
  key: "product",
  storage,
};

export default persistReducer(persistConfig, productSlice.reducer);