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

const ERROR_MESSAGE = "The error occured."
const SUCCESS_MESSAGE = "The canary test has been removed successfully."
export const removeCanaryTest = (canaryTest, completeSuccessfully) => {
    return (dispath) => {
        dispath(isCallRequested(true))
        testResource.deleteTest(canaryTest)
            .then(response => {
                dispath(isCallRequested(false))
                dispath(setNotificationMessage({
                    message: SUCCESS_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_SUCCESS
                }));
                completeSuccessfully()
                dispath(completeHealthCheckRemovalRequest())
            })
            .catch(error => handleCatchGlobally(dispath, error, error => {
                dispath(isCallRequested(false))
                dispath(setNotificationMessage({
                    message: ERROR_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_ERROR
                }));
                dispath(completeHealthCheckRemovalRequest())
            }));
    }
}