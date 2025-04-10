export const PREFIX = 'init/';
export const INITIALIZATION_SUCCEEDED = `${PREFIX}INITIALIZATION_SUCCEEDED`;
export const INITIALIZATION_FAILED = `${PREFIX}INITIALIZATION_FAILED`;

export function initializationSucceeded() {
    return {
        type: INITIALIZATION_SUCCEEDED,
    };
}

export function initializationFailed(errors = null) {
    return {
        type: INITIALIZATION_FAILED,
        payload: {
            errors,
        },
    };
}