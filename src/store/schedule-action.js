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

export const REQUEST_SCHEDULE_REMOVAL = 'REQUEST_SCHEDULE_REMOVAL';
export const requestScheduleRemoval = (schedule) => ({
    type: REQUEST_SCHEDULE_REMOVAL,
    payload: { schedule }
})

export const CANCEL_SCHEDULE_REMOVAL_REQUEST = 'CANCEL_SCHEDULE_REMOVAL_REQUEST';
export const cancelScheduleRemovalRequest = () => ({
    type: CANCEL_SCHEDULE_REMOVAL_REQUEST,
})

export const COMPLETE_SCHEDULE_REMOVAL_REQUEST = 'COMPLETE_SCHEDULE_REMOVAL_REQUEST';
export const completeScheduleRemovalRequest = () => ({
    type: COMPLETE_SCHEDULE_REMOVAL_REQUEST,
})

export const REQUEST_SCHEDULE_STATE_UPDATE = 'REQUEST_SCHEDULE_STATE_UPDATE';
export const requestScheduleStateUpdate = (schedule) => ({
    type: REQUEST_SCHEDULE_STATE_UPDATE,
    payload: { schedule }
})

export const CANCEL_SCHEDULE_STATE_UPDATE_REQUEST = 'CANCEL_SCHEDULE_STATE_UPDATE_REQUEST';
export const cancelScheduleStateUpdateRequest = () => ({
    type: CANCEL_SCHEDULE_STATE_UPDATE_REQUEST,
})

export const COMPLETE_SCHEDULE_STATE_UPDATE_REQUEST = 'COMPLETE_SCHEDULE_STATE_UPDATE_REQUEST';
export const completeScheduleStateUpdateRequest = () => ({
    type: COMPLETE_SCHEDULE_STATE_UPDATE_REQUEST,
})

export const REQUEST_HEALTH_CHECK_SCHEDULE = 'REQUEST_HEALTH_CHECK_SCHEDULE';
export const requestHealthCheckSchedule = (healthCheck) => ({
    type: REQUEST_HEALTH_CHECK_SCHEDULE,
    payload: { healthCheck }
})

const CREATE_SUCCESS_MESSAGE = "The health check has been scheduled successfully.";
const CREATE_ERROR_MESSAGE = "The health check has not been scheduled.";
export const createSchedule = (schedule, redirect) => {
    return (dispath) => {
        dispath(isCallRequested(true));
        scheduleResource.createSchedule(schedule)
            .then(response => {
                dispath(isCallRequested(false));
                redirect()
                dispath(setNotificationMessage({
                    message: CREATE_SUCCESS_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_SUCCESS
                }));
            })
            .catch(error => handleCatchGlobally(dispath, error, error => {
                dispath(isCallRequested(false));
                dispath(setNotificationMessage({
                    message: CREATE_ERROR_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_ERROR
                }));
            }));
    }
}

const ERROR_MESSAGE = "The error occured."
const SUCCESS_MESSAGE = "The schedule has been removed successfully."
export const removeSchedule = (schedule, completeSuccessfully) => {
    return (dispath) => {
        dispath(isCallRequested(true))
        scheduleResource.deleteSchedule(schedule)
            .then(response => {
                dispath(isCallRequested(false))
                dispath(setNotificationMessage({
                    message: SUCCESS_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_SUCCESS
                }));
                completeSuccessfully()
                dispath(completeScheduleRemovalRequest())
            })
            .catch(error => handleCatchGlobally(dispath, error, error => {
                dispath(isCallRequested(false))
                dispath(setNotificationMessage({
                    message: ERROR_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_ERROR
                }));
                dispath(completeScheduleRemovalRequest())
            }));
    }
}

export const updateSchedule = (schedule, completeSuccessfully) => {
    return (dispath) => {
        dispath(isCallRequested(true))
        scheduleResource.updateSchedule(schedule)
            .then(response => {
                dispath(isCallRequested(false))
                dispath(setNotificationMessage({
                    message: SUCCESS_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_SUCCESS
                }));
                completeSuccessfully()
                dispath(completeScheduleStateUpdateRequest())
            })
            .catch(error => handleCatchGlobally(dispath, error, error => {
                dispath(isCallRequested(false))
                dispath(setNotificationMessage({
                    message: ERROR_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_ERROR
                }));
                dispath(completeScheduleStateUpdateRequest())
            }));
    }
}

export const saveSchedule = (schedule, redirect) => {
    return (dispath) => {
        console.log(schedule)
        schedule.id === undefined ? dispath(createSchedule(schedule, redirect)) : dispath(updateSchedule(schedule, redirect))
    }
}