const PREFIX = 'taList/';

export const FETCH_TALIST_REQUESTED = `${PREFIX}FETCH_TALIST_REQUESTED`;
export const FETCH_TALIST_SUCCEEDED = `${PREFIX}FETCH_TALIST_SUCCEEDED`;
export const FETCH_TALIST_FAILED = `${PREFIX}FETCH_TALIST_FAILED`;

export const fetchTaListRequested = (search) => ({
    type: FETCH_TALIST_REQUESTED,
    search,
});

export const fetchTaListSucceeded = (taList) => ({
    type: FETCH_TALIST_SUCCEEDED,
    taList,
});

export const fetchTaListFailed = (error) => ({
    type: FETCH_TALIST_FAILED,
    error,
});
