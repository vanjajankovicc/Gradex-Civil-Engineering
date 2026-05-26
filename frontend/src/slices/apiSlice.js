import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Project', 'Task', 'User'], // Tvoji entiteti umesto proizvoda i korpe
  endpoints: (builder) => ({}),
});