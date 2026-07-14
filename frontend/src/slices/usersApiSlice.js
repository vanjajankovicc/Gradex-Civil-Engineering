import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    prijava: builder.mutation({
      query: (podaci) => ({
        url: `${USERS_URL}/prijava`,
        method: 'POST',
        body: podaci,
      }),
    }),
    registracija: builder.mutation({
      query: (podaci) => ({
        url: `${USERS_URL}/registracija`,
        method: 'POST',
        body: podaci,
      }),
    }),
    profil: builder.query({
      query: () => ({
        url: `${USERS_URL}/profil`,
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  usePrijavaMutation,
  useRegistracijaMutation,
  useProfilQuery,
} = usersApiSlice;
