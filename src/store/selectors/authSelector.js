import { createSelector } from 'reselect';

export const getAuthState = (state) => state.auth;

export const getAuthToken = createSelector(
    getAuthState,
    (authState = {}) => authState.token,
);

export const getAuthProfile = createSelector(
    getAuthState,
    (authState = {}) => authState.profile,
);

export const hasAdminGroup = createSelector(
    getAuthProfile,
    (profile = {}) => profile?.isAdmin,
);

export const getUserEmail = createSelector(
    getAuthState,
    (authState = {}) => authState.profile.email,
);

export const getUserName = createSelector(
    getAuthState,
    (authState = {}) => authState.profile.firstName,
);
