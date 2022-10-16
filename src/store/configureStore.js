
import { createStore, combineReducers, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { AsyncStates } from "../constants"
import loginReducer from "./reducers/login"
import loginSaga from "./sagas/login";
import blogsSaga from "./sagas/blogs"

import { persistStore, persistReducer, createTransform } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { rootReducer } from "./reducers"
import blogsReducer from "./reducers/blogs";




const sagaMiddleware = createSagaMiddleware()
const setTransform = createTransform(
    (inboundState, key) => inboundState,
    (outboundState, key) => ({
        ...outboundState,
        status: AsyncStates.INITIAL,
    }),
    // define which reducers this transform gets called for.
    { whitelist: ["login"] }
)

const persistConfig = {
    key: "blog-app-root",
    storage,
    whitelist: [
        "login",
    ],
    transforms: [setTransform],
}

export const appReducer = combineReducers({
    login: loginReducer,
    blogs: blogsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware)
)

const rootSagas = [
    loginSaga,
    blogsSaga
]

rootSagas.forEach(sagaMiddleware.run)
const persistor = persistStore(store)
export { store, persistor }
