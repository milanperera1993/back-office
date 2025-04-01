import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../utils/url";
import { Product } from "../../types/common";

const baseQuerty =  fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/products`,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
})

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQuerty,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({
      query: () => "/",
      providesTags: ["Products"],
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: ({id, ...rest}) => ({
        url: `/${id}`,
        method: "PUT",
        body: rest,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Products"],
    }),
    fetchProductById: builder.query<Product, number>({
      query: (id) => `/${id}`,
      providesTags: ["Products"],
    })
  }),
  
})

export const { useFetchProductsQuery, useUpdateProductMutation, useFetchProductByIdQuery } = productsApi;
export default productsApi;
