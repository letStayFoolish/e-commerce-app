import { USERS_URL } from "../../../../constants";
import { apiSlice } from "../index";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login: build.mutation<ResultType, QueryArg>
    login: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: { ...credentials },
      }),
    }),

    logoutApi: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutApiMutation } = usersApiSlice;
