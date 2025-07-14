import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Clients from './Pages/Clients';
import Bills from './Pages/Bills';
import Payments from './Pages/Payment';
import Dashboard from './Pages/Dashboard';
import AppLayout from './AppLayout';

function App() {
  return (
    <div className='min-h-screen overflow-hidden bg-gray-50'>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="login" element={<Login />} />

          {/* Protected/App layout */}
          <Route path="/" element={<AppLayout />}>
            {/* Redirect “/” → “/dashboard” */}
            <Route index element={<Navigate to="dashboard" replace />} />

            {/* Nested, relative paths (no leading slash) */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="clients"   element={<Clients />} />
            <Route path="bills"     element={<Bills />} />
            <Route path="payments"  element={<Payments />} />
          </Route>

          {/* Catch‑all: redirect unknown paths to login or 404 */}
          <Route path="*" element={<Navigate to="login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
