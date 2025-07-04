import { Layout, Button, Typography, Space } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rates, setRates] = useState<any>({});
  const user = localStorage.getItem('user') || 'Guest';

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => res.json())
      .then(data => setRates(data.rates))
      .catch(console.error);
  }, []);

  const routeTitleMap: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/clients': 'Clients',
    '/bills': 'Bills',
    '/payments': 'Payments',
  };

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <AntHeader className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-3 flex justify-between items-center shadow-md">
      {/* Left: Logo and Route Title */}
      <Space direction="horizontal" className="text-white space-x-6">
        <Typography.Title level={4} style={{ color: 'white', margin: 0 }}>
          💼 My Billing System
        </Typography.Title>
        <span className="font-medium text-white/80">
          {routeTitleMap[location.pathname] || ''}
        </span>
      </Space>

      {/* Center: Live Currency (Optional) */}
      <div className="hidden md:block text-sm text-white font-medium animate-pulse">
        💱 1 USD = ₹{rates?.INR?.toFixed(2)} | د.إ{rates?.AED?.toFixed(2)}
      </div>

      {/* Right: User & Logout */}
      <Space size="middle">
        <span className="text-white font-medium">👩‍💼 {user}</span>
        <Button danger size="small" onClick={logout}>
          Logout
        </Button>
      </Space>
    </AntHeader>
  );
};

export default Header;
