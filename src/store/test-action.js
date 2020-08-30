import { testResource } from '../service/CodelessApi.js';
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

export const createTest = (test) => {
    return (dispath) => {
        isCallRequested(true);
        testResource.createTest(test)
            .then(response => {
                console.log(response);
                dispath(isCallRequested(false));
                dispath(isCallSuccessful(true, "The probe has been created successfully!"));
            })
            .catch(error => {
                console.log(error);
                dispath(isCallFailed(true, "The probe has not been created!"));
            });
    }
}