import {
    CALL_REQUESTED,
    CALL_SUCCESSFUL,
    CALL_FAILED
} from './http-call-action'

export const httpCallReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case CALL_REQUESTED: {
            const { isCallRequested } = payload;
            let newHttpCallState = {
                ...state,
                isCallRequested
            }
            return newHttpCallState;
        }
        case CALL_SUCCESSFUL: {
            const { isCallSuccessful, message } = payload;
            let newHttpCallState = {
                ...state,
                isCallSuccessful,
                message
            }
            return newHttpCallState;
        }
        case CALL_FAILED: {
            const { isCallFailed, message } = payload;
            let newHttpCallState = {
                ...state,
                isCallFailed,
                message
            }
            return newHttpCallState;
        }
        default:
            return state;
    }
}