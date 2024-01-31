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
            .catch(error => handleCatchGlobally(dispath, error, error => { }));
    }
}

export const getExecutions = (page = 0, maxResults = 20) => {
    return (dispath) => {
        dispath(isCallRequested(true));
        executionResource.getExecutions(page, maxResults)
            .then(response => {
                dispath(setExecutions(response.data.items));
                dispath(isCallRequested(false));
            })
            .catch(error => handleCatchGlobally(dispath, error, error => {
                dispath(isCallRequested(false));
            }));
    }
}

const SUCCESS_MESSAGE = "The health check has been launched successfully.";
const ERROR_MESSAGE = "The health check has not been launched.";
const ERROR_MESSAGE_COMPUTE_IS_NOT_READY = "We are preparing compute for executing your health check. Try again later.";
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
            .catch(error => handleCatchGlobally(dispath, error, error => {
                dispath(isCallRequested(false));
                dispath(canceleExecutionRequest());
                if (error?.response?.data?.status === 500
                    && error?.response?.data?.message?.includes('The operation cannot be performed at this time.')) {
                        dispath(setNotificationMessage({
                            message: ERROR_MESSAGE_COMPUTE_IS_NOT_READY,
                            severity: common.NOTIFICATION_SEVERITY_ERROR
                        }));
                } else {
                    dispath(setNotificationMessage({
                        message: ERROR_MESSAGE,
                        severity: common.NOTIFICATION_SEVERITY_ERROR
                    }));
                }
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
            .catch(error => handleCatchGlobally(dispath, error, error => {
                dispath(isCallRequested(false));
            }));
    }
}