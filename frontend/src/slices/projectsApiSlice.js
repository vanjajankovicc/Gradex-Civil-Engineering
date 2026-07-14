import { apiSlice } from './apiSlice';
import { PROJECTS_URL } from '../constants';

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjekti: builder.query({
      query: () => ({ url: PROJECTS_URL }),
      providesTags: ['Project'],
      keepUnusedDataFor: 5,
    }),
    getProjekat: builder.query({
      query: (id) => ({ url: `${PROJECTS_URL}/${id}` }),
      providesTags: (result, error, id) => [{ type: 'Project', id }],
    }),
    kreirajProjekat: builder.mutation({
      query: (podaci) => ({
        url: PROJECTS_URL,
        method: 'POST',
        body: podaci,
      }),
      invalidatesTags: ['Project'],
    }),
    izmeniProjekat: builder.mutation({
      query: ({ id, ...podaci }) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: 'PUT',
        body: podaci,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }],
    }),
    obrisiProjekat: builder.mutation({
      query: (id) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  useGetProjektiQuery,
  useGetProjekatQuery,
  useKreirajProjekatMutation,
  useIzmeniProjekatMutation,
  useObrisiProjekatMutation,
} = projectsApiSlice;
