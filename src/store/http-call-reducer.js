import {
    CALL_REQUESTED,
    CALL_SUCCESSFUL,
    CALL_FAILED
} from './http-call-action'

const httpCallState = {
    isCallRequested: false,
    isCallSuccessful: false,
    isCallFailed: false
};

export const httpCallReducer = (state = httpCallState, action) => {
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