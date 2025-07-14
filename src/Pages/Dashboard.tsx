import { Modal } from 'antd';
import { useState } from 'react';
import CurrencyConverter from '../Components/currencyConverter';
import LiveCurrencyRates from '../Components/liveCurrencyRates';
import { useGetClientsQuery } from '../api/clientApi';
import { useGetBillsQuery } from '../api/billApi';
import { useGetPaymentsQuery } from '../api/paymentApi';

const Dashboard = () => {
  const { data: clients = [], isLoading: loadingClients } = useGetClientsQuery();
  const { data: bills = [], isLoading: loadingBills } = useGetBillsQuery();
  const { data: payments = [], isLoading: loadingPayments } = useGetPaymentsQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPayments = payments.reduce((sum: number, p: any) => sum + Number(p.amountPaid || 0), 0);

  return (
    <div className="p-6 bg-gradient-to-br from-slate-100 to-blue-50">
      <h1 className="text-3xl font-bold mb-6">🏡 Welcome to the Billing Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Clients</h2>
          <p className="text-2xl font-bold text-indigo-600">
            {loadingClients ? 'Loading...' : clients.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Bills</h2>
          <p className="text-2xl font-bold text-purple-600">
            {loadingBills ? 'Loading...' : bills.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Payments</h2>
          <p className="text-2xl font-bold text-pink-600">
            {loadingPayments ? 'Loading...' : totalPayments}
          </p>
        </div>
      </div>

      {/* Live Currency Rates */}
      <div className="max-w-4xl mx-auto w-full">
        <LiveCurrencyRates onOpenConverter={() => setIsModalOpen(true)} />
      </div>

      {/* Currency Converter Modal */}
      <Modal
        title="💱 Currency Converter"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={500}
      >
        <CurrencyConverter />
      </Modal>
    </div>
  );
};

export default Dashboard;
