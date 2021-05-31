import _ from 'lodash'

import {
    testResource,
    handleCatchGlobally
} from '../service/CodelessApi.js';
import {
    isCallRequested
} from '../store/http-call-action';
import {
    cleanValidators,
    updateValidators
} from '../store/validator-action';
import {
    redirect,
    setNotificationMessage
} from './util-action.js';

import * as common from "constants/Common";
import * as componentsPaths from './../constants/ComponentsPaths';

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


const SUCCESS_MESSAGE_UPDATE = "The health check has been updated successfully.";
const ERROR_MESSAGE_UPDATE = "The health check has not updated.";
export const updateTest = (test) => {
    return (dispath) => {
        dispath(isCallRequested(true));
        testResource.updateTest(test)
            .then(response => {
                dispath(isCallRequested(false));
                dispath(setNotificationMessage({
                    message: SUCCESS_MESSAGE_UPDATE,
                    severity: common.NOTIFICATION_SEVERITY_SUCCESS
                }));
                dispath(redirect(componentsPaths.VIEW_HEALTH_CHECKS))
            })
            .catch(error => handleCatchGlobally(error, error => {
                dispath(setNotificationMessage({
                    message: ERROR_MESSAGE_UPDATE,
                    severity: common.NOTIFICATION_SEVERITY_ERROR
                }));
            }));
    }
}

const SUCCESS_MESSAGE_CREATE = "The health check has been created successfully.";
const ERROR_MESSAGE_CREATE = "The health check has not been created.";
export const createTest = (test) => {
    return (dispath) => {
        if (_.isEmpty(test.test['name']) || _.isEmpty(test.test['requestURL'])) {
            dispath(setNotificationMessage({
                message: "Name, request URL and at least one verification are required!",
                severity: common.NOTIFICATION_SEVERITY_ERROR
            }));
            return;
        }
        dispath(isCallRequested(true));
        testResource.createTest(test)
            .then(response => {
                dispath(isCallRequested(false));
                dispath(redirect(componentsPaths.VIEW_HEALTH_CHECKS));
                dispath(setNotificationMessage({
                    message: SUCCESS_MESSAGE_CREATE,
                    severity: common.NOTIFICATION_SEVERITY_SUCCESS
                }));
            })
            .catch(error => handleCatchGlobally(error, error => {
                dispath(setNotificationMessage({
                    message: ERROR_MESSAGE_CREATE,
                    severity: common.NOTIFICATION_SEVERITY_ERROR
                }));
            }));
    }
}

export const saveTest = (test) => {
    return (dispath) => {
        console.log(test)
        test.test.id === undefined ? dispath(createTest(test)) : dispath(updateTest(test))
    }
}

export const cleanAllTestAttributes = () => {
    return (dispath) => {
        dispath(cleanTestAttributes())
        dispath(cleanValidators())
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