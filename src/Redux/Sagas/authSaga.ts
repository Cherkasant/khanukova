import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
	activateUser,
	logoutUser,
	registerHeadInfo,
	registerPoInfo,
	registerUser,
	resetPasswordConfirm,
	sendResetEmail,
	setIdUser,
	setLoggedIn,
	signInUser
} from '../Reducers/authReducer'
import { PayloadAction } from '@reduxjs/toolkit'
import {
	ActivateUserPayload,
	RegisterHeadPayload,
	RegisterPoPayload,
	RegisterUserPayload,
	ResetPasswordConfirmPayload,
	SendResetEmailPayload,
	SignInUserPayload
} from '../Types/auth'
import API from '../Utils/api'
import {
	ACCESS_TOKEN_KEY,
	REFRESH_TOKEN_KEY
} from '../../Components/constants/consts'

function* registerUserWorker(action: PayloadAction<RegisterUserPayload>) {
	const { data: registerData, callback } = action.payload
	const { ok, data, problem } = yield call(API.registerUser, registerData)
	if (ok && data) {
		callback()
		yield put(setIdUser(data.id))
	} else {
		console.warn('Error while registering user', problem)
	}
}

function* registerHeadInfoWorker(action: PayloadAction<RegisterHeadPayload>) {
	const { data: registerHeadData, callback } = action.payload
	const { ok, problem } = yield call(API.registerHeadInfo, registerHeadData)
	if (ok) {
		callback()
	} else {
		console.warn('Error while registering Head info', problem)
	}
}

function* registerPoInfoWorker(action: PayloadAction<RegisterPoPayload>) {
	const { data: registerPoData, callback } = action.payload
	const { ok, problem } = yield call(API.registerPoInfo, registerPoData)
	if (ok) {
		callback()
	} else {
		console.warn('Error while registering PO info', problem)
	}
}

function* sendResetEmailWorker(action: PayloadAction<SendResetEmailPayload>) {
	const { email, callback } = action.payload
	const { ok, problem } = yield call(API.sendResetEmail, email)
	if (ok) {
		callback()
	} else {
		console.warn('Error while sending reset email', problem)
	}
}

function* resetPasswordConfirmWorker(
	action: PayloadAction<ResetPasswordConfirmPayload>
) {
	const { data, callback } = action.payload
	const { ok, problem } = yield call(API.resetPasswordConfirm, data)
	if (ok) {
		callback()
	} else {
		console.warn('Error while sending reset password', problem)
	}
}

function* activateUserWorker(action: PayloadAction<ActivateUserPayload>) {
	const { data: activateData, callback } = action.payload
	const { ok, problem } = yield call(API.activateUser, activateData)
	if (ok) {
		callback()
	} else {
		console.warn('Error while activating user', problem)
	}
}

function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
	const { data: SignInUserData, callback } = action.payload
	const { ok, problem, data } = yield call(API.signInUser, SignInUserData)
	if (ok) {
		localStorage.setItem(ACCESS_TOKEN_KEY, data?.access)
		localStorage.setItem(REFRESH_TOKEN_KEY, data?.refresh)
		yield put(setLoggedIn(true))
		callback()
	} else {
		console.warn('Error while sign in user', problem)
	}
}

function* logOutUserWorker() {
	yield put(setLoggedIn(false))
	localStorage.removeItem(ACCESS_TOKEN_KEY)
	localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export default function* authSagaWatcher() {
	yield all([
		takeLatest(registerUser, registerUserWorker),
		takeLatest(registerHeadInfo, registerHeadInfoWorker),
		takeLatest(registerPoInfo, registerPoInfoWorker),
		takeLatest(sendResetEmail, sendResetEmailWorker),
		takeLatest(resetPasswordConfirm, resetPasswordConfirmWorker),
		takeLatest(signInUser, signInUserWorker),
		takeLatest(activateUser, activateUserWorker),
		takeLatest(logoutUser, logOutUserWorker)
	])
}
