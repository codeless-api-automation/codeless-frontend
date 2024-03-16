import * as common from "constants/Common";

export const NOTIFICATION_MESSAGE = 'NOTIFICATION_MESSAGE';
export const setNotificationMessage = (notificationMessage) => ({
    type: NOTIFICATION_MESSAGE,
    payload: { notificationMessage }
})

export const setErrorNotification = (message) => {
    return (dispath) => {
        dispath(setNotificationMessage({
            message: message,
            severity: common.NOTIFICATION_SEVERITY_ERROR
        }));
    }
}