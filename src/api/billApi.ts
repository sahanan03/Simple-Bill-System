import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BillApi = createApi({
    reducerPath:'billApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000'}),
    tagTypes:['Bill'],
    endpoints:(builder)=>({
        getBills:builder.query<any[],void>({
            query:()=>'/bills',
            providesTags:['Bill']
        }),
        addBills:builder.mutation<void,any>({
            query:(newClient)=>({
                url:'/bills',
                method:'POST',
                body:newClient
            }),
            invalidatesTags:['Bill']   // dynamically refetches bills 
        }),
        updateBills: builder.mutation<void, { id: string; updatedData: any }>({
            query: ({ id, updatedData }) => ({
                url: `/bills/${id}`,
                method: 'PUT',
                body: updatedData,
            }),
            invalidatesTags: ['Bill'],
            }),
         deleteBills:builder.mutation<void,string>({
            query:(id) =>({
                url:`/bills/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Bill']
        })
    }),
})
export const {useGetBillsQuery,useAddBillsMutation,useUpdateBillsMutation,useDeleteBillsMutation} = BillApi;