import {
    SET_METRICS
} from './metrics-action'

const initState = {
    timeSeriesElements: []
}

export const metricsReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_METRICS: {
            const { timeSeriesElements } = payload;
            const newState = {
                ...state,
                timeSeriesElements: timeSeriesElements
            }
            return newState;
        }
        default:
            return state;
    }
}