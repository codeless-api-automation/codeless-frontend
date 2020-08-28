import { testResource } from './../service/CodelessApi.js';

export const UPDATE_PROBE_NAME = 'UPDATE_PROBE_NAME';
export const updateProbeName = (probeName) => ({
    type: UPDATE_PROBE_NAME,
    payload: { probeName }
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

export const CALL_REQUESTED = 'CALL_REQUESTED';
export const isCallRequested = isCallRequested => ({
    type: CALL_REQUESTED,
    payload: { isCallRequested }
})

export const CALL_SUCCESSFUL = 'CALL_SUCCESSFUL';
export const isCallSuccessful = isCallSuccessful => ({
    type: CALL_SUCCESSFUL,
    payload: { isCallSuccessful }
})

export const CALL_FAILED = 'CALL_FAILED';
export const isCallFailed = isCallFailed => ({
    type: CALL_FAILED,
    payload: { isCallFailed }
})

export const createTest = (test) => {
    return (dispath) => {
        isCallRequested(true);
        testResource.createTest(test)
            .then(response => {
                console.log(response);
                isCallRequested(false);
                isCallSuccessful(true);
            })
            .catch(error => {
                console.log(error);
                isCallFailed(true);
            });
    }
}