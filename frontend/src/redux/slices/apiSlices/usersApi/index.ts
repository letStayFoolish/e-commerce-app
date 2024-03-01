import { USERS_URL } from "../../../../constants";
import type { IUpdatedUser, IUser } from "../../../../types";
import { apiSlice } from "../index";
import { getUsersQuery } from "./types";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login: build.mutation<ResultType, QueryArg>
    loginApiSlice: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["User"], // clear the cache
    }),

    logoutApiSlice: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"], // clear the cache
    }),

    registerApiSlice: builder.mutation({
      query: (credentials) => ({
        url: USERS_URL,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["User"], // clear the cache
    }),

    profileApiSlice: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"], // clear the cache
    }),

    // Get All Users:
    getUsers: builder.query<getUsersQuery, { pageNumber: string }>({
      query: ({ pageNumber }) => ({
        url: USERS_URL,
        params: {
          pageNumber,
        },
      }),
      providesTags: ["User"], // if we do not do that, we need to reload after we delete user
      keepUnusedDataFor: 5,
    }),

    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"], // clear the cache
    }),

    getUserDetails: builder.query<IUser, string>({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      providesTags: ["User"], // if we do not do that, we need to reload after we delete user
      keepUnusedDataFor: 5,
    }),

    updateUser: builder.mutation<IUser, IUpdatedUser>({
      query: (data) => ({
        url: `${USERS_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginApiSliceMutation,
  useLogoutApiSliceMutation,
  useRegisterApiSliceMutation,
  useProfileApiSliceMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = usersApiSlice;
