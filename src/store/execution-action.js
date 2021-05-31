import {
    executionResource,
    regionsResource,
    handleCatchGlobally
} from '../service/CodelessApi.js';
import {
    isCallRequested
} from '../store/http-call-action';
import {
    setNotificationMessage
} from './util-action.js';

import * as common from "constants/Common";

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

export const SET_EXECUTION_RESULT = 'SET_EXECUTION_RESULT';
export const setExecutionResult = (executionResult) => ({
    type: SET_EXECUTION_RESULT,
    payload: { executionResult }
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
            .catch(error => handleCatchGlobally(error, error => { }));
    }
}

export const getExecutions = (page = 0, size = 20) => {
    return (dispath) => {
        dispath(isCallRequested(true));
        executionResource.getExecutions(page, size)
            .then(response => {
                dispath(setExecutions(response.data.items));
                dispath(isCallRequested(false));
            })
            .catch(error => handleCatchGlobally(error, error => {
                dispath(isCallRequested(false));
            }));
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
                dispath(completeExecutionRequest());
                dispath(setNotificationMessage({
                    message: SUCCESS_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_SUCCESS
                }));
            })
            .catch(error => handleCatchGlobally(error, error => {
                dispath(isCallRequested(false));
                dispath(canceleExecutionRequest());
                dispath(setNotificationMessage({
                    message: ERROR_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_ERROR
                }));
            }));
    }
}

export const getExecutionResult = (executionId) => {
    return (dispath) => {
        dispath(isCallRequested(true));
        executionResource.getExecutionResult(executionId)
            .then(response => {
                dispath(setExecutionResult(response.data))
                dispath(isCallRequested(false));
            })
            .catch(error => handleCatchGlobally(error, error => {
                dispath(isCallRequested(false));
            }));
    }
}