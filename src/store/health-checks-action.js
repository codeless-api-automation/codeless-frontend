import { testResource } from '../service/CodelessApi.js';
import {
    isCallRequested,
    isCallFailed
} from './http-call-action';

export const CLEAN_HEALTH_CHECKS = 'CLEAN_HEALTH_CHECKS';
export const cleanHealthChecks = () => ({
    type: CLEAN_HEALTH_CHECKS
})

export const ADD_HEALTH_CHECKS = 'ADD_HEALTH_CHECKS';
export const addHealthChecks = healthChecks => ({
    type: ADD_HEALTH_CHECKS,
    payload: { healthChecks }
})

const ERROR_MESSAGE = "The error occured!"
export const getHealthChecks = (page = 0, size = 20) => {
    return (dispath) => {
        isCallRequested(true)
        testResource.getTests(page, size)
            .then(response => {
                dispath(isCallRequested(false))
                if (response.status === 200) {
                    dispath(cleanHealthChecks())
                    dispath(addHealthChecks(response.data.items))
                } else {
                    dispath(isCallFailed(true, ERROR_MESSAGE))
                }
            })
            .catch(error => {
                console.log(error)
                dispath(isCallFailed(true, ERROR_MESSAGE))
            });
    }
}