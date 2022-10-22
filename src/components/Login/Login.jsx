import { Alert, Button, Card, Form, Input, Row, Space, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { AsyncStates } from '../../constants';
import { loginRequest } from '../../store/actions/login';

const { Text } = Typography;


const Login = () => {
    const dispatch = useDispatch()
    const { loginErrorMessage, loginStatus } = useSelector(state => state.login);

    const onFinish = (payload) => {
        dispatch(loginRequest(payload))
    };

    return (
        <>
            <Space style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "84vh" }}>
                <Card title={"Login here"} style={{ borderRadius: "12px", width: 500, boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px" }} className="common-card">
                    <Row style={{ marginBottom: "1rem" }}>
                        {loginErrorMessage && <Alert message={loginErrorMessage} type="error" showIcon style={{ width: "100%" }} />}
                    </Row>
                    <Form
                        name="user_credentials"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            label="Email"
                        >
                            <Input type={"email"} placeholder="Enter Email Id" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            label="Password"
                        >
                            <Input.Password type={"password"} placeholder="Enter Password" />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: "100%", borderRadius: "7.5px" }} loading={loginStatus === AsyncStates.LOADING}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <Text type="secondary">Don't have an account? <Link to="/signup">Register</Link></Text>
                </Card>
            </Space>
        </>
    )
}

export default Login