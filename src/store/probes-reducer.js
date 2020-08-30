import {
    ADD_PROBE
} from './probes-action'

export const probesReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_PROBE: {
            const { probe } = payload;
            return state.concat(probe);
        }
        default:
            return state;
    }
}