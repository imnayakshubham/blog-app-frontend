import { Alert, Button, Card, Form, Input, Row, Space, Typography } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import React from 'react'
// import { register } from "../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { AsyncStates } from '../../constants';
import { signupRequest } from '../../store/actions/login';
import "./Signup.css"
const { Text } = Typography;

const Signup = () => {
    const { signupErrorMessage, signupStatus } = useSelector(state => state.login);
    const [signupForm] = useForm()
    const dispatch = useDispatch()


    const onFinish = async (values) => {
        await dispatch(signupRequest(values))
    };
    return (
        <>
            <Space style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "84vh", width: "100%" }}>
                <Card title={"Signup"} style={{ borderRadius: "12px", boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px" }} className="common-card">
                    <Row style={{ marginBottom: "1rem" }}>
                        {signupErrorMessage && <Alert message={signupErrorMessage} type="error" showIcon style={{ width: "100%" }} />}
                    </Row>
                    <Form
                        name="user_credentials"
                        onFinish={onFinish}
                        form={signupForm}
                        layout="vertical"
                    >
                        <Form.Item
                            name="user_name"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                            label="Username"
                        >
                            <Input placeholder="Enter User Name" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                            label="Email"
                        >
                            <Input type={"email"} placeholder="Enter Email Id" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            label="Password"
                            autoComplete="off"

                        >
                            <Input.Password type={"password"} placeholder="Enter Password" minLength={8} autoComplete="off"
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirm_password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                            label="Confirm Password"
                            autoComplete="off"


                        >
                            <Input.Password type={"password"} placeholder="Confirm Password" minLength={8}
                                autoComplete="off"
                            />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: "100%", borderRadius: "7.5px" }}
                                loading={signupStatus === AsyncStates.LOADING}>
                                Signup
                            </Button>
                        </Form.Item>
                    </Form>
                    <Text type="secondary">Don't have an account? <Link to="/login">Login</Link></Text>

                </Card>
            </Space>
        </>
    )
}
export default Signup;