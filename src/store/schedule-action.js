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

export const CLEAN_CHOSEN_SCHEDULES = 'CLEAN_CHOSEN_SCHEDULES';
export const cleanChosenSchedules = (schedules) => ({
    type: CLEAN_CHOSEN_SCHEDULES,
    payload: { schedules }
})

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
            .catch(error => handleCatchGlobally(dispath, error, error => {
                dispath(isCallRequested(false));
            }));
    }
}

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
export const removeSchedule = (schedule) => {
    return (dispath) => {
        dispath(isCallRequested(true))
        scheduleResource.deleteSchedule(schedule)
            .then(response => {
                dispath(isCallRequested(false))
                dispath(setNotificationMessage({
                    message: SUCCESS_MESSAGE,
                    severity: common.NOTIFICATION_SEVERITY_SUCCESS
                }));
                dispath(cleanChosenSchedules([schedule]))
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

export const updateSchedule = (schedule) => {
    return (dispath) => {
    }
}

export const saveSchedule = (schedule, redirect) => {
    return (dispath) => {
        console.log(schedule)
        schedule.id === undefined ? dispath(createSchedule(schedule, redirect)) : dispath(updateSchedule(schedule, redirect))
    }
}