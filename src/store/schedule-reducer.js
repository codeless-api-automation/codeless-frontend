import {
    REQUEST_HEALTH_CHECK_SCHEDULE,
    SET_SCHEDULES,
    CLEAN_CHOSEN_SCHEDULES,
    CANCEL_SCHEDULE_REMOVAL_REQUEST,
    COMPLETE_SCHEDULE_REMOVAL_REQUEST,
    REQUEST_SCHEDULE_REMOVAL
} from './schedule-action'

const initState = {
    schedules: [],
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
        case SET_SCHEDULES: {
            const { schedules } = payload;
            const newState = {
                ...state,
                schedules: schedules
            }
            return newState;
        }
        case CLEAN_CHOSEN_SCHEDULES: {
            const { schedules } = payload;
            const schedulesAfterRemoval =
                state.schedules.filter((schedule) => !schedules.includes(schedule));
            const newSchedulesState = {
                ...state,
                schedules: schedulesAfterRemoval
            }
            return newSchedulesState;
        }
        default:
            return state;
    }
}