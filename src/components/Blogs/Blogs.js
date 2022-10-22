import { Avatar, Button, Card, Divider, Image, List, Modal, notification, Skeleton, Space, Tabs, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlogRequest, fetchBlogsRequest, updateLikeRequest } from '../../store/actions/blogs';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AsyncStates, blogCategoryOptions } from '../../constants';
import { DeleteOutlined, EditOutlined, HeartTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EditBlogModal from '../Blog/EditBlogModal';
const { Text, Title } = Typography

const Blogs = React.memo(() => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const { loginResponse: userInfo } = useSelector((state) => state.login);
    const { fetchBlogsStatus, deleteBlogStatus } = useSelector(state => state.blogs);
    const [visible, setVisible] = useState(false);
    const [editModalvisible, setEditModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState({
        all: 1,
        Fashion: 1,
        Technology: 1,
        Food: 1,
        Politics: 1,
        Sports: 1,
        Business: 1,
    });
    const [tab, setTab] = useState({
        activeTab: "all",
        visitedTabs: ["all"],
    });

    const [selectedBlog, setSelectedBlog] = useState(null);

    const { blogsData: { blogs = {}, total = 0 } } = useSelector(state => state.blogs);

    useEffect(() => {
        if ((!blogs[tab.activeTab].length)) {
            dispatch(fetchBlogsRequest({ pageNumber: 1 }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userInfo])

    const handleTabChange = (key) => {
        dispatch(fetchBlogsRequest(key !== "all" ? { category: key, pageNumber: currentPage[key] } : { pageNumber: currentPage[key] }))
        setTab((prev) => {
            return {
                ...prev,
                activeTab: key,
                visitedTabs: [...new Set([...prev.visitedTabs, key])]
            }
        })
    }

    const fetchData = () => {
        dispatch(fetchBlogsRequest(tab.activeTab !== "all" ? { category: tab.activeTab, pageNumber: currentPage[tab.activeTab] + 1 } : { pageNumber: currentPage[tab.activeTab] + 1 }))
        setCurrentPage((prev) => {
            return {
                ...prev,
                [tab.activeTab]: prev[tab.activeTab] + 1
            }
        })
    }

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

    const handleLike = (blog) => {
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
            <Card style={{ width: "100%", border: "none" }}
                loading={!blogs[tab.activeTab].length && fetchBlogsStatus === AsyncStates.LOADING}
                title={
                    <Tabs activeKey={tab.activeTab} onChange={(key) => {
                        if (tab.visitedTabs.includes(key)) {
                            setTab((prev) => {
                                return {
                                    ...prev,
                                    activeTab: key,
                                    visitedTabs: [...new Set([...prev.visitedTabs, key])]
                                }
                            })
                        } else {
                            handleTabChange(key)
                        }
                    }}>
                        {["all", ...blogCategoryOptions].map((category) => <Tabs.TabPane tabKey={category} key={category} tab={
                            <Text style={{ maxWidth: "175px" }} ellipsis={
                                { tooltip: category }
                            }>
                                {category?.[0]?.toUpperCase() + category?.slice(1, category.length)}</Text>
                        } />
                        )}
                    </Tabs>
                }
            >
                <InfiniteScroll
                    dataLength={blogs[tab.activeTab].length}
                    next={fetchData}
                    hasMore={blogs[tab.activeTab].length < total}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        itemLayout="vertical"
                        dataSource={blogs?.[tab.activeTab].sort(function (a, b) {
                            return a.title.localeCompare(b.title, undefined, {
                                numeric: true,
                                sensitivity: 'base'
                            })
                        })}
                        renderItem={blog => (
                            <List.Item
                                style={{ borderBottom: "1px solid #e8e8e8", margin: "10px", cursor: "pointer" }}
                                key={blog._id}
                                actions={[
                                    <Space style={{ display: "flex", justifyContent: "space-between", fontSize: 16 }} size="large">
                                        <Text strong style={{ cursor: "pointer", fontSize: 16 }} onClick={() => handleLike(blog)}>{blog?.likes?.length} <HeartTwoTone title={blog?.likes?.length} twoToneColor={blog.likes.includes(userInfo.id) ? "#eb2f96" : null} /></Text>
                                        <Divider type="vertical" />
                                        {userInfo?.id === blog?.posted_by?._id &&
                                            <Space style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                                                <DeleteOutlined onClick={(e) => { setSelectedBlog(blog); setVisible(true); }} />
                                                <Divider type="vertical" />
                                                <Button onClick={(e) => { setSelectedBlog(blog); setEditModalVisible(true) }}
                                                    type="link" icon={<EditOutlined />}>{"Edit"}</Button>
                                            </Space>
                                        }
                                    </Space>
                                ]}
                                extra={
                                    <>
                                        {
                                            blog?.photo &&
                                            <Image
                                                style={{ height: "200px", width: "100%" }}
                                                alt={blog?.title}
                                                src={blog?.photo}
                                            />
                                        }
                                    </>
                                }
                            >
                                <List.Item.Meta
                                    onClick={(e) => { e.preventDefault(); navigateTo(`/blog/${blog?._id}`, { state: blog }) }}
                                    avatar={<Avatar src={blog?.posted_by?.pic} />}
                                    title={<Title level={3}>{blog?.title}</Title>}
                                    description={<Space direction="vertical">
                                        <Tag color="magenta">{blog?.category}</Tag>
                                        <p>
                                            <span dangerouslySetInnerHTML={{ __html: `${blog.description.slice(0, 250).trim()}` }}></span>
                                            <Text strong>{blog.description?.length > 300 ? "Click here to Read More" : ""}</Text>
                                        </p>
                                    </Space>}
                                />
                            </List.Item>
                        )}
                        loader={<Skeleton avatar paragraph={{ rows: 2 }} active />}
                    />
                </InfiniteScroll>
            </Card>
            <Modal
                title={<>Are you sure you want to Delete blog <Text strong>{selectedBlog?.title}?</Text></>}
                visible={visible}
                onOk={() => handleDeleteBlogPost(selectedBlog)}
                onCancel={() => setVisible(false)}
                okText="Delete"
                okType="danger"
                cancelText="Cancel"
            />
            <EditBlogModal blog={selectedBlog} visible={editModalvisible} setVisible={setEditModalVisible} />
        </>
    )
})

export default Blogs