import { apiSlice } from './apiSlice';
import { ISPLATE_URL } from '../constants';

export const isplataApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIsplate: builder.query({
      query: () => ({ url: ISPLATE_URL }),
      providesTags: ['Isplata'],
    }),
    kreirajPaypalNarudzbinu: builder.mutation({
      query: (podaci) => ({
        url: `${ISPLATE_URL}/paypal/kreiraj-narudzbinu`,
        method: 'POST',
        body: podaci,
      }),
    }),
    potvrdiPaypalNarudzbinu: builder.mutation({
      query: (orderID) => ({
        url: `${ISPLATE_URL}/paypal/potvrdi-narudzbinu/${orderID}`,
        method: 'POST',
      }),
      invalidatesTags: ['Isplata'],
    }),
  }),
});

export const {
  useGetIsplateQuery,
  useKreirajPaypalNarudzbinuMutation,
  usePotvrdiPaypalNarudzbinuMutation,
} = isplataApiSlice;
