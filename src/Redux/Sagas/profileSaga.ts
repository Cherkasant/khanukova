import { all, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import API from '../Utils/api'
import {
	editHeadCompanyListReducer,
	getECaseListReducer,
	getHeadCompanyListReducer,
	setECaseListReducer,
	setHeadCompanyListReducer
} from '../Reducers/profileReducer'
import { EditCompanyListPayload } from '../Types/profile'
import callCheckingAuth from './callCheckingAuth'

function* getHeadCompanyListWorker(action: PayloadAction<undefined>) {
	const { ok, data, problem } = yield callCheckingAuth(API.getHeadCompanyList)
	if (ok && data) {
		yield put(setHeadCompanyListReducer(data.results[0]))
	} else {
		console.warn('Authentication credentials were not provided', problem)
	}
}

function* getECaseListWorker(action: PayloadAction<undefined>) {
	const { ok, data, problem } = yield callCheckingAuth(API.getECaseList)
	if (ok && data) {
		yield put(setECaseListReducer(data.results[0]))
	} else {
		console.warn('Authentication credentials were not provided', problem)
	}
}

function* editHeadCompanyListWorker(
	action: PayloadAction<EditCompanyListPayload>
) {
	const { callback, id } = action.payload
	const { ok, problem } = yield callCheckingAuth(API.editHeadCompanyList, id)
	if (ok) {
		callback()
	} else {
		console.warn('Error editing list', problem)
	}
}

export default function* profileSaga() {
	yield all([
		takeLatest(getHeadCompanyListReducer, getHeadCompanyListWorker),
		takeLatest(getECaseListReducer, getECaseListWorker),
		takeLatest(editHeadCompanyListReducer, editHeadCompanyListWorker)
	])
}
