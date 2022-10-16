import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Dropdown, Menu, Space, Typography } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { LogoutOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;


const Header = () => {

    const navigateTo = useNavigate()


    const dispatch = useDispatch();
    const { loginResponse: userInfo } = useSelector((state) => state.login);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigateTo("/")
    }

    const userrDetailMenu = (
        <Menu
            items={[
                {
                    key: 'profile',
                    label: (
                        <Button type="text" icon={<ProfileOutlined />} onClick={() => navigateTo("/profile")}>Profile</Button >
                    ),
                    style: { color: "black" }

                },
                {
                    key: 'logout',
                    label: (
                        <Button type="text" onClick={handleLogout} icon={<LogoutOutlined />}> Logout</Button>
                    ),
                },

            ]}
        />
    );

    const menu = (
        <Menu
            items={[
                {
                    key: 'login',
                    label: (
                        <Link to="/login">
                            <Text>Login</Text>
                        </Link>
                    ),
                },
                {
                    key: 'register',
                    label: (
                        <Link to="/signup">
                            <Text>Sign up</Text>
                        </Link>
                    ),
                },
            ]}
        />
    );

    return (
        <>
            <Space style={{ display: "flex", justifyContent: "space-between", padding: "1.5rem", height: "60px", width: "100%" }}>
                <div>
                    <Link to="/">
                        <Title level={4}>Blogs</Title>
                    </Link>
                </div>
                <div>
                    {
                        (userInfo.email) ?
                            <Space>
                                <Link to="/create">
                                    <Text>Create Post</Text>
                                </Link>
                                <Dropdown overlay={userrDetailMenu} placement="bottom" onClick={e => e.stopPropagation()}>
                                    <Link type="text" style={{ borderRadius: "24px" }} onClick={e => e.stopPropagation()}>{
                                        <Space>
                                            {
                                                !!userInfo?.pic ? <Avatar src={userInfo?.pic} />
                                                    : <Avatar><Title level={4}>{userInfo?.user_name?.[0]?.toUpperCase()}</Title></Avatar>
                                            }
                                            <Title level={4}>
                                                {userInfo?.displayName}
                                            </Title>
                                        </Space>}
                                    </Link>
                                </Dropdown>
                            </Space>
                            :
                            <Space>
                                <Dropdown overlay={menu} placement="bottom" >
                                    <Button type="text" icon={<UserOutlined />} onClick={e => e.stopPropagation()}>{"Welcome"}</Button>
                                </Dropdown>

                            </Space>
                    }
                </div>

            </Space>
        </>

    );
};

export default Header;
