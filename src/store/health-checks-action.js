import {
    testResource,
    handleCatchGlobally
} from '../service/CodelessApi.js';
import {
    isCallRequested
} from './http-call-action';
import {
    setNotificationMessage
} from './util-action.js';

import * as common from "constants/Common";

export const REQUEST_HEALTH_CHECK_REMOVAL = 'REQUEST_HEALTH_CHECK_REMOVAL';
export const requestHealthCheckRemoval = (healthCheck) => ({
    type: REQUEST_HEALTH_CHECK_REMOVAL,
    payload: { healthCheck }
})

export const CANCEL_HEALTH_CHECK_REMOVAL_REQUEST = 'CANCEL_HEALTH_CHECK_REMOVAL_REQUEST';
export const cancelHealthCheckRemovalRequest = () => ({
    type: CANCEL_HEALTH_CHECK_REMOVAL_REQUEST,
})

export const COMPLETE_HEALTH_CHECK_REMOVAL_REQUEST = 'COMPLETE_HEALTH_CHECK_REMOVAL_REQUEST';
export const completeHealthCheckRemovalRequest = () => ({
    type: COMPLETE_HEALTH_CHECK_REMOVAL_REQUEST,
})

export const CLEAN_HEALTH_CHECKS = 'CLEAN_HEALTH_CHECKS';
export const cleanHealthChecks = () => ({
    type: CLEAN_HEALTH_CHECKS
})

export const SET_HEALTH_CHECKS = 'SET_HEALTH_CHECKS';
export const setHealthChecks = healthChecks => ({
    type: SET_HEALTH_CHECKS,
    payload: { healthChecks }
})

export const CLEAN_CHOSEN_HEALTH_CHECKS = 'CLEAN_CHOSEN_HEALTH_CHECKS';
export const cleanChosenHealthChecks = (healthChecks) => ({
    type: CLEAN_CHOSEN_HEALTH_CHECKS,
    payload: { healthChecks }
})

const ERROR_MESSAGE = "The error occured."
const SUCCESS_MESSAGE = "The health check has been removed successfully."
export const removeHealthCheck = (healthCheck) => {
    return (dispath) => {
        dispath(isCallRequested(true))
        testResource.deleteTests([healthCheck])
            .then(response => {
                dispath(isCallRequested(false))
                dispath(setNotificationMessage({
                    message: SUCCESS_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_SUCCESS
                }));
                dispath(cleanChosenHealthChecks([healthCheck]))
                dispath(completeHealthCheckRemovalRequest())
            })
            .catch(error => handleCatchGlobally(error, error => {
                dispath(isCallRequested(false))
                dispath(setNotificationMessage({
                    message: ERROR_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_ERROR
                }));
                dispath(completeHealthCheckRemovalRequest())
            }));
    }
}

export const getHealthChecks = (page = 0, size = 20) => {
    return (dispath) => {
        dispath(isCallRequested(true))
        testResource.getTests(page, size)
            .then(response => {
                dispath(isCallRequested(false))
                dispath(cleanHealthChecks())
                dispath(setHealthChecks(response.data.items))
            })
            .catch(error => handleCatchGlobally(error, error => {
                dispath(isCallRequested(false))
                dispath(setNotificationMessage({
                    message: ERROR_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_ERROR
                }));
            }));
    }
}