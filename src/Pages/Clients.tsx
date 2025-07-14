
import CrudManager from '../Components/CrudManager';
import { clientFields, clientColumns } from '../Schemas/ClientSchema';
import { useAddClientsMutation, useDeleteClientsMutation, useGetClientsQuery, useUpdateClientMutation } from '../api/clientApi';



export interface Client{
  id: string;
  name: string;
  email: string;
  currency: string;
}




const Clients = () => {

  return (
      <CrudManager title="Clients" fields={clientFields} columns={clientColumns} useGetQuery={useGetClientsQuery} useAddMutation={useAddClientsMutation}  useUpdateMutation={useUpdateClientMutation} useDeleteMutation={useDeleteClientsMutation}/>
  )
};

export default Clients;
