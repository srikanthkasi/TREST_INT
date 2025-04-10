import { createSelector } from 'reselect';
//import { transformTokens } from '../transforms/tokenReportTransform';
import {
    TEST_AUTHORITY_STATUS_ACTIVE,
    TEST_AUTHORITY_STATUS_INACTIVE,
} from '../constants/testAuthorityConstants';
import { DateTime } from 'luxon';

export const getTokenReportState = (state = {}) => state.tokenReport;

export const isTokenReportLoading = createSelector(
    getTokenReportState,
    (tokenReportState = {}) => tokenReportState.loading,
);

export const getPaginationContext = createSelector(
    getTokenReportState,
    (tokenReportState = {}) => tokenReportState.paginationContext || {},
);

export const getRequestFields = createSelector(
    getPaginationContext,
    (paginationContext = {}) => {
        const { search, startDate, endDate, sortBy } = paginationContext;
        const query = { groupCount: true };
        if (search) {
            if (
                search === TEST_AUTHORITY_STATUS_INACTIVE ||
                search === TEST_AUTHORITY_STATUS_ACTIVE
            ) {
                query.search = '';
                query.status = search;
            } else {
                query.search = search;
            }
        }
        if (startDate instanceof Date) {
            query.startDate = DateTime.fromJSDate(startDate)
                .startOf('day')
                .toJSDate();
        }
        if (endDate instanceof Date) {
            query.endDate = DateTime.fromJSDate(endDate)
                .endOf('day')
                .toJSDate();
        }
        if (sortBy && sortBy.length) {
            query.orderBy = [sortBy[0].id, sortBy[0].desc ? 'DESC' : 'ASC'];
        }
        return query;
    },
);

export const getPageIndex = createSelector(
    getPaginationContext,
    (paginationContext = {}) => paginationContext.pageIndex,
);

export const getItemsPerPage = createSelector(
    getPaginationContext,
    (paginationContext = {}) => paginationContext.itemsPerPage,
);

export const getPageCount = createSelector(
    getPaginationContext,
    (paginationContext = {}) => {
        const pageCount = Math.ceil(
            paginationContext.totalItems / paginationContext.itemsPerPage,
        );
        return pageCount;
    },
);

export const getTotal = createSelector(
    getTokenReportState,
    (tokenReportState = {}) =>
        tokenReportState.tokens.length
            ? tokenReportState.tokens[0].tokensCount
            : 0,
);

export const getTableData = createSelector(
    getTokenReportState,
    (tokenReportState = {}) => tokenReportState.tokens,
   // (tokenReportState = {}) => transformTokens(tokenReportState.tokens),
);

export const getExportData = createSelector(
    getTokenReportState,
    (tokenReportState = {}) => tokenReportState.exportData,
);

export const getSearch = createSelector(
    getPaginationContext,
    (paginationContext = {}) => {
        const { search } = paginationContext;
        return search && search.length >= 3 ? search : null;
    },
);

export const getStartDate = createSelector(
    getPaginationContext,
    (paginationContext = {}) => paginationContext.startDate,
);

export const getEndDate = createSelector(
    getPaginationContext,
    (paginationContext = {}) => paginationContext.endDate,
);
