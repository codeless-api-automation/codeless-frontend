import {
    CLEAN_HEALTH_CHECKS,
    CLEAN_CHOSEN_HEALTH_CHECKS,
    SET_HEALTH_CHECKS,
    REQUEST_HEALTH_CHECK_REMOVAL,
    CANCEL_HEALTH_CHECK_REMOVAL_REQUEST,
    COMPLETE_HEALTH_CHECK_REMOVAL_REQUEST
} from './health-checks-action'

const initState = {
    isHealthCheckRemovalRequsted: false
}

export const healthChecksReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_HEALTH_CHECKS: {
            const { healthChecks } = payload;
            const newHealthChecksState = {
                ...state,
                healthChecks: healthChecks
            }
            return newHealthChecksState;
        }
        case REQUEST_HEALTH_CHECK_REMOVAL: {
            const { healthCheck } = payload;
            const newHealthChecksState = {
                ...state,
                requestedHealthCheck: healthCheck,
                isHealthCheckRemovalRequsted: true
            }
            return newHealthChecksState;
        }
        case COMPLETE_HEALTH_CHECK_REMOVAL_REQUEST:
        case CANCEL_HEALTH_CHECK_REMOVAL_REQUEST: {
            const newHealthChecksState = {
                ...state,
                isHealthCheckRemovalRequsted: false
            }
            return newHealthChecksState;
        }
        case CLEAN_CHOSEN_HEALTH_CHECKS: {
            const { healthChecks } = payload;
            const healthChecksAfterRemoval =
                state.healthChecks.filter((healthCheck) => !healthChecks.includes(healthCheck));
            const newHealthChecksState = {
                ...state,
                healthChecks: healthChecksAfterRemoval
            }
            return newHealthChecksState;
        }
        case CLEAN_HEALTH_CHECKS: {
            const newHealthChecksState = {
                ...state,
                healthChecks: []
            }
            return newHealthChecksState;
        }
        default:
            return state;
    }
}