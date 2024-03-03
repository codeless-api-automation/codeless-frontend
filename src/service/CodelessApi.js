import * as axios from "axios";
import * as common from "constants/Common";

import { setNotificationMessage } from "store/util-action";

const instance = axios.create({
    baseURL: "https://ws.api-sentinel.com/api/",
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
    getTests(nextToken, maxResults) {
        return instance.get(TEST_RESOURCE, {
            params: commonUrlParam(nextToken, maxResults)
        });
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
    getExecutions(nextToken, maxResults) {
        return instance.get(EXECUTION_RESOURCE, {
            params: commonUrlParam(nextToken, maxResults)
        });
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
    getSchedules(nextToken, maxResults) {
        return instance.get(SCHEDULE_RESOURCE, {
            params: commonUrlParam(nextToken, maxResults)
        });
    },
    getExecutionsByScheduleId(scheduleId, nextToken, maxResults) {
        const urlParam = commonUrlParam(nextToken, maxResults)
        return instance.get(SCHEDULE_RESOURCE + '/' + scheduleId + '/' + EXECUTION_RESOURCE, {
            params: urlParam
        });
    },
    deleteSchedule(schedule) {
        return instance.delete(SCHEDULE_RESOURCE + '/' + schedule.id);
    },
    updateSchedule(scheduleToUpdate) {
        const requestBodySchedule = {};
        requestBodySchedule['id'] = scheduleToUpdate.id;
        if (scheduleToUpdate.state !== null && scheduleToUpdate.state !== undefined) {
            requestBodySchedule['state'] = scheduleToUpdate.state;
        }
        if (scheduleToUpdate.emails !== null && scheduleToUpdate.emails !== undefined) {
            requestBodySchedule['emails'] = scheduleToUpdate.emails;
        }
        return instance.put(SCHEDULE_RESOURCE, requestBodySchedule);
    }
}

const METRICS_RESOURCE = "metrics";
export const metricsResource = {
    getMetrics(scheduleId, startDate = startDateDefault(), endDate = endDateDefault()) {
        return instance.get(METRICS_RESOURCE + `?schedule_id=${scheduleId}&start_date=${startDate}&end_date=${endDate}`);
    }
}

const PROFILE_RESOURCE = "profiles";
export const profileResource = {

    getProfile() {
        return instance.get(PROFILE_RESOURCE);
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

function commonUrlParam(nextToken, maxResults) {
    const queryParams = {};
    if (nextToken !== null && nextToken !== undefined) {
        queryParams["next_token"] = nextToken;
    }
    if (maxResults !== null && maxResults !== undefined) {
        queryParams["max_results"] = maxResults;
    }
    return queryParams;
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