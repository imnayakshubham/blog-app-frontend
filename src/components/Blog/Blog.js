import { DeleteOutlined, EditOutlined, HeartTwoTone } from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Image, notification, Space, Tag, Typography } from 'antd';
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateLikeRequest } from '../../store/actions/blogs';
import EditBlogModal from './EditBlogModal';

const { Text } = Typography;

const Blog = () => {
    const [visible, setVisible] = useState(false);
    const { state: blog } = useLocation()
    const userInfo = useSelector((state) => state.login.loginResponse)
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const readTime = useMemo(() => Math.ceil(blog?.description?.replace(/(<([^>]+)>)/ig, ' ')?.trim()?.length / 200), [blog?.description])

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
            <Card loading={!Object.keys(blog).length} title={
                <Space level={4}>
                    <Avatar src={blog?.posted_by?.pic} />
                    <Text strong>{blog?.posted_by.user_name}</Text>
                </Space>
            } extra={
                <>
                    {userInfo?.id === blog?.posted_by?._id &&
                        <EditOutlined style={{ fontSize: "1.2rem", cursor: "pointer" }} onClick={() => setVisible(true)} />}
                </>
            } style={{ border: "none" }}
                cover={
                    <>
                        {
                            blog?.photo ?
                                <Image
                                    style={{ objectFit: "cover" }}
                                    alt={blog.title}
                                    src={blog?.photo}
                                    preview={false}
                                />
                                : "QAXXSS"
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
                <Space direction='vertical'>
                    <Text type='secondary'>{readTime} min read</Text>
                    <Tag color="magenta">{blog.category}</Tag>
                </Space>
                <div dangerouslySetInnerHTML={{ __html: blog.description }}></div>
            </Card>

            <Divider />
            <EditBlogModal visible={visible} setVisible={setVisible} blog={blog} />
        </>
    )
}


export default Blog