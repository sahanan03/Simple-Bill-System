// AppLayout.tsx
import { Layout } from 'antd';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import { Outlet } from 'react-router-dom';

const { Content, Sider } = Layout;

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} className="bg-[#1f1f47] text-white">
        <Sidebar />
      </Sider>

      <Layout>
        <Header />
        <Content className="p-6 bg-gradient-to-br from-slate-100 to-blue-50">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
