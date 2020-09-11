import {
    CLEAN_HEALTH_CHECKS,
    SET_HEALTH_CHECKS,
    REQUEST_HEALTH_CHECK_REMOVAL
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
            const { healthCheckIndex } = payload;
            const newHealthChecksState = {
                ...state,
                healthCheckIndex,
                isHealthCheckRemovalRequsted: true
            }
            console.log(newHealthChecksState)
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