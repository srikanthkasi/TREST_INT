export const PREFIX = 'auth/';
export const AUTHENTICATION_REQUESTED = `${PREFIX}AUTHENTICATION_REQUESTED`;
export const AUTHENTICATION_SUCCEEDED = `${PREFIX}AUTHENTICATION_SUCCEEDED`;
export const AUTHENTICATION_FAILED = `${PREFIX}AUTHENTICATION_FAILED`;

export function authenticationRequested() {
    return {
        type: AUTHENTICATION_REQUESTED
    };
}

export function authenticationSucceeded(token = null, profile = {}) {
    return {
        type: AUTHENTICATION_SUCCEEDED,
        payload : {
            token,
            profile,
        }
    };
}

export function authenticationFailed(errors = null) {
    return {
        type: AUTHENTICATION_FAILED,
        payload: {
            errors,
        },
    };
}
