import {
    metricsResource,
    handleCatchGlobally
} from '../service/CodelessApi.js';
import {
    isCallRequested
} from '../store/http-call-action';

export const SET_METRICS = 'SET_METRICS';
export const setMerics = (timeSeriesElements) => ({
    type: SET_METRICS,
    payload: { timeSeriesElements }
})

export const getPerfomanceMetrics = (scheduleId, startDate, endDate) => {
    return (dispath) => {
        dispath(isCallRequested(true));
        metricsResource.getMetrics(scheduleId, startDate, endDate)
            .then(response => {
                dispath(setMerics(response.data.timeSeriesElements));
                dispath(isCallRequested(false));
            })
            .catch(error => handleCatchGlobally(dispath, error, error => {
                dispath(isCallRequested(false));
            }));
    }
}