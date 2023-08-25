import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fetchApi = createApi({
  reducerPath: "fetchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "tasks",
      providesTags: ["Todos"],
    }),
    createTask: builder.mutation({
      query: (title) => ({
        url: "tasks",
        method: "POST",
        body: { title },
        header: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTask: builder.mutation({
      query: ({ id }) => ({
        url: `tasks/${id}`,
        method: "DELETE",
        header: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTask: builder.mutation({
      query: ({ id, title }) => ({
        url: `tasks/${id}`,
        method: "PUT",
        body: {
          title,
        },
        header: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = fetchApi;
