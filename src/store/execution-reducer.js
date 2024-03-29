import {
    REQUEST_HEALTH_CHECK_EXECUTION,
    CANCELE_EXECUTION_REQUEST,
    COMPLETE_EXECUTION_REQUEST,
    SET_REGIONS,
    SET_EXECUTION_RESULT
} from './execution-action'

const initState = {
    isExecutionRequsted: false,
}

export const executionHelperReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case REQUEST_HEALTH_CHECK_EXECUTION: {
            const { healthCheck } = payload;
            const newHealthChecksState = {
                ...state,
                isExecutionRequsted: true,
                requestedHealthCheck: healthCheck
            }
            return newHealthChecksState;
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
        case SET_EXECUTION_RESULT: {
            const { executionResult } = payload;
            const newState = {
                ...state,
                executionResult: executionResult
            }
            return newState;
        }
        default:
            return state;
    }
}

const getDefaultRegio = (regions) => regions.find(region => region['defaultRegion']);