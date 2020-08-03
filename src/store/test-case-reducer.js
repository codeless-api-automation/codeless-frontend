import {
    UPDATE_USER_STORY,
    UPDATE_TEST_NAME,
    UPDATE_HTTP_METHOD,
    UPDATE_REQUEST_URL
} from './test-case-action'

export const testCaseReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_USER_STORY: {
            const { userStory } = payload;
            let testCase = {
                ...state,
                userStory
            }
            return testCase;
        }
        case UPDATE_TEST_NAME: {
            const { testName } = payload;
            let testCase = {
                ...state,
                testName
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