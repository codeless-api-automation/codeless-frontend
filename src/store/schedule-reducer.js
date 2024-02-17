import {
    REQUEST_HEALTH_CHECK_SCHEDULE,
    CANCEL_SCHEDULE_REMOVAL_REQUEST,
    COMPLETE_SCHEDULE_REMOVAL_REQUEST,
    REQUEST_SCHEDULE_REMOVAL
} from './schedule-action'

const initState = {
    isScheduleRemovalRequsted: false
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
        case REQUEST_SCHEDULE_REMOVAL: {
            const { schedule } = payload;
            const newState = {
                ...state,
                requestedSchedule: schedule,
                isScheduleRemovalRequsted: true
            }
            return newState;
        }
        case COMPLETE_SCHEDULE_REMOVAL_REQUEST:
        case CANCEL_SCHEDULE_REMOVAL_REQUEST: {
            const newState = {
                ...state,
                isScheduleRemovalRequsted: false
            }
            return newState;
        }
        default:
            return state;
    }
}