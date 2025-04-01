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
  }),
})

export const { useFetchProductsQuery } = productsApi;
export default productsApi;
