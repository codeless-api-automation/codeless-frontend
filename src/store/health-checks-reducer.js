import {
    REQUEST_HEALTH_CHECK_REMOVAL,
    CANCEL_HEALTH_CHECK_REMOVAL_REQUEST,
    COMPLETE_HEALTH_CHECK_REMOVAL_REQUEST
} from './health-checks-action'

const initState = {
    healthChecks: [],
    isHealthCheckRemovalRequsted: false
}

export const healthChecksReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
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
        default:
            return state;
    }
}