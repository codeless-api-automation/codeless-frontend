import {
    metricsResource,
    handleCatchGlobally
} from '../service/CodelessApi.js';
import {
    isCallRequested
} from '../store/http-call-action';

export const SET_METRICS = 'SET_METRICS';
export const setMerics = (metrics) => ({
    type: SET_METRICS,
    payload: { metrics }
})

export const getPerfomanceMetrics = (scheduleName, startDate, endDate) => {
    return (dispath) => {
        dispath(isCallRequested(true));
        metricsResource.getMetrics(scheduleName, startDate, endDate)
            .then(response => {
                dispath(setMerics(response.data.responsePoints));
                dispath(isCallRequested(false));
            })
            .catch(error => handleCatchGlobally(dispath, error, error => {
                dispath(isCallRequested(false));
            }));
    }
}