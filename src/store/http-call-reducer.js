import {
    CALL_REQUESTED
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
        default:
            return state;
    }
}