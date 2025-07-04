import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-60 bg-[#1f1f47] text-white flex flex-col">
    <h1 className="text-2xl font-semibold p-4 border-b border-white/20">
        Billing App
    </h1>
    <nav className="flex-1 p-4 space-y-4">
        <a href="/dashboard" className="block hover:bg-white/10 rounded p-2">Home</a>
        <a href="/clients" className="block hover:bg-white/10 rounded p-2">Clients</a>
        <a href="/bills" className="block hover:bg-white/10 rounded p-2">Bills</a>
        <a href="/payments" className="block hover:bg-white/10 rounded p-2">Payments</a>
    </nav>
</div>

  );
};

export default Sidebar;