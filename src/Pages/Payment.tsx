import CrudManager from '../Components/CrudManager';
import { paymentFields, paymentColumns } from '../Schemas/paymentschema';

import { useAddPaymentMutation, useDeletePaymentMutation, useGetPaymentsQuery, useUpdatePaymentMutation } from '../api/paymentApi';


export interface Payment {
  id: string;
  clientName: string;
  billId: string;
  amountPaid: string;
  status: string;
  paymentDate: string;
}


const Payments = () => (
  <CrudManager title="Payments" fields={paymentFields} columns={paymentColumns} useGetQuery={useGetPaymentsQuery}  useAddMutation = {useAddPaymentMutation} useUpdateMutation={useUpdatePaymentMutation} useDeleteMutation={useDeletePaymentMutation}/>
);

export default Payments;
