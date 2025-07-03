import CrudManager from '../Components/CrudManager';
import { billFields, billColumns } from '../Schemas/BillSchema';
import { createLocalCrudAPI } from '../api/localCrudApi';

export interface Bill {
  id: string;
  clientName: string;
  amount: string;
  currency: string;
  billDate: string;
}

const billsAPI = createLocalCrudAPI<Bill>('bills');

const Bills = () => (
  <CrudManager title="Bills" fields={billFields} columns={billColumns} api={billsAPI} />
);

export default Bills;
