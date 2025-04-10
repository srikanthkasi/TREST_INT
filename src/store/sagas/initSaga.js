import { put } from 'redux-saga/effects';
import { authenticationRequested } from '../actions/authActions';

export function* initSaga() {
    yield put(authenticationRequested());
}