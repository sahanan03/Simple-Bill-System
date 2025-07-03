import { Layout as AntLayout, Menu } from 'antd';
import { useLocation, Link} from 'react-router-dom';

const {Header, Content} = AntLayout;

const Layout = ({children}:{children:React.ReactNode}) =>{
    const location  = useLocation();

    return(
        <AntLayout>
            <Header>
                <Menu
                 theme='dark'
                 mode='horizontal'
                 selectedKeys={[location.pathname]} // to highlight the current page
                 items={[
                    { key: '/clients', label: <Link to="/clients">Clients</Link> },
                    { key: '/bills', label: <Link to="/bills">Bills</Link> },
                    { key: '/payments', label: <Link to="/payments">Payments</Link> },
                ]}/>
            </Header>

            <Content style={{ padding: '24px' , minHeight:'calc(100vh - 64px)' }}> 
                {children}
            </Content>
        </AntLayout>
    )

}
export default Layout;