import { USERS_URL } from "../../../../constants";
import { apiSlice } from "../index";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login: build.mutation<ResultType, QueryArg>
    loginApiSlice: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: { ...credentials },
      }),
    }),

    logoutApiSlice: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    registerApiSlice: builder.mutation({
      query: (credentials) => ({
        url: USERS_URL,
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useLoginApiSliceMutation,
  useLogoutApiSliceMutation,
  useRegisterApiSliceMutation,
} = usersApiSlice;
