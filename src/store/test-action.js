import {
    testResource,
    handleCatchGlobally
} from '../service/CodelessApi.js';
import {
    isCallRequested
} from '../store/http-call-action';
import {
    setNotificationMessage
} from './util-action.js';

import * as common from "constants/Common";

export const UPDATE_ID = 'UPDATE_ID';
export const updateId = (id) => ({
    type: UPDATE_ID,
    payload: { id }
});

export const UPDATE_NAME = 'UPDATE_NAME';
export const updateName = (name) => ({
    type: UPDATE_NAME,
    payload: { name }
});

export const UPDATE_HTTP_METHOD = 'UPDATE_HTTP_METHOD';
export const updateHttpMethod = httpMethod => ({
    type: UPDATE_HTTP_METHOD,
    payload: { httpMethod }
})

export const UPDATE_REQUEST_URL = 'UPDATE_REQUEST_URL';
export const updateRequestUrl = requestURL => ({
    type: UPDATE_REQUEST_URL,
    payload: { requestURL }
})

export const UPDATE_REQUEST_BODY = 'UPDATE_REQUEST_BODY';
export const updateRequestBody = requestBody => ({
    type: UPDATE_REQUEST_BODY,
    payload: { requestBody }
})

export const CLEAN_TEST_ATTRIBUTES = 'CLEAN_TEST_ATTRIBUTES';
export const cleanTestAttributes = () => ({
    type: CLEAN_TEST_ATTRIBUTES
})

export const ADD_HEADER = 'ADD_HEADER';
export const addHeader = (name, value) => ({
    type: ADD_HEADER,
    payload: { name, value }
})

export const REMOVE_HEADER = 'REMOVE_HEADER';
export const removeHeader = (headerIndex) => ({
    type: REMOVE_HEADER,
    payload: { headerIndex }
})

export const UPDATE_HEADER = 'UPDATE_HEADER';
export const updateHeader = (headerIndex, newHeader) => ({
    type: UPDATE_HEADER,
    payload: { headerIndex, newHeader }
})

export const SET_HEADER = 'SET_HEADER';
export const setHeader = (headers) => ({
    type: SET_HEADER,
    payload: { headers }
})

export const CREATE_VALIDATOR = 'CREATE_VALIDATOR';
export const createValidator = (validator, predicate) => ({
    type: CREATE_VALIDATOR,
    payload: { validator, predicate }
});

export const REMOVE_VALIDATOR = 'REMOVE_VALIDATOR';
export const removeValidator = validator => ({
    type: REMOVE_VALIDATOR,
    payload: { validator }
})

export const UPDATE_PREDICATE = 'UPDATE_PREDICATE';
export const updatePredicate = (validator, newPredicateValue) => ({
    type: UPDATE_PREDICATE,
    payload: { validator, newPredicateValue }
})

export const UPDATE_INPUT_FIELD = 'UPDATE_INPUT_FIELD';
export const updateInputField = (validator, inputField, newInputFieldValue) => ({
    type: UPDATE_INPUT_FIELD,
    payload: { validator, inputField, newInputFieldValue }
})

export const UPDATE_VALIDATORS = 'UPDATE_VALIDATORS';
export const updateValidators = (validators) => ({
    type: UPDATE_VALIDATORS,
    payload: { validators }
})


const SUCCESS_MESSAGE_UPDATE = "The canary test has been updated successfully.";
const ERROR_MESSAGE_UPDATE = "The canary test has not updated.";
export const updateTest = (test, redirect) => {
    return (dispath) => {
        dispath(isCallRequested(true));
        testResource.updateTest(test)
            .then(response => {
                dispath(isCallRequested(false));
                redirect()
                dispath(setNotificationMessage({
                    message: SUCCESS_MESSAGE_UPDATE,
                    severity: common.NOTIFICATION_SEVERITY_SUCCESS
                }));
            })
            .catch(error => handleCatchGlobally(dispath, error, error => {
                dispath(isCallRequested(false));
                dispath(setNotificationMessage({
                    message: ERROR_MESSAGE_UPDATE,
                    severity: common.NOTIFICATION_SEVERITY_ERROR
                }));
            }));
    }
}

const SUCCESS_MESSAGE_CREATE = "The canary test has been created successfully.";
const ERROR_MESSAGE_CREATE = "The canary test has not been created.";
export const createTest = (test, redirect) => {
    return (dispath) => {
        dispath(isCallRequested(true));
        testResource.createTest(test)
            .then(response => {
                dispath(isCallRequested(false));
                redirect()
                dispath(setNotificationMessage({
                    message: SUCCESS_MESSAGE_CREATE,
                    severity: common.NOTIFICATION_SEVERITY_SUCCESS
                }));
            })
            .catch(error => handleCatchGlobally(dispath, error, error => {
                dispath(isCallRequested(false));
                dispath(setNotificationMessage({
                    message: ERROR_MESSAGE_CREATE,
                    severity: common.NOTIFICATION_SEVERITY_ERROR
                }));
            }));
    }
}

export const saveTest = (test, redirect) => {
    return (dispath) => {
        console.log(test)
        test.id === undefined ? dispath(createTest(test, redirect)) : dispath(updateTest(test, redirect))
    }
}

export const cleanAllTestAttributes = () => {
    return (dispath) => {
        dispath(cleanTestAttributes())
    }
}

export const updateAllTestAttributes = (test) => {
    console.log(test)
    return (dispath) => {
        let { id, name, httpMethod, requestURL, requestBody, validators, headers } = test;
        dispath(updateId(id))
        dispath(updateName(name))
        dispath(updateHttpMethod(httpMethod))
        dispath(updateRequestUrl(requestURL))
        dispath(updateRequestBody(requestBody))
        dispath(updateValidators(validators))
        dispath(setHeader(headers))
    }
}