import { call, put, takeLatest } from "redux-saga/effects"
import { notification } from "antd"
import { fetchCategoriesApi } from "../../services/api"
import { fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess } from "../actions/blogCategories"
import { fetchBlogsRequest } from "../actions/blogs"

function* fetchCategoriesSaga({ payload = {} }) {
    try {
        const { data: { result, status, message } } = yield call(fetchCategoriesApi)
        if (status === "Success") {
            yield put(fetchCategoriesSuccess(result.categoriesList))
            yield put(fetchBlogsRequest({ pageNumber: 1 }))
        } else {
            notification.error({
                message, duration: 2.5,
            })
            yield put(fetchCategoriesFailure(message))
        }
    } catch (error) {
        notification.error({
            message: "SomeThing Went Wrong",
            duration: 2.5,
        })
        yield put(fetchCategoriesFailure(error))
    }
}

export default function* rootSaga() {
    yield takeLatest(fetchCategoriesRequest, fetchCategoriesSaga)
}