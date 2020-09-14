import {
    REQUEST_EXECUTION,
    CANCELE_EXECUTION_REQUEST,
    COMPLETE_EXECUTION_REQUEST,
    SET_REGIONS
} from './execution-action'

const initState = {
    isExecutionRequsted: false
}

export const executionHelperReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case REQUEST_EXECUTION: {
            const { healthCheckIndex } = payload;
            const newState = {
                ...state,
                healthCheckIndex,
                isExecutionRequsted: true
            }
            return newState;
        }
        case COMPLETE_EXECUTION_REQUEST:
        case CANCELE_EXECUTION_REQUEST: {
            const newState = {
                ...state,
                isExecutionRequsted: false
            }
            return newState;
        }
        case SET_REGIONS: {
            const { regions } = payload;
            const newState = {
                ...state,
                regions,
                defaultRegion: getDefaultRegio(regions),
            }
            return newState;
        }
        default:
            return state;
    }
}

const getDefaultRegio = (regions) => regions.find(region => region['defaultRegion']);