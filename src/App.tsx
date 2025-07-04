import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Clients from './Pages/Clients';
import Bills from './Pages/Bills';
import Payments from './Pages/Payment';
import Dashboard from './Pages/Dashboard';
import AppLayout from './AppLayout';
import Layout from './Components/Layout';


function App() {
  const isAuthenticated = localStorage.getItem('auth');

  return (
    <div className='min-h-screen overflow-auto bg-gray-50'>
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/payments" element={<Payments />} />
      </Route>
    </Routes>
    </Router>
    </div>
  );
}

export default App;
