import { USERS_URL } from "../../../../constants";
import { IUser } from "../../../../types";
import { apiSlice } from "../index";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login: build.mutation<ResultType, QueryArg>
    login: builder.mutation<unknown, any>({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
