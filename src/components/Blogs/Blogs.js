import { Avatar, Button, Card, Divider, List, Modal, notification, Tabs, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlogRequest, fetchBlogsRequest, updateLikeRequest } from '../../store/actions/blogs';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AsyncStates, blogCategoryOptions } from '../../constants';
import { DeleteOutlined, EditOutlined, HeartTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EditBlogModal from '../Blog/EditBlogModal';
import { Spinner } from '../Spinner/Spinner';
import "./Blogs.css"
const { Text } = Typography

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
                duration: 5,
            })
        }
    }

    return (
        <>
            <Card style={{ width: "100%", border: "none" }}
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
                    }}
                        items={["all", ...blogCategoryOptions].map((category, i) => {
                            return {
                                label: <Text style={{ maxWidth: "175px" }} ellipsis={{ tooltip: category }}> {category?.[0]?.toUpperCase() + category?.slice(1, category.length)}</Text>,
                                key: category,
                                tabKey: category
                            };
                        })}
                    >
                    </Tabs>
                }
            >

                {!blogs[tab.activeTab].length && fetchBlogsStatus === AsyncStates.LOADING ? <Spinner /> :

                    <InfiniteScroll
                        dataLength={blogs[tab.activeTab].length}
                        next={fetchData}
                        hasMore={blogs[tab.activeTab].length < total}
                        scrollableTarget="scrollableDiv"
                    >
                        <List
                            itemLayout="vertical"
                            className='articles'
                            dataSource={blogs?.[tab.activeTab].sort(function (a, b) {
                                return a.title.localeCompare(b.title, undefined, {
                                    numeric: true,
                                    sensitivity: 'base'
                                })
                            })}
                            renderItem={blog => (
                                <>
                                    <article className='blog__post'>
                                        {
                                            blog?.photo &&
                                            <img
                                                className='blog__image'
                                                loading={"lazy"}
                                                alt={blog?.title}
                                                src={blog?.photo}
                                            />
                                        }
                                        <div className="blog__details">
                                            <span><Tag color="magenta">{blog?.category}</Tag></span>
                                            <h2>{blog.title}</h2>
                                            <p>
                                                <span dangerouslySetInnerHTML={{ __html: `${blog.description.slice(0, 250).trim()}...` }}></span>
                                            </p>
                                            <div class="article__footer">
                                                <span class="blog__author"><Avatar src={blog?.posted_by?.pic} alt={blog?.posted_by?.user_name} /> {blog?.posted_by?.user_name}</span>
                                                <span class="blog__date">{new Date(blog.createdAt).toUTCString()}</span>
                                            </div>

                                            <Divider className='divider' />
                                            <div className='blog__actions'>
                                                <div className='blog___actions__container'>
                                                    <div className='blog__likes' onClick={() => handleLike(blog)}>
                                                        <Text strong>{blog?.likes?.length}</Text>
                                                        <HeartTwoTone className='like__icon' title={blog?.likes?.length} twoToneColor={blog.likes.includes(userInfo.id) ? "#eb2f96" : null} />
                                                    </div>
                                                    {userInfo?.id === blog?.posted_by?._id &&
                                                        <div>
                                                            <DeleteOutlined className='delete__icon' onClick={(e) => { setSelectedBlog(blog); setVisible(true); }} />
                                                            <Button className='edit_btn' onClick={(e) => { setSelectedBlog(blog); setEditModalVisible(true) }}
                                                                type="link" icon={<EditOutlined className='edit__icon' />}>{"Edit"}</Button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </>
                            )}
                        />
                    </InfiniteScroll>
                }
            </Card>
            <Modal
                title={<>Are you sure you want to Delete blog <Text strong>{selectedBlog?.title}?</Text></>}
                open={visible}
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