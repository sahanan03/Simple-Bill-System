import CrudManager from '../Components/CrudManager';
import { billFields, billColumns } from '../Schemas/BillSchema';
import { useAddBillsMutation, useDeleteBillsMutation, useGetBillsQuery, useUpdateBillsMutation } from '../api/billApi';
;

export interface Bill {
  id: string;
  clientName: string;
  amount: string;
  currency: string;
  billDate: string;
}


const Bills = () => (
  <CrudManager title="Bills" fields={billFields} columns={billColumns} useGetQuery={useGetBillsQuery} useAddMutation ={useAddBillsMutation} useUpdateMutation={useUpdateBillsMutation} useDeleteMutation= {useDeleteBillsMutation} />
);

export default Bills;
