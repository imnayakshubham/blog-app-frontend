import { handleActions } from "redux-actions";
import { AsyncStates } from "../../constants";
import { AddBlogActionTypes, DeleteBlogActionTypes, FetchBlogsActionTypes, UpdateBlogActionTypes, UpdateLikeActionTypes } from "../actions/blogs";

const defaultState = {
    addBlogStatus: AsyncStates.INITIAL,
    addBlogErrorMessage: "",
    addBlogResponse: {},
    fetchBlogsStatus: AsyncStates.INITIAL,
    fetchBlogsErrorMessage: "",
    blogsData: {
        blogs: {
            all: [],
            Fashion: [],
            Technology: [],
            Food: [],
            Politics: [],
            Sports: [],
            Business: [],
        },
        total: 0,
    },
    deleteBlogStatus: AsyncStates.INITIAL,
    deleteBlogError: '',
    deleteBlogMessage: '',
    updateBlogStatus: AsyncStates.INITIAL,
    updateBlogError: '',
    updateBlogMessage: '',
    likeBlogStatus: AsyncStates.INITIAL,
    likeBlogErrorMessage: '',
};


const blogsReducer = handleActions({
    [AddBlogActionTypes.REQUEST]: (state) => ({
        ...state,
        addBlogStatus: AsyncStates.LOADING,
    }),
    [AddBlogActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            addBlogStatus: AsyncStates.SUCCESS,
            addBlogErrorMessage: "",
            addBlogResponse: action.payload,
        };
    },
    [AddBlogActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            addBlogStatus: AsyncStates.ERROR,
            addBlogErrorMessage: action.payload.error,
        }
    },

    [FetchBlogsActionTypes.REQUEST]: (state) => ({
        ...state,
        fetchBlogsStatus: AsyncStates.LOADING,
    }),
    [FetchBlogsActionTypes.SUCCESS]: (state, action) => {
        const currentCategory = action.payload.category ? action.payload.category : "all";
        const stateData = state.blogsData.blogs?.[currentCategory] || [];
        const actionData = action.payload.response?.blogs || [];
        const total = action.payload.response?.total || 0;

        return {
            ...state,
            fetchBlogsStatus: AsyncStates.SUCCESS,
            fetchBlogsErrorMessage: "",
            blogsData: {
                blogs: { ...state.blogsData.blogs, [currentCategory]: [...stateData, ...actionData] }, total
            },
        };
    },
    [FetchBlogsActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            fetchBlogsStatus: AsyncStates.ERROR,
            fetchBlogsErrorMessage: action.payload.error,
        }
    },
    [DeleteBlogActionTypes.REQUEST]: (state) => ({
        ...state,
        deleteBlogStatus: AsyncStates.LOADING,
    }),
    [DeleteBlogActionTypes.SUCCESS]: (state, action) => {
        const data = action.payload.reducerPayload;
        const resultForAll = state.blogsData.blogs["all"].filter((blog) => blog._id !== data.id);
        const resultForCategory = state.blogsData.blogs[data.category].filter((blog) => blog._id !== data.id);
        const finalObj = {
            ...state.blogsData.blogs,
            all: resultForAll,
            [data.category]: resultForCategory,
        }

        return {
            ...state,
            deleteBlogStatus: AsyncStates.SUCCESS,
            deleteBlogMessage: action.payload.response,
            blogsData: {
                blogs: finalObj, total: state.blogsData.total - 1
            },

        }
    },
    [DeleteBlogActionTypes.FAILURE]: (state, action) => ({
        ...state,
        deleteBlogStatus: AsyncStates.ERROR,
        deleteBlogError: action.payload.error
    }),

    [UpdateBlogActionTypes.REQUEST]: (state) => ({
        ...state,
        updateBlogStatus: AsyncStates.LOADING,
    }),
    [UpdateBlogActionTypes.SUCCESS]: (state, action) => {
        const { payload } = action.payload
        const blogs = state.blogsData.blogs

        const resultForAll = blogs["all"].find((blog) => blog._id === payload._id);
        const resultForCategory = blogs[payload.category].find((blog) => blog._id === payload._id);
        const finalObj = {
            ...blogs,
            all: resultForAll ? [...blogs["all"].filter((blog) => blog._id !== payload._id), payload] : [...blogs.all],
            [payload.category]: resultForCategory ? [...blogs[payload.category].filter((blog) => blog._id !== payload._id), payload] : [...blogs[payload.category]],
        }
        return {
            ...state,
            updateBlogStatus: AsyncStates.SUCCESS,
            updateBlogMessage: action.payload.response,
            blogsData: {
                blogs: finalObj, total: state.blogsData.total
            },
        }
    },
    [UpdateBlogActionTypes.FAILURE]: (state, action) => ({
        ...state,
        updateBlogStatus: AsyncStates.ERROR,
        updateBlogError: action.payload.error
    }),
    [UpdateLikeActionTypes.REQUEST]: (state) => ({
        ...state,
        updateBlogStatus: AsyncStates.LOADING,
    }),
    [UpdateLikeActionTypes.SUCCESS]: (state, action) => {
        const { payload, response } = action.payload
        const blogs = state.blogsData.blogs

        const resultForCategory = blogs[response.category]?.find((blog) => blog?._id === payload.blogId) ?? {};
        if (!!Object.keys(resultForCategory).length) {
            console.log("resultForCategory", resultForCategory);
        }

        const finalObj = {
            ...blogs,
            all: [...blogs["all"].filter((blog) => blog._id !== payload.blogId), response],
            [payload.category]: resultForCategory ? [...blogs[response.category].filter((blog) => blog._id !== payload._id), response] : [...blogs[payload.category]],
        }
        return {
            ...state,
            updateBlogStatus: AsyncStates.SUCCESS,
            updateBlogMessage: action.payload.response,
            blogsData: {
                blogs: finalObj, total: state.blogsData.total
            },
        }
    },
    [UpdateLikeActionTypes.FAILURE]: (state, action) => ({
        ...state,
        updateBlogStatus: AsyncStates.ERROR,
        updateBlogError: action.payload.error
    }),

}, defaultState);

export default blogsReducer; 