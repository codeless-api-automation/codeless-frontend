import { testResource } from '../service/CodelessApi.js';
import {
    isCallRequested,
    isCallSuccessful,
    isCallFailed
} from '../store/http-call-action';

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
                console.log(response);
                dispath(isCallRequested(false));
                if (response.status === 200) {
                    dispath(isCallSuccessful(true));
                    dispath(addProbes(response.data.items))
                } else {
                    dispath(isCallFailed(true));
                }
            })
            .catch(error => {
                console.log(error);
                dispath(isCallFailed(true));
            });
    }
}