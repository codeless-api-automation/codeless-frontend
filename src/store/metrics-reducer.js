import {
    SET_METRICS
} from './metrics-action'

const initState = {
    metrics: []
}

export const metricsReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_METRICS: {
            const { metrics } = payload;
            const newState = {
                ...state,
                metrics: metrics
            }
            return newState;
        }
        default:
            return state;
    }
}