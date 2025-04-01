import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../utils/url";
import { CategoryResponse } from "../../types/common";

const baseQuerty =  fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/productCategories`,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
})

const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: baseQuerty,
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    fetchCategories: builder.query<CategoryResponse, void>({
      query: () => "/",
      providesTags: ["Categories"],
    }),
  }),
})

export const { useFetchCategoriesQuery } = categoriesApi;
export default categoriesApi;