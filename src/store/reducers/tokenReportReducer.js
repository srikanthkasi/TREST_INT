import {
    FETCH_TOKENS_FAILED,
    FETCH_TOKENS_REQUESTED,
    FETCH_TOKENS_SUCCEEDED,
    EXPORT_TOKENS_FAILED,
    EXPORT_TOKENS_REQUESTED,
    EXPORT_TOKENS_SUCCEEDED,
    CLEAR_EXPORT_TOKENS,
    RESET_PAGINATION_CONTEXT,
    STORE_PAGINATION_CONTEXT,
} from '../actions/tokenReportActions';
//import { ITEMS_PER_PAGE } from '../constants/tokenReportConstants';

export const initialPaginationContext = {
    pageIndex: 0,
    itemsPerPage: 8,
    sortBy: null,
    search: null,
    startDate: null,
    endDate: null,
    totalItems: 0,
};

export const initialState = {
    loading: false,
    tokens: [],
    errors: null,
    paginationContext: {
        ...initialPaginationContext,
    },
    exportData: null,
};

export default (state = initialState, action = {}) => {
    const { type } = action;
    
    switch (type) {
        case FETCH_TOKENS_REQUESTED: {
            const { pageIndex, sortBy, search, startDate, endDate } = action;
            return {
                ...state,
                loading: true,
                paginationContext: {
                    ...state.paginationContext,
                    pageIndex: pageIndex || state.paginationContext.pageIndex,
                    sortBy: sortBy || state.paginationContext.sortBy,
                    search: search || state.paginationContext.search,
                    startDate: startDate || state.paginationContext.startDate,
                    endDate: endDate || state.paginationContext.endDate,
                },
            };
        }
        case FETCH_TOKENS_FAILED: {
            const { errors } = action;
            return {
                ...state,
                loading: false,
                errors,
            };
        }
        case FETCH_TOKENS_SUCCEEDED: {
            const { tokens, totalItems } = action;
            return {
                ...state,
                tokens,
                errors: [],
                loading: false,
                paginationContext: {
                    ...state.paginationContext,
                    totalItems,
                },
            };
        }
        case EXPORT_TOKENS_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case EXPORT_TOKENS_FAILED: {
            const { errors } = action;
            return {
                ...state,
                loading: false,
                errors,
            };
        }
        case EXPORT_TOKENS_SUCCEEDED: {
            const { tokens } = action;
            return {
                ...state,
                exportData: tokens,
                errors: [],
                loading: false,
            };
        }
        case CLEAR_EXPORT_TOKENS: {
            return {
                ...state,
                exportData: null,
            };
        }
        case STORE_PAGINATION_CONTEXT: {
            const { paginationContext } = action;
            return {
                ...state,
                paginationContext: {
                    ...state.paginationContext,
                    ...paginationContext,
                },
            };
        }
        case RESET_PAGINATION_CONTEXT: {
            return {
                ...state,
                errors: [],
                paginationContext: {
                    ...initialPaginationContext,
                },
            };
        }
        default:
            return state;
    }
};
