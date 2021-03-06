import {
    NOTIFICATION_MESSAGE
} from './util-action.js'

export const utilReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case NOTIFICATION_MESSAGE: {
            const { notificationMessage } = payload;
            console.log(notificationMessage);
            return { ...state, notificationMessage };
        }
        default:
            return state;
    }
}