import CrudManager from '../Components/CrudManager';
import { paymentFields, paymentColumns } from '../Schemas/paymentschema';
import { createLocalCrudAPI } from '../api/localCrudApi';


export interface Payment {
  id: string;
  clientName: string;
  billId: string;
  amountPaid: string;
  status: string;
  paymentDate: string;
}
const paymentsAPI = createLocalCrudAPI<Payment>('payments');

const Payments = () => (
  <CrudManager title="Payments" fields={paymentFields} columns={paymentColumns} api={paymentsAPI} />
);

export default Payments;
