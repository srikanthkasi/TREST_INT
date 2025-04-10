import {
    AUTH_STATUS_REQUESTED,
    AUTH_STATUS_SUCCEEDED,
    AUTH_STATUS_FAILED
} from '../constants/authConstants';
import { 
    AUTHENTICATION_SUCCEEDED, 
    AUTHENTICATION_FAILED 
} from '../actions/authActions';

export const initAuthState = {
    status: AUTH_STATUS_REQUESTED,
    errors: null
};

const authReducer =  (state = initAuthState, action) => {
    const { type } = action;

    if (type === AUTHENTICATION_SUCCEEDED) {
        return {
            ...state,
            status: AUTH_STATUS_SUCCEEDED,
            token: action.payload.token,
            profile: action.payload.profile,
        };
    } else if (type === AUTHENTICATION_FAILED) {
        return {
            ...state,
            status: AUTH_STATUS_FAILED,
            errors: action.payload.errors,
        };
    }

    return state;
};

export default authReducer;
