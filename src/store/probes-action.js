import { testResource } from '../service/CodelessApi.js';
import {
    isCallRequested,
    isCallSuccessful,
    isCallFailed
} from '../store/http-call-action';

export const CLEAN_PROBES = 'CLEAN_PROBES';
export const cleanProbes = () => ({
    type: CLEAN_PROBES
})

export const ADD_PROBES = 'ADD_PROBES';
export const addProbes = probes => ({
    type: ADD_PROBES,
    payload: { probes }
})

export const getProbes = (page = 0, size = 5) => {
    return (dispath) => {
        isCallRequested(true);
        testResource.getTests(page, size)
            .then(response => {
                dispath(isCallRequested(false));
                if (response.status === 200) {
                    dispath(isCallSuccessful(true));
                    dispath(cleanProbes())
                    dispath(addProbes(response.data.items))
                } else {
                    dispath(isCallFailed(true));
                }
            })
            .catch(error => {
                dispath(isCallFailed(true));
            });
    }
}