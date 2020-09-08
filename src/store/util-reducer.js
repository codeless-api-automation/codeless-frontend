import {
    REDIRECT,
    ERROR
} from './util-action.js'

export const utilReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case REDIRECT: {
            return { redirectTo: payload };
        }
        case ERROR: {
            const { errorMessage } = payload;
            return { ...state, errorMessage };
        }
        default:
            return state;
    }
}