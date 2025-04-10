export const snakeToCamel = (str) =>
    str.replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace('-', '').replace('_', ''),
    );

export const toAlphaNumberic = (string = '') =>
    string.replace(/[^0-9a-z]/gi, '');

export const toAlphaNumericUppercase = (string = '') =>
    toAlphaNumberic(string).toUpperCase();
