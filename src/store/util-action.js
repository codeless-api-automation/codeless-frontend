export const REDIRECT = 'REDIRECT';
export const redirect = link => ({
    type: REDIRECT,
    payload: link
})

export const NOTIFICATION_MESSAGE = 'NOTIFICATION_MESSAGE';
export const setNotificationMessage = (notificationMessage) => ({
    type: NOTIFICATION_MESSAGE,
    payload: { notificationMessage }
})