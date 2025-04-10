import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import {
    AUTHENTICATION_REQUESTED,
    authenticationSucceeded,
    AUTHENTICATION_SUCCEEDED,
    authenticationFailed,
    AUTHENTICATION_FAILED,
} from '../actions/authActions';
import { initializationSucceeded, initializationFailed } from '../actions/initActions';
import Cookies from 'js-cookie';
//import { getPathname } from '../../navigation/selectors';

async function validateToken(token = null) {
    const headers = {
        client: 'internal',
        Accept: 'application/json',
    };

    if (token !== null) {
        headers.Authorization = 'Bearer ' + token;
    }
    const method = 'GET';
    const options = { method, headers };
    return fetch('/auth/validateToken', options);
}

function* loginRedirect() {
    //const pathname = yield select(getPathname);
    window.location.href = `/auth/login?redirect=/`;
}

export function* validateAuth() {
    const token = Cookies.get('jwt');
    if (token) {
        const response = yield call(validateToken, token);
        if (response.ok) {
            const result = yield call([response, response.json]);
            if (result.error) {
                yield put(authenticationFailed(response.error));
            } else {
                yield put(authenticationSucceeded(token, result.data));
            }
        } else {
            yield loginRedirect();
        }
    } else {
        yield loginRedirect();
    }
}

export function* authFailed() {
    yield put(
        initializationFailed(
            'Token validation error, please check authentication service.',
        ),
    );
    yield call(loginRedirect);
}

export function* authSucceeded() {
    yield put(initializationSucceeded());
}

export function* authSaga() {
    yield all([
        takeLatest(AUTHENTICATION_REQUESTED, validateAuth),
        takeLatest(AUTHENTICATION_FAILED, authFailed),
        takeLatest(AUTHENTICATION_SUCCEEDED, authSucceeded),
    ]);
}
