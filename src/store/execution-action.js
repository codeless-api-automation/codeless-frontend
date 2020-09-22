import {
    executionResource,
    regionsResource
} from '../service/CodelessApi.js';

import {
    isCallRequested,
    isCallSuccessful,
    isCallFailed
} from '../store/http-call-action';

export const REQUEST_HEALTH_CHECK_EXECUTION = 'REQUEST_HEALTH_CHECK_EXECUTION';
export const requestHealthCheckExecution = (healthCheck) => ({
    type: REQUEST_HEALTH_CHECK_EXECUTION,
    payload: { healthCheck }
})

export const CANCELE_EXECUTION_REQUEST = 'CANCELE_EXECUTION_REQUEST';
export const canceleExecutionRequest = () => ({
    type: CANCELE_EXECUTION_REQUEST
})

export const COMPLETE_EXECUTION_REQUEST = 'COMPLETE_EXECUTION_REQUEST';
export const completeExecutionRequest = () => ({
    type: COMPLETE_EXECUTION_REQUEST
})

export const SET_EXECUTIONS = 'SET_EXECUTIONS';
export const setExecutions = (executions) => ({
    type: SET_EXECUTIONS,
    payload: { executions }
})

export const SET_REGIONS = 'SET_REGIONS';
export const setRegions = (regions) => ({
    type: SET_REGIONS,
    payload: { regions }
})

export const getRegions = () => {
    return (dispath) => {
        regionsResource.getRegions()
            .then(response => {
                dispath(setRegions(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getExecutions = (page = 0, size = 20) => {
    return (dispath) => {
        dispath(isCallRequested(true));
        executionResource.getExecutions(page, size)
            .then(response => {
                dispath(isCallRequested(false));
                if (response.status === 200) {
                    dispath(isCallSuccessful(true));
                    dispath(setExecutions(response.data.items));
                } else {
                    dispath(isCallFailed(true));
                }
            })
            .catch(error => {
                console.log(error);
                dispath(isCallRequested(false));
                dispath(isCallFailed(true));
            });
    }
}

const SUCCESS_MESSAGE = "The health check has been launched successfully.";
const ERROR_MESSAGE = "The health check has not been launched.";
export const runExecution = (execution) => {
    return (dispath) => {
        dispath(isCallRequested(true));
        executionResource.createExecution(execution)
            .then(response => {
                dispath(isCallRequested(false));
                if (response.status === 200) {
                    dispath(isCallSuccessful(true, SUCCESS_MESSAGE));
                    dispath(completeExecutionRequest());
                } else {
                    dispath(isCallFailed(true, ERROR_MESSAGE));
                    dispath(canceleExecutionRequest());
                }
            })
            .catch(error => {
                console.log(error);
                dispath(isCallRequested(false));
                dispath(isCallFailed(true, ERROR_MESSAGE));
                dispath(canceleExecutionRequest());
            });
    }
}