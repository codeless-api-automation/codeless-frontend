export const REDIRECT = 'REDIRECT';
export const redirect = link => ({
    type: REDIRECT,
    payload: link
})

export const ERROR = 'ERROR';
export const setErrorMessage = errorMessage => ({
    type: ERROR,
    payload: { errorMessage }
})