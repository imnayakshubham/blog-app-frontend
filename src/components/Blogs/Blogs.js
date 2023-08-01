import { Avatar, Button, Card, Divider, Empty, Modal, notification, Tabs, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlogRequest, fetchBlogsRequest, updateLikeRequest } from '../../store/actions/blogs';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AsyncStates } from '../../constants';
import { DeleteOutlined, EditOutlined, HeartTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EditBlogModal from '../Blog/EditBlogModal';
import { Spinner } from '../Spinner/Spinner';
import "./Blogs.css"
import { fetchCategoriesRequest } from '../../store/actions/blogCategories';
const { Text } = Typography

const Blogs = React.memo(() => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const { loginResponse: userInfo } = useSelector((state) => state.login);
    const { blogsData: { blogs = {}, total = 0 }, fetchBlogsStatus, deleteBlogStatus } = useSelector(state => state.blogs);
    const { categoryList } = useSelector(state => state.blogCategories);


    const [visible, setVisible] = useState(false);
    const [editModalvisible, setEditModalVisible] = useState(false);

    const [currentPage, setCurrentPage] = useState({});
    const [tab, setTab] = useState({
        activeTab: "all",
        visitedTabs: ["all"],
    });

    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        setCurrentPage(categoryList.categories.reduce((acc, curr) => ({ ...acc, [curr.value]: 1 }), {}))
    }, [categoryList])


    useEffect(() => {
        dispatch(fetchCategoriesRequest())
    }, [dispatch])

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
            dispatch(updateLikeRequest({ blogId: blog?._id, userId: userInfo?.id, category: tab.activeTab, isAll: tab.activeTab === "all" }));
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

    function convertToHTML(content) {
        let html = '';

        content.forEach(block => {
            switch (block.type) {
                case 'paragraph':
                    html += `<p>${block.data.text}</p>`;
                    break;
                case 'header':
                    html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                    break;
                case 'quote':
                    html += `<blockquote>${block.data.text}</blockquote>`;
                    break;
                // Handle other block types here
                default:
                    break;
            }
        });

        return html;
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
                        items={categoryList.categories.map((category, i) => {
                            return {
                                label: <Text style={{ maxWidth: "175px" }} ellipsis={{ tooltip: category.label }}>{category.label}</Text>,
                                key: category.key,
                                tabKey: category.value
                            };
                        })}
                    >
                    </Tabs>
                }
            >

                {!blogs[tab.activeTab]?.length && fetchBlogsStatus === AsyncStates.LOADING ? <Spinner /> : <>
                    {!!blogs?.[tab.activeTab]?.length ?
                        <InfiniteScroll
                            dataLength={blogs[tab.activeTab]?.length}
                            next={fetchData}
                            hasMore={blogs[tab.activeTab]?.length < total}
                            scrollableTarget="scrollableDiv"
                        >
                            <div id='scrollableDiv'>
                                {blogs?.[tab.activeTab].map((blog) =>
                                    <React.Fragment key={blog?._id}>
                                        <article className='blog__post' onClick={() => navigateTo(`/blog/${blog?._id}`, { state: blog })}>
                                            {
                                                blog?.cover_image ?
                                                    <img
                                                        className='blog__image'
                                                        loading={"lazy"}
                                                        alt={blog?.title}
                                                        src={blog?.cover_image}
                                                    />
                                                    : <div className='no__img__container'><Empty description={false} /></div>
                                            }
                                            <div className="blog__details">
                                                <span><Tag color="magenta">{blog?.category}</Tag></span>
                                                <h2>{blog.title}</h2>
                                                <p>
                                                    <span dangerouslySetInnerHTML={{ __html: `${convertToHTML(blog?.content)?.slice(0, 250).trim()}...` }}></span>
                                                </p>
                                                <div className="article__footer">
                                                    <span className="blog__author"><Avatar src={blog?.posted_by?.pic} alt={blog?.posted_by?.user_name} /> {blog?.posted_by?.user_name}</span>
                                                    <span className="blog__date">{new Date(blog.createdAt).toUTCString()}</span>
                                                </div>

                                                <Divider className='divider' />
                                                <div className='blog__actions'>
                                                    <div className='blog___actions__container'>
                                                        <div className='blog__likes' onClick={(event) => {
                                                            event.stopPropagation()
                                                            handleLike(blog)
                                                        }}>
                                                            <Text strong>{blog?.likes?.length}</Text>
                                                            <HeartTwoTone className='like__icon' title={blog?.likes?.length} twoToneColor={blog.likes.includes(userInfo.id) ? "#eb2f96" : null} />
                                                        </div>
                                                        {userInfo?.id === blog?.posted_by?._id &&
                                                            <div>
                                                                <DeleteOutlined className='delete__icon' onClick={(e) => { e.stopPropagation(); setSelectedBlog(blog); setVisible(true); }} />
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </React.Fragment>
                                )}
                            </div>
                        </InfiniteScroll>
                        :
                        <Empty description={`No blogs for ${categoryList.categoriesDisplayName[tab.activeTab]} `} />
                    }
                </>
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