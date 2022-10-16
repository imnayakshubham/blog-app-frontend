import { Card, List, Tabs, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogsRequest } from '../../store/actions/blogs';
import { BlogCard } from '../Blog/BlogCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { blogCategoryOptions } from '../../constants';
const { Text } = Typography

const Blogs = React.memo(() => {
    const dispatch = useDispatch();
    const { loginResponse: userInfo } = useSelector((state) => state.login);

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

    const { blogsData: { blogs = {}, total = 0 } } = useSelector(state => state.blogs);

    useEffect(() => {
        dispatch(fetchBlogsRequest({ pageNumber: 1 }))
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
                <div
                    id="scrollableDiv"
                    style={{
                        height: 600,
                        overflow: 'auto',
                    }}
                >
                    <InfiniteScroll
                        dataLength={blogs[tab.activeTab].length}
                        next={fetchData}
                        hasMore={blogs[tab.activeTab].length < total}
                        scrollableTarget="scrollableDiv"
                    >
                        <List
                            grid={{
                                xs: 1,
                                sm: 2,
                                md: 2,
                                lg: 3,
                                xl: 3,
                                xxl: 3,
                            }}
                            dataSource={blogs?.[tab.activeTab].sort(function (a, b) {
                                return a.title.localeCompare(b.title, undefined, {
                                    numeric: true,
                                    sensitivity: 'base'
                                })
                            })}
                            renderItem={(blog, index) => (
                                <List.Item>
                                    <BlogCard blog={blog} loading={false} key={index ?? 0} postId={index ?? 0} />
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                </div>
            </Card>
        </>

    )
})

export default Blogs