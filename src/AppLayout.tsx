// AppLayout.tsx
import { Layout } from 'antd';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import { Outlet } from 'react-router-dom';

const { Content, Sider } = Layout;

const AppLayout = () => {
  return (
    <Layout className="min-h-screen flex-row">
      {/* Sidebar */}
      <Sider width={220} className="!bg-[#1f1f47] text-white">
        <Sidebar />
      </Sider>

      {/* Main layout: Header + Content */}
      <Layout className="flex flex-col">
        <Header />
        <Content className="bg-gradient-to-br from-slate-100 to-blue-50 flex-grow px-6 py-8">
          <div className="w-full max-w-full lg:max-w-7xl mx-auto">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
