
import CrudManager from '../Components/CrudManager';
import { clientFields, clientColumns } from '../Schemas/ClientSchema';
import { createLocalCrudAPI } from '../api/localCrudApi';


export interface Client {
  id: string;
  name: string;
  email: string;
  currency: string;
}
const clientsAPI = createLocalCrudAPI<Client>('clients');


const Clients = () => (
  <CrudManager title="Clients" fields={clientFields} columns={clientColumns} api={clientsAPI} />
);

export default Clients;
