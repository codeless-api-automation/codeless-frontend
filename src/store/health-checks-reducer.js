import {
    CLEAN_HEALTH_CHECKS,
    SET_HEALTH_CHECKS
} from './health-checks-action'

export const healthChecksReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_HEALTH_CHECKS: {
            const { healthChecks } = payload;
            return healthChecks;
        }
        case CLEAN_HEALTH_CHECKS: {
            return [];
        }
        default:
            return state;
    }
}