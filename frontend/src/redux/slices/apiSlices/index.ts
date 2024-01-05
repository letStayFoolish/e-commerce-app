// Typically, you should only have one API slice per base URL that your application needs to communicate with.
// For example, if your site fetches data from both /api/posts and /api/users,
// you would have a single API slice with /api/ as the base URL, and separate endpoint definitions for posts and users.
// This allows you to effectively take advantage of automated re-fetching by defining tag relationships across endpoints.

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../constants";

export const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"],
  endpoints: () => ({}),
});
