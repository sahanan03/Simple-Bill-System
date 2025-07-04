import CurrencyConverter from '../Components/currencyConverter';

const Dashboard = () => {
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
  <h1 className="text-3xl font-bold mb-6">🏡 Welcome to the Billing Dashboard</h1>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
    <div className="bg-white rounded-xl shadow-md p-4 text-center">
      <h2 className="text-lg font-semibold text-gray-600">Total Clients</h2>
      <p className="text-2xl font-bold text-indigo-600">12</p>
    </div>
    <div className="bg-white rounded-xl shadow-md p-4 text-center">
      <h2 className="text-lg font-semibold text-gray-600">Total Bills</h2>
      <p className="text-2xl font-bold text-purple-600">34</p>
    </div>
    <div className="bg-white rounded-xl shadow-md p-4 text-center">
      <h2 className="text-lg font-semibold text-gray-600">Total Payments</h2>
      <p className="text-2xl font-bold text-pink-600">₹82,300</p>
    </div>
  </div>

  <div className="flex justify-center">
    <div className="w-full max-w-xl">
      <CurrencyConverter />
    </div>
  </div>
</div>

  );
};

export default Dashboard;
