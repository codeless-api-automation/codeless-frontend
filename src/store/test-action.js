import _ from 'lodash'

import { testResource } from '../service/CodelessApi.js';
import {
    isCallRequested,
    isCallSuccessful,
    isCallFailed
} from '../store/http-call-action';
import {
    redirect,
    setErrorMessage
} from './util-action.js';

import * as componentsPaths from './../constants/ComponentsPaths';

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

export const CLEAN_ALL_TEST_ATTRIBUTES = 'CLEAN_ALL_TEST_ATTRIBUTES';
export const cleanAllTestAttributes = () => ({
    type: CLEAN_ALL_TEST_ATTRIBUTES
})

const SUCCESS_MESSAGE = "The health check has been created successfully.";
const ERROR_MESSAGE = "The health check has not been created.";
export const createTest = (test) => {
    return (dispath) => {
        if (_.isEmpty(test.test['name']) || _.isEmpty(test.test['requestURL'])) {
            dispath(setErrorMessage("Name, request URL and at least one verification are required!"));
            return;
        }
        isCallRequested(true);
        testResource.createTest(test)
            .then(response => {
                dispath(isCallRequested(false));
                if (response.status === 201) {
                    dispath(isCallSuccessful(true, SUCCESS_MESSAGE));
                    dispath(cleanAllTestAttributes())
                    dispath(redirect(componentsPaths.VIEW_HEALTH_CHECKS))
                } else {
                    dispath(isCallFailed(true, ERROR_MESSAGE));
                }
            })
            .catch(error => {
                console.log(error);
                dispath(isCallFailed(true, ERROR_MESSAGE));
            });
    }
}