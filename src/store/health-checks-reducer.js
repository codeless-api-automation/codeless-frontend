import {
    CLEAN_HEALTH_CHECKS,
    ADD_HEALTH_CHECKS
} from './health-checks-action'

export const healthChecksReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_HEALTH_CHECKS: {
            const { healthChecks } = payload;
            return state.concat(healthChecks);
        }
        case CLEAN_HEALTH_CHECKS: {
            return [];
        }
        default:
            return state;
    }
}