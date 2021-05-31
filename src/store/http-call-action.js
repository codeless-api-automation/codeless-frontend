export const CALL_REQUESTED = 'CALL_REQUESTED';
export const isCallRequested = isCallRequested => ({
    type: CALL_REQUESTED,
    payload: { isCallRequested }
})