import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ExchangeRateResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>; // e.g., { INR: 85.93, EUR: 0.85 }
}

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.frankfurter.app' }),
  endpoints: (builder) => ({
    getLiveRates: builder.query<ExchangeRateResponse, string>({
      query: (base: string) => `/latest?base=${base}`,
    }),
  }),
});

export const { useGetLiveRatesQuery } = currencyApi;
