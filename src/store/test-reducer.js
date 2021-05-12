import _ from 'lodash'

import {
    UPDATE_NAME,
    UPDATE_HTTP_METHOD,
    UPDATE_REQUEST_URL,
    UPDATE_REQUEST_BODY,
    CLEAN_TEST_ATTRIBUTES,
    UPDATE_ID,
    ADD_HEADER
} from './test-action'

const initialTestState = {
    httpMethod: 'GET',
    headers: []
}

export const testReducer = (state = initialTestState, action) => {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_ID: {
            const { id } = payload;
            let test = {
                ...state,
                id
            }
            return test;
        }
        case UPDATE_NAME: {
            const { name } = payload;
            let test = {
                ...state,
                name
            }
            return test;
        }
        case UPDATE_HTTP_METHOD: {
            const { httpMethod } = payload;
            let test = {
                ...state,
                httpMethod
            }
            return test;
        }
        case UPDATE_REQUEST_URL: {
            const { requestURL } = payload;
            let test = {
                ...state,
                requestURL
            }
            return test;
        }
        case UPDATE_REQUEST_BODY: {
            const { requestBody } = payload;
            let test = {
                ...state,
                requestBody
            }
            return test;
        }
        case ADD_HEADER: {
            const { name, value } = payload;
            let headers = _.cloneDeep(state.headers).concat({ name, value });
            let test = {
                ...state,
                headers
            }
            console.log(test)
            return test;
        }
        case CLEAN_TEST_ATTRIBUTES: {
            return initialTestState;
        }
        default:
            return state;
    }
}