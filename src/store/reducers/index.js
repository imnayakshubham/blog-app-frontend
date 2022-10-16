import { appReducer } from "../configureStore";


const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        localStorage.removeItem('blog-app-root')
        return appReducer(undefined, action)
    }
    if (action.type.includes('REQUEST')) {
        return appReducer({ ...state }, action)
    }
    return appReducer(state, action)
}

export { rootReducer };