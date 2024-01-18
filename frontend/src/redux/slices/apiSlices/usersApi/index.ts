import { USERS_URL } from "../../../../constants";
import { apiSlice } from "../index";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useSetUserMutation } = usersApiSlice;
