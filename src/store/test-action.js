import { testResource } from '../service/CodelessApi.js';
import { addProbes } from './probes-action.js';
import {
    isCallRequested,
    isCallSuccessful,
    isCallFailed
} from '../store/http-call-action';

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

const SUCCESS_MESSAGE = "The probe has been created successfully!";
const ERROR_MESSAGE = "The probe has not been created!";

export const createTest = (test) => {
    return (dispath) => {
        isCallRequested(true);
        testResource.createTest(test)
            .then(response => {
                console.log(test);
                console.log(response);
                dispath(isCallRequested(false));
                if (response.status === 201) {
                    dispath(isCallSuccessful(true, SUCCESS_MESSAGE));
                    dispath(addProbes(response.data))
                    dispath(cleanAllTestAttributes())
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