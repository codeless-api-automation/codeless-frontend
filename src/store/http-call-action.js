export const CALL_REQUESTED = 'CALL_REQUESTED';
export const isCallRequested = isCallRequested => ({
    type: CALL_REQUESTED,
    payload: { isCallRequested }
})

export const CALL_SUCCESSFUL = 'CALL_SUCCESSFUL';
export const isCallSuccessful = (isCallSuccessful, message) => ({
    type: CALL_SUCCESSFUL,
    payload: { isCallSuccessful, message }
})

export const CALL_FAILED = 'CALL_FAILED';
export const isCallFailed = (isCallFailed, message) => ({
    type: CALL_FAILED,
    payload: { isCallFailed, message }
})