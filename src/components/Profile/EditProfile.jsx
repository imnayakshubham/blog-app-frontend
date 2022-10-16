import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import "./profile.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateProfileRequest } from '../../store/actions/login';
import { AsyncStates } from '../../constants';


export default function EditProfile({ setEditProfile }) {
    const { loginResponse: userInfo, updateProfileStatus } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const [editProfileForm] = Form.useForm();

    useEffect(() => {
        if (userInfo) {
            editProfileForm.setFieldsValue({
                user_name: userInfo.user_name,
                email: userInfo.email,
                location: userInfo.location,
                description: userInfo.description,
            })
        }

    }, [userInfo, editProfileForm])

    const onFinish = async (values) => {
        const { email, user_name, pic, location, description } = values;
        let payload = {}
        let imageData = {}
        if (pic) {
            const imageFile = pic.file.originFileObj
            const data = new FormData();
            data.append("file", imageFile);
            data.append("upload_preset", "blog-app");
            data.append("cloud_name", "nayak-shubham");

            imageData = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data)
        }

        if (!!Object.keys(imageData || {}).length) {
            payload = { ...payload, pic: imageData.data.secure_url }
        }
        if (email && email !== userInfo.email) {
            payload = { ...payload, email }
        }
        if (user_name && user_name !== userInfo.user_name) {
            payload = { ...payload, user_name }
        }
        if (location && location !== userInfo?.location) {
            payload = { ...payload, location }
        }
        if (description && description !== userInfo?.description) {
            payload = { ...payload, description }
        }

        if (!!Object.keys(payload || {}).length) {
            payload = { ...payload, id: userInfo.id }
            dispatch(updateProfileRequest(payload))
        }
    };





    return (
        <>
            <Form
                layout="vertical"
                form={editProfileForm}
                onFinish={onFinish}
            // onValuesChange={onFormLayoutChange}
            >
                <Form.Item label="Update Email" name={"email"}>
                    <Input type='email' />
                </Form.Item>
                <Form.Item label="Update Username" name={"user_name"}>
                    <Input type='text' />
                </Form.Item>
                <Form.Item label="Update Country" name={"location"}>
                    <Input type='text' />
                </Form.Item>

                <Form.Item
                    name="description"
                >
                    <ReactQuill
                        theme="snow"
                        placeholder={"Enter Description"}
                    />
                </Form.Item>
                <Form.Item label="Profile Picture" name={"pic"}>
                    <Upload
                        maxCount={1}
                        multiple={false}
                        listType="picture"
                        accept="image/*"
                    >
                        <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                    </Upload>

                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: "100%", borderRadius: "7.5px" }} loading={updateProfileStatus === AsyncStates.LOADING}>
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
