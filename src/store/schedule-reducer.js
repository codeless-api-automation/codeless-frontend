import {
    REQUEST_HEALTH_CHECK_SCHEDULE,
    SET_SCHEDULES
} from './schedule-action'

const initState = {
    schedules: []
}

export const scheduleReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case REQUEST_HEALTH_CHECK_SCHEDULE: {
            const { healthCheck } = payload;
            const newState = {
                ...state,
                requestedHealthCheck: healthCheck
            }
            return newState;
        }
        case SET_SCHEDULES: {
            const { schedules } = payload;
            const newState = {
                ...state,
                schedules: schedules
            }
            return newState;
        }
        default:
            return state;
    }
}