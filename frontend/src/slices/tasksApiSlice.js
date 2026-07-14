import { apiSlice } from './apiSlice';
import { PROJECTS_URL } from '../constants';

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getZadaci: builder.query({
      query: (projekatId) => ({ url: `${PROJECTS_URL}/${projekatId}/zadaci` }),
      providesTags: ['Task'],
    }),
    kreirajZadatak: builder.mutation({
      query: ({ projekatId, ...podaci }) => ({
        url: `${PROJECTS_URL}/${projekatId}/zadaci`,
        method: 'POST',
        body: podaci,
      }),
      invalidatesTags: ['Task'],
    }),
    izmeniZadatak: builder.mutation({
      query: ({ id, ...podaci }) => ({
        url: `/api/zadaci/${id}`,
        method: 'PUT',
        body: podaci,
      }),
      invalidatesTags: ['Task'],
    }),
    obrisiZadatak: builder.mutation({
      query: (id) => ({
        url: `/api/zadaci/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetZadaciQuery,
  useKreirajZadatakMutation,
  useIzmeniZadatakMutation,
  useObrisiZadatakMutation,
} = tasksApiSlice;
