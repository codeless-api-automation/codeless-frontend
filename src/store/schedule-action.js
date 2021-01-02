import {
    scheduleResource
} from '../service/CodelessApi.js';

import {
    isCallRequested,
    isCallSuccessful,
    isCallFailed
} from '../store/http-call-action';

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
                if (response.status === 200) {
                    dispath(isCallSuccessful(true));
                    dispath(setSchedules(response.data.items));
                } else {
                    dispath(isCallFailed(true));
                }
                dispath(isCallRequested(false));
            })
            .catch(error => {
                console.log(error);
                dispath(isCallRequested(false));
                dispath(isCallFailed(true));
            });
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
                if (response.status === 200) {
                    dispath(isCallSuccessful(true, SUCCESS_MESSAGE));
                } else {
                    dispath(isCallFailed(true, ERROR_MESSAGE));
                }
            })
            .catch(error => {
                console.log(error);
                dispath(isCallRequested(false));
                dispath(isCallFailed(true, ERROR_MESSAGE));
            });
    }
}