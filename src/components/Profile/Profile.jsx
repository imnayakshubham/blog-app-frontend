import { Button, Card, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { AsyncStates } from '../../constants';
import EditProfile from './EditProfile';
import "./profile.css";
import ViewProfile from './ViewProfile';

const { Title } = Typography;

const Profile = () => {
  const { loginResponse: userInfo, updateProfileStatus } = useSelector((state) => state.login);
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    updateProfileStatus === AsyncStates.SUCCESS && setEditProfile(false);
  }, [updateProfileStatus])


  return (
    <Space style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "84vh" }}>
      <Card title={<Title level={4} style={{ wordBreak: "break-all", width: 100 }} width={200}>{`Welcome ${userInfo.user_name}`} </Title>}
        className='profile-card-container'
        extra={<Button type='text' onClick={() => setEditProfile((prev) => !prev)}> {editProfile ? `View Profile` : `Edit Profile`}</Button>}
        style={{ borderRadius: "12px", boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px" }}>
        {
          !editProfile ? <ViewProfile /> : <EditProfile setEditProfile={setEditProfile} />
        }
      </Card>
    </Space>
  )
}
export default Profile;