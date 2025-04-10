const PREFIX = 'TokenReport/';

export const FETCH_TOKENS_REQUESTED = `${PREFIX}FETCH_TOKENS_REQUESTED`;
export const FETCH_TOKENS_SUCCEEDED = `${PREFIX}FETCH_TOKENS_SUCCEEDED`;
export const FETCH_TOKENS_FAILED = `${PREFIX}FETCH_TOKENS_FAILED`;

export const EXPORT_TOKENS_REQUESTED = `${PREFIX}EXPORT_TOKENS_REQUESTED`;
export const EXPORT_TOKENS_SUCCEEDED = `${PREFIX}EXPORT_TOKENS_SUCCEEDED`;
export const EXPORT_TOKENS_FAILED = `${PREFIX}EXPORT_TOKENS_FAILED`;
export const CLEAR_EXPORT_TOKENS = `${PREFIX}CLEAR_EXPORT_TOKENS`;

export const fetchTokensRequested = ({
    pageIndex,
    sortBy,
    search = null,
    startDate = null,
    endDate = null,
}) => ({
    type: FETCH_TOKENS_REQUESTED,
    pageIndex,
    sortBy,
    search,
    startDate,
    endDate,
});

export const exportTokensRequested = () => ({
    type: EXPORT_TOKENS_REQUESTED,
});

export const fetchTokensSucceeded = (tokens, totalItems) => ({
    type: FETCH_TOKENS_SUCCEEDED,
    tokens,
    totalItems,
});

export const fetchTokensFailed = (errors) => ({
    type: FETCH_TOKENS_FAILED,
    errors,
});

export const exportTokensSucceeded = (tokens, totalItems) => ({
    type: EXPORT_TOKENS_SUCCEEDED,
    tokens,
    totalItems,
});

export const exportTokensFailed = (errors) => ({
    type: EXPORT_TOKENS_FAILED,
    errors,
});

export const clearExportTokens = () => ({
    type: CLEAR_EXPORT_TOKENS,
});

export const STORE_PAGINATION_CONTEXT = `${PREFIX}STORE_PAGINATION_CONTEXT`;
export const RESET_PAGINATION_CONTEXT = `${PREFIX}RESET_PAGINATION_CONTEXT`;

export const storePaginationContext = (paginationContext) => ({
    type: STORE_PAGINATION_CONTEXT,
    paginationContext,
});

export const resetPaginationContext = () => ({
    type: RESET_PAGINATION_CONTEXT,
});
