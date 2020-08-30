export const ADD_PROBE = 'ADD_PROBE';
export const addProbe = probe => ({
    type: ADD_PROBE,
    payload: { probe }
})