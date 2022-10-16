import {
	takeLatest,
	call,
	put,
	select,

} from "redux-saga/effects"
import { history } from "../../index"
import { defaultHeaders } from "../../constants"
import { loginApi, signupApi, updateProfileApi } from "../../services/api"
import { loginFailure, loginRequest, loginSuccess, signupFailure, signupRequest, signupSuccess, updateProfileFailure, updateProfileRequest, updateProfileSuccess } from "../actions/login"
import { notification } from "antd";
import Sha1 from "js-sha1";


function* loginSaga({ payload }) {
	try {
		const { email, password } = payload
		const hashedPassword = Sha1(password.trim())
		const loginPayload = {
			email,
			password: hashedPassword,
		}
		const { data: { result, status, message } } = yield call(loginApi, loginPayload, defaultHeaders)

		if (status === "Success") {
			yield put(loginSuccess(result))
			yield call(history.push, "/")
		}
		else {
			yield put(loginFailure(message))
		}
	} catch (error) {
		yield put(loginFailure(error))
	}
}

function* signupSaga({ payload }) {
	const { email, password, user_name, confirm_password } = payload

	try {
		if (confirm_password !== password) {
			notification.error({
				message: "Password and Confirm Password should be same",
				duration: 2.5,
			})
			yield put(signupFailure("Password and Confirm Password should be same"))
			return;
		}
		const hashedPassword = Sha1(password.trim())


		const signupPayload = {
			email,
			password: hashedPassword,
			user_name: user_name.trim(),
		}
		const { data: { result, status, message } } = yield call(signupApi, signupPayload, defaultHeaders)
		if (status === "Success") {
			yield put(signupSuccess(result))
			yield call(history.push, "/login")
		}
		else {
			yield put(signupFailure(message))
		}
	} catch (error) {
		yield put(signupFailure(error))
	}
}

function* updateProfileSaga({ payload }) {
	const { loginResponse } = yield select((state) => state.login);
	const { token } = loginResponse;
	const headers = {
		...defaultHeaders,
		token,
	}
	try {
		const { data: { result, status, message } } = yield call(updateProfileApi, payload, headers)

		if (status === "Success") {
			yield put(updateProfileSuccess(result))
			notification.success({
				message: message,
				duration: 2.5,
			})
			yield call(history.push, "/profile")
		}
		else {
			yield put(updateProfileFailure(message))
		}
	} catch (error) {
		yield put(updateProfileFailure(error))
	}
}




export default function* rootSaga() {
	yield takeLatest(loginRequest, loginSaga)
	yield takeLatest(signupRequest, signupSaga)
	yield takeLatest(updateProfileRequest, updateProfileSaga)
}
