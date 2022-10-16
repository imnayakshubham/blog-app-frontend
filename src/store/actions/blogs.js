import { createActions } from "redux-actions"

export const AddBlogActionTypes = {
    REQUEST: "ADD_BLOG_REQUEST",
    SUCCESS: "ADD_BLOG_SUCCESS",
    FAILURE: "ADD_BLOG_FAILURE",
}

export const FetchBlogsActionTypes = {
    REQUEST: "FETCH_BLOGS_REQUEST",
    SUCCESS: "FETCH_BLOGS_SUCCESS",
    FAILURE: "FETCH_BLOGS_FAILURE",
}

export const DeleteBlogActionTypes = {
    REQUEST: "DELETE_BLOG_REQUEST",
    SUCCESS: "DELETE_BLOG_SUCCESS",
    FAILURE: "DELETE_BLOG_FAILURE",
}

export const UpdateBlogActionTypes = {
    REQUEST: "UPDATE_BLOG_REQUEST",
    SUCCESS: "UPDATE_BLOG_SUCCESS",
    FAILURE: "UPDATE_BLOG_FAILURE",
}

export const UpdateLikeActionTypes = {
    REQUEST: "UPDATE_LIKE_REQUEST",
    SUCCESS: "UPDATE_LIKE_SUCCESS",
    FAILURE: "UPDATE_LIKE_FAILURE",
}

export const {
    addBlogRequest,
    addBlogSuccess,
    addBlogFailure,
    fetchBlogsRequest,
    fetchBlogsSuccess,
    fetchBlogsFailure,
    deleteBlogRequest,
    deleteBlogSuccess,
    deleteBlogFailure,
    updateBlogRequest,
    updateBlogSuccess,
    updateBlogFailure,
    updateLikeRequest,
    updateLikeSuccess,
    updateLikeFailure,
} = createActions({
    [AddBlogActionTypes.REQUEST]: (payload) => payload,
    [AddBlogActionTypes.SUCCESS]: (response) => (response),
    [AddBlogActionTypes.FAILURE]: (error) => ({ error }),
    [FetchBlogsActionTypes.REQUEST]: (payload) => payload,
    [FetchBlogsActionTypes.SUCCESS]: (response, category) => ({ response, category }),
    [FetchBlogsActionTypes.FAILURE]: (error) => ({ error }),
    [DeleteBlogActionTypes.REQUEST]: (payload) => payload,
    [DeleteBlogActionTypes.SUCCESS]: (response, reducerPayload) => ({ response, reducerPayload }),
    [DeleteBlogActionTypes.FAILURE]: (error) => ({ error }),
    [UpdateBlogActionTypes.REQUEST]: (payload) => payload,
    [UpdateBlogActionTypes.SUCCESS]: (response, payload) => ({ response, payload }),
    [UpdateBlogActionTypes.FAILURE]: (error) => ({ error }),
    [UpdateLikeActionTypes.REQUEST]: (payload) => payload,
    [UpdateLikeActionTypes.SUCCESS]: (response, payload) => ({ response, payload }),
    [UpdateLikeActionTypes.FAILURE]: (error) => ({ error }),
})