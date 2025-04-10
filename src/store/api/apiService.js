//const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

import { call, select } from 'redux-saga/effects';
import {
    createAPIErrorResponse,
    logAPIErrorResponse,
    requestWithAuth,
} from '../../utils/api';
import Cookies from 'js-cookie';
import { getAuthToken } from '../selectors/authSelector';
/**
 * Make an authenticated API call grabbing a firebase ID token from the currently logged in user
 * and forming a request with it.
 *
 * Will return the response or if `json` is true (default) the JSON parsed response body on successful request and if
 * `response.ok`. On failure or `!response.ok` the response itself is thrown.
 *
 * @param {string} path The relative path on the API server to make a request to.
 * @param {string=} method The HTTP method of the request (default: `'GET'`)
 * @param {boolean=} json Whether or not the response should be attempted to parse to JSON (default: `true`)
 * @param {({}|null)=} query Query parameters to generate a query string with.
 * @param {*|null} body The JSON-serializable data to use in the body of the request.
 * @return {*}
 */
export function* fetchWithAuth(
    path,
    { method = 'GET', json = true, query = null, body = null } = {},
) {
    //const token = yield select(getAuthToken);
    const token = Cookies.get('jwt');
    const response = yield call(
        requestWithAuth,
        path,
        method,
        token,
        query,
        body,
    );
    if (response.ok) {
        return json ? yield call([response, response.json]) : response;
    } else {
        const errorResponse = yield call(createAPIErrorResponse, response);
        yield call(logAPIErrorResponse, errorResponse);
        throw errorResponse;
    }
}
