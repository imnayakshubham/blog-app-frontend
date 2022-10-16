import { Descriptions, Image } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import "./profile.css"

export default function ViewProfile() {
    const { loginResponse: userInfo } = useSelector((state) => state.login);

    return (
        <section className="profile-container">
            <div className="profile-card">
                <div className="card-image">
                    <Image src={userInfo.pic} alt={userInfo.user_name + "."} />
                </div>
                <div className="card-text">
                    <Descriptions title="Profile Info" size={"medium"} bordered className='desc'>
                        {userInfo?.user_name && <Descriptions.Item label="User Name">{userInfo.user_name}</Descriptions.Item>}
                        {userInfo?.email && <Descriptions.Item label="Email">{userInfo.email}</Descriptions.Item>}
                        {userInfo?.location && <Descriptions.Item label="Country">{userInfo?.location}</Descriptions.Item>}
                        {userInfo?.description && <Descriptions.Item label="Desc" span={3}>{
                            <div dangerouslySetInnerHTML={{ __html: userInfo.description }}></div>
                        }</Descriptions.Item>}
                    </Descriptions>
                </div>
            </div>
        </section>
    )
}
