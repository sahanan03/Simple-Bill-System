// src/api/paymentApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PaymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ['Payments'],
  endpoints: (builder) => ({
    getPayments: builder.query<any[], void>({
      query: () => 'payments',
      providesTags: ['Payments'],
    }),
    addPayment: builder.mutation<void, any>({
      query: (payment) => ({
        url: 'payments',
        method: 'POST',
        body: payment,
      }),
      invalidatesTags: ['Payments'],
    }),
    updatePayment: builder.mutation<void, { id: string; updatedData: any }>({
      query: ({ id, updatedData }) => ({
        url: `payments/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['Payments'],
    }),
   

    deletePayment: builder.mutation<void, string>({
      query: (id) => ({
        url: `payments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Payments'],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useAddPaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = PaymentApi;
