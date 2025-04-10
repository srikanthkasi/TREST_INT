import qs from 'qs';
import APIErrorResponse from './APIErrorResponse';

/**
 * Create an APIErrorResponse object from a fetch Response.
 *
 * @param {Response} response
 * @return {Promise<APIErrorResponse>}
 */
export async function createAPIErrorResponse(response) {
    const errorResponse = new APIErrorResponse();
    await errorResponse.setJsonFromResponse(response);
    return errorResponse;
}

/**
 * Given a caught error, if it's an `APIErrorResponse`, attempt to extract its validation errors or other errors as an array of
 * error messages that occurred, falling back to an array containing only `genericErrorMessage` in all of the following
 * scenarios:
 *
 * -   `error` is not an `APIErrorResponse`
 * -   The `APIErrorResponse` was not JSON parse-able
 * -   The `APIErrorResponse`'s JSON body did not contain a top-level `message` and did not contain any `validationErrors` or
 *     it was empty.
 *
 * @see APIErrorResponse.getErrorMessages
 * @param {APIErrorResponse|*} error
 * @param {string|null} genericErrorMessage
 * @return {string[]}
 */
export async function getErrorsFromPossibleAPIErrorResponse(
    error,
    genericErrorMessage = null,
) {
    const fallback = genericErrorMessage ? [genericErrorMessage] : [];
    return error instanceof APIErrorResponse
        ? error.getErrorMessages(genericErrorMessage)
        : fallback;
}

/**
 * We send API errors to the console since the devtools Network tab still doesn't like to show error response bodies.
 * @param errorResponse
 */
export function logAPIErrorResponse(errorResponse) {
    // eslint-disable-next-line no-console
    console.error(
        'An API error occurred: ',
        errorResponse && errorResponse.json
            ? errorResponse.json
            : errorResponse,
    );
}

/**
 * Make a request to a URI using the fetch API.
 *
 * @param {string} path
 * @param {string=} method
 * @param {(string|null)=} token
 * @param {({}|null)=} query
 * @param {(*|null)=} body
 * @return {Promise<Response>}
 */
export async function requestWithAuth(
    path,
    method = 'GET',
    token = null,
    query = null,
    body = null,
) {
    // Get the API URI from the build-time environment variables, removing any trailing slash
    const apiUri = `${process.env.REACT_APP_API_URI}`.replace(/\/+$/, '');
    // Append the path to the apiUri with a slash, removing any leading slashes on the path
    let fullURI = `${apiUri}/${path.replace(/^\/+/, '')}`;
    if (query !== null) {
        fullURI += '?' + qs.stringify(query);
    }
    const headers = {
        client: 'internal',
        Accept: 'application/json',
    };
    
    if (token !== null) {
        headers.Authorization = 'Bearer ' + token;
    }

    const options = { method, headers };
    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }
    return fetch(fullURI, options);
}
