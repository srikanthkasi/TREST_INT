import { createSelector } from 'reselect';
import { transformTaList } from './transforms';

export const getTaListState = (state = {}) => state.taList || {};

export const getTaList = createSelector(getTaListState, (taList) =>
    transformTaList(taList.taList),
);

export const isTaListLoading = createSelector(
    getTaListState,
    (taList) => taList.loading,
);
