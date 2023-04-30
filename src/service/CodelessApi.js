import * as axios from "axios";
import * as common from "constants/Common";

import { setNotificationMessage } from "store/util-action";

const instance = axios.create({
    baseURL: "http://localhost:8080/codeless/",
    headers: {
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use(
    config => {
        let accessToken = localStorage.getItem(common.ACCESS_TOKEN);
        if (accessToken) {
            config.headers[common.ACCESS_TOKEN_HEADER] = accessToken;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

const TEST_RESOURCE = "tests";
export const testResource = {
    getTests(page, size) {
        return instance.get(TEST_RESOURCE + `?page=${page}&size=${size}`);
    },
    createTest(testToCreate) {
        let requestBodyTest = {
            name: testToCreate.name,
            json: testToCreate.requests
        };
        return instance.post(TEST_RESOURCE, requestBodyTest);
    },
    updateTest(testToUpdate) {
        let requestBodyTest = {
            id: testToUpdate.id,
            name: testToUpdate.name,
            json: testToUpdate.requests
        };
        return instance.put(TEST_RESOURCE, requestBodyTest);
    },
    getTest(name) {
        return instance.get(TEST_RESOURCE + '/' + name);
    },
    deleteTest(test) {
        console.log(test)
        return instance.delete(TEST_RESOURCE + '/' + test.id);
    },
}

const EXECUTION_RESOURCE = "executions";
const EXECUTION_RESULT_RESOURCE = "/results";
export const executionResource = {
    createExecution(execution) {
        let { region, healthCheck } = execution;
        let requestBodyExecution = {
            name: healthCheck.name,
            testId: healthCheck.id,
            region: region,
            type: "MANUAL_EXECUTION"
        };
        return instance.post(EXECUTION_RESOURCE, requestBodyExecution);
    },
    getExecutions(page, size) {
        return instance.get(EXECUTION_RESOURCE + `?page=${page}&size=${size}`);
    },
    getExecutionResult(executionId) {
        return instance.get(EXECUTION_RESOURCE + `/${executionId}` + EXECUTION_RESULT_RESOURCE);
    },
}

const SCHEDULE_RESOURCE = "schedules";
export const scheduleResource = {
    createSchedule(schedule) {
        let { scheduleName, region, healthCheck, timer, emails } = schedule;
        let requestBody = {
            scheduleName,
            region,
            testId: healthCheck.id,
            timer: timer,
            emails
        };
        return instance.post(SCHEDULE_RESOURCE, requestBody);
    },
    getSchedules(page, size) {
        return instance.get(SCHEDULE_RESOURCE + `?page=${page}&size=${size}`);
    }
}

const METRICS_RESOURCE = "metrics";
export const metricsResource = {

    getMetrics(scheduleId, startDate = startDateDefault(), endDate = endDateDefault()) {
        return instance.get(METRICS_RESOURCE + `?schedule_id=${scheduleId}&start_date=${startDate}&end_date=${endDate}`);
    }
}

function startDateDefault() {
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 2);
    return currentDate.toISOString();
}

function endDateDefault() {
    return new Date().toISOString();
}

const REGIONS_RESOURCE = "regions";
export const regionsResource = {
    getRegions() {
        return instance.get(REGIONS_RESOURCE);
    }
}

const USERS_RESOURCE = "users";
export const usersResource = {
    createUser(userRegistration) {
        return instance.post(USERS_RESOURCE, userRegistration);
    }
}

const AUTH_RESOURCE = "auth";
export const authResource = {
    logIn(user) {
        return instance.post(AUTH_RESOURCE + `/sign-in`, null, {
            auth: {
                username: user.email,
                password: user.password
            }
        });
    },
    logOut() {
        return instance.delete(AUTH_RESOURCE + `/sign-out`);
    }
}

export const handleCatchGlobally = (dispatch, error, handleCatchLocally) => {
    console.log(error?.response);
    if (error?.response?.status === 401) {
        if (localStorage.getItem(common.ACCESS_TOKEN)) {
            localStorage.removeItem(common.ACCESS_TOKEN);
            dispatch(setNotificationMessage({
                message: "Your session expired. Click here to renew your session.",
                severity: common.NOTIFICATION_SEVERITY_WARNING
            }));
        }
        return;
    }
    handleCatchLocally(error);
}