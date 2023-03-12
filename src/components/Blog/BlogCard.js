import { DeleteOutlined, EditOutlined, HeartTwoTone } from '@ant-design/icons'
import { Avatar, Button, Card, Image, Modal, notification, Space, Tag, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AsyncStates } from '../../constants'
import { useNavigate } from 'react-router-dom';

import "./BlogCard.css"
import { deleteBlogRequest, updateLikeRequest } from '../../store/actions/blogs'
import EditBlogModal from './EditBlogModal'


const { Title, Text } = Typography

export const BlogCard = ({ blog }) => {
    const userInfo = useSelector((state) => state.login.loginResponse)
    const [visible, setVisible] = useState(false);
    const [editModalvisible, setEditModalVisible] = useState(false);

    const { fetchBlogsStatus, deleteBlogStatus } = useSelector(state => state.blogs);

    const dispatch = useDispatch();
    let navigateTo = useNavigate();

    useEffect(() => {
        if (AsyncStates.SUCCESS === deleteBlogStatus) {
            setVisible(false);
        }
    }, [dispatch, deleteBlogStatus])


    const handleDeleteBlogPost = async (blog) => {
        try {
            dispatch(deleteBlogRequest({ _id: blog._id, category: blog.category }));
        } catch (err) {
            console.log(err);
        }
    }



    const handleLike = () => {
        if (userInfo?.id) {
            dispatch(updateLikeRequest({ blogId: blog?._id, userId: userInfo?.id, category: blog?.category }));
        } else {
            notification.error({
                message: "Please login to like the post",
                description: <Button type='link' style={{ padding: 0 }} onClick={(e) =>
                    navigateTo("/login")
                }>
                    Login Here
                </Button >,
                duration: 3,
            })
        }
    }

    return (
        <>
            <Card style={{ margin: "0 16px 16px 0", cursor: "pointer" }} loading={AsyncStates.LOADING === fetchBlogsStatus}
                className="blog-card"
                title={
                    <Space level={4}>
                        <Avatar src={blog?.posted_by?.pic} />
                        <Text strong>{blog?.posted_by.user_name}</Text>
                    </Space>
                }
                cover={<>
                    {
                        blog?.photo &&
                        <Image
                            style={{ height: "200px", width: "100%" }}
                            alt={blog?.title}
                            src={blog?.photo}
                            preview={false}
                            loading={"lazy"}
                            onClick={(e) => { e.preventDefault(); navigateTo(`/blog/${blog?._id}`, { state: blog }) }}
                        />
                    }
                </>
                }

                extra={
                    <>
                        {
                            userInfo?.id === blog?.posted_by?._id &&
                            <Space style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                                <Button onClick={(e) => { setEditModalVisible(true) }}
                                    // history.push("/create", id)
                                    type="link" icon={<EditOutlined />}>{"Edit"}</Button>
                            </Space>
                        }
                    </>
                }
                actions={[
                    <Space style={{ display: "flex", justifyContent: "space-around" }}>
                        <Space onClick={(blog) => handleLike(blog)}>
                            <Text strong>{blog?.likes?.length} <HeartTwoTone title={blog?.likes?.length} twoToneColor={blog.likes.includes(userInfo.id) ? "#eb2f96" : null} /></Text>
                        </Space>
                        {userInfo?.id === blog?.posted_by?._id &&
                            <Space onClick={e => e.preventDefault()}>
                                <DeleteOutlined onClick={(e) => { setVisible(true); }} />
                            </Space>
                        }
                    </Space>
                ]}
            >
                <Meta style={{ width: 400 }}
                    title={
                        <Space direction="vertical">
                            <Tag color="magenta">{blog?.category}</Tag>
                            <Space>
                                <Title level={3}>{blog?.title}</Title>
                            </Space>
                        </Space>}
                    onClick={(e) => { e.preventDefault(); navigateTo(`/blog/${blog?._id}`, { state: blog }) }}
                />
            </Card>
            <Modal
                title={<>Are you sure you want to Delete blog <Text strong>{blog?.title}?</Text></>}
                open={visible}
                onOk={() => handleDeleteBlogPost(blog)}
                onCancel={() => setVisible(false)}
                okText="Delete"
                okType="danger"
                cancelText="Cancel"
            />
            <EditBlogModal blog={blog} visible={editModalvisible} setVisible={setEditModalVisible} />
        </ >
    )
}
