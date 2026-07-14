import { apiSlice } from './apiSlice';
import { ADMIN_URL } from '../constants';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStatistika: builder.query({
      query: () => ({ url: `${ADMIN_URL}/statistika` }),
      providesTags: ['User', 'Project', 'Isplata'],
    }),
    getSviKorisnici: builder.query({
      query: () => ({ url: `${ADMIN_URL}/korisnici` }),
      providesTags: ['User'],
    }),
    promeniUlogu: builder.mutation({
      query: ({ id, role }) => ({
        url: `${ADMIN_URL}/korisnici/${id}/uloga`,
        method: 'PUT',
        body: { role },
      }),
      invalidatesTags: ['User'],
    }),
    obrisiKorisnika: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/korisnici/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetAdminStatistikaQuery,
  useGetSviKorisniciQuery,
  usePromeniUloguMutation,
  useObrisiKorisnikaMutation,
} = adminApiSlice;
