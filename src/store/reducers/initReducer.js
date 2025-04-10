import {
    INIT_STATUS_FAILED,
    INIT_STATUS_INITIALIZED,
    INIT_STATUS_INITIALIZING,
} from '../constants/initConstants';
import { INITIALIZATION_FAILED, INITIALIZATION_SUCCEEDED } from './actions';

export const initInitialState = {
    status: INIT_STATUS_INITIALIZING,
    errors: null,
};

export default function initReducer(state = initInitialState, action) {
    const { type } = action;

    if (type === INITIALIZATION_SUCCEEDED) {
        return {
            ...state,
            status: INIT_STATUS_INITIALIZED,
        };
    } else if (type === INITIALIZATION_FAILED) {
        return {
            ...state,
            status: INIT_STATUS_FAILED,
            errors: action.payload.errors,
        };
    }

    return state;
}
