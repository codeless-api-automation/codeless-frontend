import {
    scheduleResource,
    handleCatchGlobally
} from '../service/CodelessApi.js';
import {
    isCallRequested
} from '../store/http-call-action';
import {
    setNotificationMessage
} from './util-action.js';

import * as common from "constants/Common";

export const REQUEST_HEALTH_CHECK_SCHEDULE = 'REQUEST_HEALTH_CHECK_SCHEDULE';
export const requestHealthCheckSchedule = (healthCheck) => ({
    type: REQUEST_HEALTH_CHECK_SCHEDULE,
    payload: { healthCheck }
})

export const SET_SCHEDULES = 'SET_SCHEDULES';
export const setSchedules = (schedules) => ({
    type: SET_SCHEDULES,
    payload: { schedules }
})

export const getSchedules = (page = 0, size = 20) => {
    return (dispath) => {
        dispath(isCallRequested(true));
        scheduleResource.getSchedules(page, size)
            .then(response => {
                dispath(setSchedules(response.data.items));
                dispath(isCallRequested(false));
            })
            .catch(error => handleCatchGlobally(error, error => {
                dispath(isCallRequested(false));
            }));
    }
}

const SUCCESS_MESSAGE = "The health check has been scheduled successfully.";
const ERROR_MESSAGE = "The health check has not been scheduled.";
export const runSchedule = (schedule) => {
    return (dispath) => {
        dispath(isCallRequested(true));
        scheduleResource.createSchedule(schedule)
            .then(response => {
                dispath(isCallRequested(false));
                dispath(setNotificationMessage({
                    message: SUCCESS_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_SUCCESS
                }));
            })
            .catch(error => handleCatchGlobally(error, error => {
                dispath(isCallRequested(false));
                dispath(setNotificationMessage({
                    message: ERROR_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_ERROR
                }));
            }));
    }
}