import { call, put, select, takeLatest } from "redux-saga/effects"
import { defaultHeaders } from "../../constants"
import { addBlogApi, deleteBlogApi, fetchBlogsApi, updateBlogApi, updateLikeApi } from "../../services/api"
import { Button, notification } from "antd"
import { addBlogFailure, addBlogRequest, addBlogSuccess, deleteBlogFailure, deleteBlogRequest, deleteBlogSuccess, fetchBlogsFailure, fetchBlogsRequest, fetchBlogsSuccess, updateBlogFailure, updateBlogRequest, updateBlogSuccess, updateLikeFailure, updateLikeRequest, updateLikeSuccess } from "../actions/blogs"
import { history } from "../../index"



function* addBlogSaga({ payload }) {
    const { loginResponse } = yield select((state) => state.login);
    const { token } = loginResponse;
    const headers = {
        ...defaultHeaders,
        token,
    }
    try {
        const { data: { result, status, message } } = yield call(addBlogApi, payload, headers)
        if (status === "Success") {
            yield put(addBlogSuccess(result))
            notification.success({
                message: 'Blog Added Successfully',
                description: <Button type='link' onClick={(e) =>
                    history.push("/")
                }>
                    {"View All Blogs"}
                </Button >,
                duration: 2.5
            })
        }
        else {
            notification.error({
                message, duration: 2.5,
            })
            yield put(addBlogFailure(message))
        }

    } catch (error) {
        notification.error({
            message: "SomeThing Went Wrong",
            duration: 2.5,
        })

        yield put(addBlogFailure(error))

    }

}

function* fetchBlogsSaga({ payload = {} }) {
    try {

        const { data: { result, status, message } } = yield call(fetchBlogsApi, payload)
        if (status === "Success") {
            yield put(fetchBlogsSuccess(result, payload.category))
        } else {
            notification.error({
                message, duration: 2.5,
            })
            yield put(fetchBlogsFailure(message))
        }
    } catch (error) {
        notification.error({
            message: "SomeThing Went Wrong",
            duration: 2.5,
        })
        yield put(addBlogFailure(error))
    }
}


function* deleteBlogSaga({ payload }) {
    try {
        const { loginResponse } = yield select((state) => state.login);
        const { token } = loginResponse;
        const headers = {
            ...defaultHeaders,
            token,
        }
        const apiPayload = { _id: payload._id }
        const reducerPayload = { id: payload._id, category: payload.category }
        const { data: { status, message } } = yield call(deleteBlogApi, apiPayload, headers)
        if (status === "Success") {
            yield put(deleteBlogSuccess(message, reducerPayload))
            notification.success({
                message, duration: 2.5,
            })
        } else {
            notification.error({
                message, duration: 2.5,
            })
            yield put(deleteBlogFailure(message))
        }
    } catch (error) {
        console.log({ error });
        notification.error({
            message: "SomeThing Went Wrong",
            duration: 2.5,
        })
        yield put(addBlogFailure(error))
    }
}

function* updateBlogSaga({ payload }) {
    try {
        const { loginResponse } = yield select((state) => state.login);
        const { token } = loginResponse;
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { status, message } } = yield call(updateBlogApi, payload, headers)
        if (status === "Success") {
            yield put(updateBlogSuccess(message, payload))
            notification.success({
                message, duration: 2.5,
            })
        } else {
            notification.error({
                message, duration: 2.5,
            })
            yield put(updateBlogFailure(message))
        }
    } catch (error) {
        notification.error({
            message: "SomeThing Went Wrong",
            duration: 2.5,
        })
        yield put(updateBlogFailure(error))
    }
}

function* updateLikeSaga({ payload }) {
    try {
        const { loginResponse } = yield select((state) => state.login);
        const { token } = loginResponse;
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { result, status, message } } = yield call(updateLikeApi, payload, headers)
        if (status === "Success") {
            yield put(updateLikeSuccess(result, payload))
        } else {
            notification.error({
                message, duration: 2.5,
            })
            yield put(updateLikeFailure(message))
        }
    } catch (error) {
        console.log({ error });
        notification.error({
            message: "SomeThing Went Wrong",
            duration: 2.5,
        })
        yield put(updateBlogFailure(error))
    }
}


export default function* rootSaga() {
    yield takeLatest(addBlogRequest, addBlogSaga)
    yield takeLatest(fetchBlogsRequest, fetchBlogsSaga)
    yield takeLatest(deleteBlogRequest, deleteBlogSaga)
    yield takeLatest(updateBlogRequest, updateBlogSaga)
    yield takeLatest(updateLikeRequest, updateLikeSaga)

}