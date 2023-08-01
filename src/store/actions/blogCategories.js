import { createActions } from "redux-actions"

export const FetchCategoriesActionTypes = {
    REQUEST: "FETCH_CATEGORIES_REQUEST",
    SUCCESS: "FETCH_CATEGORIES_SUCCESS",
    FAILURE: "FETCH_CATEGORIES_FAILURE",
}

export const {
    fetchCategoriesRequest,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
} = createActions({
    [FetchCategoriesActionTypes.REQUEST]: (payload) => payload,
    [FetchCategoriesActionTypes.SUCCESS]: (response) => (response),
    [FetchCategoriesActionTypes.FAILURE]: (error) => ({ error }),
})