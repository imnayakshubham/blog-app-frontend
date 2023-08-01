import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Dropdown, Space, Typography } from 'antd';
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

    const userDetailMenu = [
        {
            key: 'profile',
            label: <Button type="text" icon={<ProfileOutlined />} onClick={() => navigateTo("/profile")}>Profile</Button >,
            style: { color: "black" }
        },
        {
            key: 'logout',
            label: <Button type="text" onClick={handleLogout} icon={<LogoutOutlined />}> Logout</Button>,
        },
    ]

    const items = [
        {
            key: 'login',
            label: <>
                <Link to="/login">
                    <Text>Login</Text>
                </Link>
            </>
        },
        {
            key: 'register',
            label: <>
                <Link to="/signup">
                    <Text>Sign up</Text>
                </Link>
            </>
        },
    ]

    return (
        <>
            <header className="nav__bar">
                <div>
                    <Link to="/">
                        <Title level={4}>Blogs</Title>
                    </Link>
                </div>
                <div>
                    {
                        (userInfo.email) ?
                            <Space>
                                <Link to="/publish">
                                    <Text>Create Post</Text>
                                </Link>
                                <Dropdown menu={{ items: userDetailMenu }} placement="bottom" onClick={e => e.stopPropagation()}
                                    trigger={['click']}
                                >
                                    <Link type="text" style={{ borderRadius: "24px" }} onClick={e => e.stopPropagation()}>{
                                        <Space>
                                            {
                                                !!userInfo?.pic ? <Avatar src={userInfo?.pic} alt={userInfo?.displayName} />
                                                    : <Avatar alt={userInfo?.displayName}><Title level={4}>{userInfo?.user_name?.[0]?.toUpperCase()}</Title></Avatar>
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
                                <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
                                    <Button className="nav__options" type="text" icon={<UserOutlined />} onClick={e => e.stopPropagation()}>{"Welcome"}</Button>
                                </Dropdown>
                            </Space>
                    }
                </div>
            </header>
        </>
    );
};

export default Header;
