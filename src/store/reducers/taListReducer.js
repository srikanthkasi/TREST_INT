import {
    FETCH_TALIST_FAILED,
    FETCH_TALIST_REQUESTED,
    FETCH_TALIST_SUCCEEDED,
} from '../actions/taListActions';

const initialState = {
    taList: [],
    error: null,
    loading: false,
};

export default (state = initialState, action = {}) => {
    const { type } = action;

    switch (type) {
        case FETCH_TALIST_REQUESTED: {
            return {
                ...state,
                taList: [],
                error: null,
                loading: true,
            };
        }
        case FETCH_TALIST_SUCCEEDED: {
            const { taList } = action;
            return {
                ...state,
                error: null,
                loading: false,
                taList,
            };
        }
        case FETCH_TALIST_FAILED: {
            const { error } = action;
            return {
                ...state,
                taList: [],
                loading: false,
                error,
            };
        }
        default:
            return state;
    }
};
