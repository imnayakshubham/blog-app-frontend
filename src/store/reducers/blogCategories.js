import { handleActions } from "redux-actions";
import { AsyncStates } from "../../constants";
import { FetchCategoriesActionTypes } from "../actions/blogCategories";

const defaultState = {
    fetchCategoriesStatus: AsyncStates.INITIAL,
    fetchCategoriesErrorMessage: "",
    categoryList: {
        categoriesDisplayName: {},
        categories: []
    }
}

const blogCategoriesReducer = handleActions({
    [FetchCategoriesActionTypes.REQUEST]: (state) => ({
        ...state,
        fetchCategoriesStatus: AsyncStates.LOADING,
    }),
    [FetchCategoriesActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            fetchCategoriesStatus: AsyncStates.SUCCESS,
            fetchCategoriesErrorMessage: "",
            categoryList: action.payload
        };
    },
    [FetchCategoriesActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            fetchCategoriesStatus: AsyncStates.ERROR,
            fetchCategoriesErrorMessage: action.payload.error,
        }
    }
}, defaultState);

export default blogCategoriesReducer; 