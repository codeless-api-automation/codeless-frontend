import {
    ADD_PROBES
} from './probes-action'

export const probesReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_PROBES: {
            const { probes } = payload;
            return state.concat(probes);
        }
        default:
            return state;
    }
}