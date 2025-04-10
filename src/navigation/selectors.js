import { createSelector } from 'reselect';

export const getRouterState = (state) => state.router;

export const getPathname = createSelector(getRouterState, (router) => {
    return router && router.location && router.location.pathname
        ? router.location.pathname
        : null;
});

export const getPathnameAsBreadcrumbs = createSelector(
    getPathname,
    (pathname) => {
        if (!pathname) {
            return pathname;
        }
        const parts = `${pathname}`
            .trim()
            .replace(/^\/+/, '')
            .replace(/\/+$/, '')
            .split(/\/+/g)
            .join(' ➡️ ');
        return `🏠 ${parts}`;
    },
);
