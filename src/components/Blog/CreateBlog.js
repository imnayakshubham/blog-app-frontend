import { Button, Card, Form, Image, Input, Row, Select, Space, Spin, Typography, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addBlogRequest, updateBlogRequest } from '../../store/actions/blogs';
import { AsyncStates, blogCategoryOptions, cardCommonStyles } from '../../constants';
import axios from 'axios';

const { Text } = Typography

const CreateBlog = ({ from, blog, setVisible }) => {
    const [form] = useForm()
    const dispatch = useDispatch()
    const { updateBlogStatus, addBlogStatus } = useSelector((state) => state.blogs)
    const [imageUpload, setImageUpload] = useState(false)

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'],
            ['clean'],
        ],
    };

    useEffect(() => {
        if (blog) {
            form.setFieldsValue(blog)
        }
    }, [blog, form])

    const { Option } = Select;

    const onFinish = async (payload) => {
        if (payload?.photo !== blog?.photo) {
            setImageUpload(true)
            const imageFile = payload.photo.file.originFileObj
            const data = new FormData();
            data.append("file", imageFile);
            data.append("upload_preset", "blog-app");
            data.append("cloud_name", "nayak-shubham");
            const imageData = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data)
            if (imageData) {
                setImageUpload(false)
            }
            payload.photo = imageData.data.secure_url
        }
        if (from !== "edit") {
            dispatch(addBlogRequest(payload))
        } else {
            dispatch(updateBlogRequest({ ...blog, ...payload }))
        }
        setVisible(false)
    }

    return (
        <>
            <Spin spinning={false}>
                <Space style={{ display: "flex", justifyContent: "center", alignItems: "center", height: from !== "edit" ? "89vh" : null }}>
                    <Card title={<Text strong>{(blog) ? "Edit Blog" : "Create Blog"}</Text>} style={{ width: "500px", ...(!blog ? cardCommonStyles : {}) }} className="common-card">
                        <Row style={{ marginBottom: "1rem" }}>
                            {/* {errorInfo && <Alert message={errorInfo} type="error" showIcon style={{ width: "100%" }} />} */}
                        </Row>
                        <Form
                            name="blog"
                            onFinish={onFinish}
                            autoComplete="off"
                            form={form}
                            layout="vertical"
                        >
                            <Form.Item
                                name="title"
                                rules={[{ required: true, message: 'Please input your Title!' }]}
                                label="Title"
                            >
                                <Input type={"text"} placeholder="Title"
                                />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                rules={[{ required: true, message: 'Please input your Description!' }]}
                                label="Description"
                            >
                                <ReactQuill
                                    theme="snow"
                                    placeholder={"Enter Content"}
                                    modules={modules}
                                />

                            </Form.Item>

                            <Form.Item
                                name="tags"
                                label="Tags"
                            >
                                <Select mode="tags" style={{ width: '100%' }} placeholder="Add Tags">
                                    {/* {children} */}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="category"
                                rules={[{ required: true, message: 'Please input your Category!' }]}
                                label="Category"
                            >
                                <Select
                                    showSearch
                                    style={{ width: "100%" }}
                                    placeholder="Search Category"
                                    value={"Technology"}
                                >
                                    {blogCategoryOptions.map((option, index) => (
                                        <Option value={option || ""} key={index}>
                                            {option}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="photo"
                                label="Picture"
                                tooltip="Click on the icon/Image to upload"
                                rules={[{ required: true, message: 'Please input your Category!' }]}
                            >
                                <Upload
                                    maxCount={1}
                                    multiple={false}
                                    listType="picture"
                                    accept="image/*"
                                >
                                    <Button type='text' style={{ height: "100%", width: "100%", }}>{blog?.photo ? <Image preview={false} src={blog?.photo} style={{ width: "100%", height: "100%" }} /> : "Upload Image"} </Button>
                                </Upload>

                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: "100%", borderRadius: "7.5px" }} loading={addBlogStatus === AsyncStates.LOADING || updateBlogStatus === AsyncStates.LOADING || imageUpload}>
                                    Post A Blog
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Space>
            </Spin>
        </>
    )
}

export default CreateBlog