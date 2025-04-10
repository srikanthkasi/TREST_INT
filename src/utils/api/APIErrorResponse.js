import { flatten } from 'ramda';

export default class APIErrorResponse extends Error {
    /**
     * The JSON from this response if it was parse-able
     * @type {null|Object|Array}
     */
    json = null;

    /**
     * The raw Response.
     * @type {Response|null}
     */
    response = null;

    /**
     * Safely parse and set the JSON from a Response. Failure is a no-op. Always resolves with `this`.
     *
     * @param {Response} response
     * @return {Promise<APIErrorResponse>}
     */
    setJsonFromResponse = async (response) => {
        this.response = response;
        try {
            this.json = await response.json();
            return this;
        } catch (ignored) {
            return this;
        }
    };

    /**
     * Is this error a client HTTP error as indicated by the status code?
     * @return {boolean}
     */
    isClientError = () => {
        return (
            this.response &&
            this.response.status >= 400 &&
            this.response.status < 500
        );
    };

    /**
     * Is this error a server HTTP error as indicated by the status code?
     * @return {boolean}
     */
    isServerError = () => {
        return this.response && this.response.status >= 500;
    };

    /**
     * If the response was JSON parse-able and contains a `validationErrors` array, we'll flatten it into a Map where keys
     * are the dot-separated paths of the errors' field keys (typically just the straight up name of the field for simple fields)
     * and values are arrays of objects containing information about the error that occurred, particularly including a `message`.
     *
     * The response shape is intended to be helpful in showing errors per-field like we do with Yup.
     *
     * @return {Map<string, {type: string, message: string, path: array, dotPath: string, context: {}}[]>|null}
     */
    getValidationErrors = () => {
        if (this.json && this.json.validationErrors) {
            return this.json.validationErrors.reduce(
                (errorMap, { message, path = [], type, context }) => {
                    const dotPath = path.join('.');
                    const existing = errorMap.get(dotPath) || [];
                    errorMap.set(dotPath, [
                        ...existing,
                        { message, path, type, context, dotPath },
                    ]);
                    return errorMap;
                },
                new Map(),
            );
        }
        return null;
    };

    /**
     * Resolves with an array of string error messages simplified/extracted from `getValidationErrors`. Unlike `getValidationErrors`
     * this method will always return an array and it will be empty if the response contains no errors or was not JSON parse-able.
     *
     * If a `fallbackErrorMessage` is provided than that message will be used instead of returning an empty array when getValidationErrors
     * returns `null` or an empty array.
     *
     * @param {string|null} fallbackErrorMessage
     *
     * @return {string[]}
     */
    getValidationErrorMessages = (fallbackErrorMessage = null) => {
        const fallbackMessages = fallbackErrorMessage
            ? [fallbackErrorMessage]
            : [];
        const validationErrors = this.getValidationErrors();
        if (validationErrors) {
            const messages = flatten([...validationErrors.values()]).map(
                ({ message }) => message,
            );
            return messages.length ? messages : fallbackMessages;
        }
        return fallbackMessages;
    };

    /**
     * Extract the top-level error from the response if there is one, returning `null` if there is not.
     *
     * @return {null|{error: string, message: (string|null), statusCode: (number|null)}}
     */
    getError = () => {
        if (this.json && this.json.error && this.isServerError()) {
            const error = {
                error: this.json.error,
                message: this.json.message || null,
                statusCode:
                    this.json.statusCode || this.response.status || null,
            };
            if (this.json.error._error) {
                error._error = this.json.error._error;
            }
            return error;
        }
        return null;
    };

    /**
     * Get an array of all error messages in this response including the top level error message if any and/or the
     * validation errors if any.
     *
     * By default the return value is "simple" meaning if there are validation errors, only those will be returned. If there
     * are no validation errors then only the top level error will be returned. Otherwise
     *
     * If no error messages are found, this will return an empty array OR an array containing only `fallbackErrorMessage`
     * if it is provided and not null.
     *
     * @param {string|null=} fallbackErrorMessage
     * @param {boolean=} simple If set to false, all mess
     * @return {string[]}
     */
    getErrorMessages = (
        fallbackErrorMessage = null,
        { simple = true } = {},
    ) => {
        const fallbackMessages = fallbackErrorMessage
            ? [fallbackErrorMessage]
            : [];

        const validationErrorMessages = this.getValidationErrorMessages();
        const topLevelError = this.getError();
        const topLevelErrorMessages = topLevelError
            ? [topLevelError.message]
            : [];

        let messages;

        if (simple) {
            messages = validationErrorMessages.length
                ? validationErrorMessages
                : topLevelErrorMessages;
        } else {
            messages = [...topLevelErrorMessages, ...validationErrorMessages];
        }

        return messages.length ? messages : fallbackMessages;
    };
}
