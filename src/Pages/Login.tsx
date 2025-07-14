import { Button, Form, Input, Card, message} from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values: { email: string; password: string }) => {
  // Mock user credentials (later replace with real API call)
  const validEmail = 'admin@example.com';
  const validPassword = 'admin123';

  if (values.email === validEmail && values.password === validPassword) {
    localStorage.setItem('auth', 'true');
    localStorage.setItem('user', values.email); // optionally store user info
    navigate('/dashboard');
  } else {
    message.error('Invalid credentials');
  }
};

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card title="Login to Billing System" style={{ width: 300 }}>
        <Form onFinish={onFinish} layout="vertical">
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password /> 
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
                Login
            </Button>
            </Form>
      </Card>
    </div>
  );
};

export default Login;