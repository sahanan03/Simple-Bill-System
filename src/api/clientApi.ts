import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ClientApi = createApi({
    reducerPath:'clientApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000'}),
    tagTypes:['Client'],
    endpoints:(builder)=>({
        getClients:builder.query<any[],void>({
            query:()=>'/clients',
            providesTags:['Client']
        }),
        addClients:builder.mutation<void,any>({
            query:(newClient)=>({
                url:'/clients',
                method:'POST',
                body:newClient
            }),
            invalidatesTags:['Client']
        }),
        updateClient: builder.mutation<void, { id: string; updatedData: any }>({
            query: ({ id, updatedData }) => ({
                url: `/clients/${id}`,
                method: 'PUT',
                body: updatedData,
            }),
      invalidatesTags: ['Client'],
    }),
        deleteClients:builder.mutation<void,string>({
            query:(id) =>({
                url:`/clients/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Client']
        })
    }),
})
export const {useGetClientsQuery,useAddClientsMutation,useUpdateClientMutation,useDeleteClientsMutation} = ClientApi