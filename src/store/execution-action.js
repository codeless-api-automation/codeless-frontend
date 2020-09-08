import {
    executionResource,
    regionsResource
} from '../service/CodelessApi.js';

import {
    isCallRequested,
    isCallSuccessful,
    isCallFailed
} from '../store/http-call-action';

export const REQUEST_EXECUTION = 'REQUEST_EXECUTION';
export const requestExecution = (healthCheckIndex) => ({
    type: REQUEST_EXECUTION,
    payload: { healthCheckIndex }
})

export const CANCELE_EXECUTION_REQUEST = 'CANCELE_EXECUTION_REQUEST';
export const canceleExecutionRequest = () => ({
    type: CANCELE_EXECUTION_REQUEST
})

export const COMPLETE_EXECUTION_REQUEST = 'COMPLETE_EXECUTION_REQUEST';
export const completeExecutionRequest = () => ({
    type: COMPLETE_EXECUTION_REQUEST
})

export const ADD_REGIONS = 'ADD_REGIONS';
export const addRegions = (regions) => ({
    type: ADD_REGIONS,
    payload: { regions }
})

export const getRegions = () => {
    return (dispath) => {
        regionsResource.getRegions()
            .then(response => {
                dispath(addRegions(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

const SUCCESS_MESSAGE = "The health check has been launched successfully.";
const ERROR_MESSAGE = "The health check has not been launched.";
export const runExecution = (execution) => {
    return (dispath) => {
        isCallRequested(true);
        executionResource.createExecution(execution)
            .then(response => {
                dispath(isCallRequested(false));
                if (response.status === 201) {
                    dispath(isCallSuccessful(true, SUCCESS_MESSAGE));
                    dispath(completeExecutionRequest());
                } else {
                    dispath(isCallFailed(true, ERROR_MESSAGE));
                    dispath(canceleExecutionRequest());
                }
            })
            .catch(error => {
                console.log(error);
                dispath(isCallFailed(true, ERROR_MESSAGE));
                dispath(canceleExecutionRequest());
            });
    }
}