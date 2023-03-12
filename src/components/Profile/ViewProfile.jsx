import { Descriptions, Image } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import "./profile.css"

const labelStyle = { fontWeight: "bold", fontSize: "16px" }
export default function ViewProfile() {
    const { loginResponse: userInfo } = useSelector((state) => state.login);

    return (
        <section className="profile-container">
            <div className="profile-card">
                <div className="card-image">
                    <Image src={userInfo.pic} alt={userInfo.user_name + "."} loading={"lazy"} />
                </div>
                <div className="card-text">
                    <Descriptions title="Profile Info" size={"medium"} bordered className='desc'>
                        {userInfo?.user_name && <Descriptions.Item label="User Name" labelStyle={labelStyle}>{userInfo.user_name}</Descriptions.Item>}
                        {userInfo?.email && <Descriptions.Item label="Email" labelStyle={labelStyle}>{userInfo.email}</Descriptions.Item>}
                        {userInfo?.location && <Descriptions.Item label="Country" labelStyle={labelStyle}>{userInfo?.location}</Descriptions.Item>}
                        {userInfo?.description && <Descriptions.Item label="Desc" labelStyle={labelStyle} span={3}>{
                            <div dangerouslySetInnerHTML={{ __html: userInfo.description }}></div>
                        }</Descriptions.Item>}
                    </Descriptions>
                </div>
            </div>
        </section>
    )
}
