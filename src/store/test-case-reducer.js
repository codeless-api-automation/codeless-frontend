import {
    UPDATE_PROBE_NAME,
    UPDATE_HTTP_METHOD,
    UPDATE_REQUEST_URL
} from './test-case-action'

export const testCaseReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_PROBE_NAME: {
            const { probeName } = payload;
            let testCase = {
                ...state,
                probeName
            }
            return testCase;
        }
        case UPDATE_HTTP_METHOD: {
            const { httpMethod } = payload;
            let testCase = {
                ...state,
                httpMethod
            }
            return testCase;
        }
        case UPDATE_REQUEST_URL: {
            const { requestURL} = payload;
            let testCase = {
                ...state,
                requestURL
            }
            return testCase;
        }
        default:
            return state;
    }
}