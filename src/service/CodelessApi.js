import * as axios from "axios";
import * as common from "constants/Common";

import { configureStore } from "store/store";
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

instance.interceptors.response.use(response => response,
    error => {
        if (error.response.status === 401 && localStorage.getItem(common.ACCESS_TOKEN)) {
            localStorage.removeItem(common.ACCESS_TOKEN);
            const store = configureStore();
            store.dispatch(setNotificationMessage({
                message: "Your session has expired. Would you like to be redirected to the login page?",
                severity: common.NOTIFICATION_SEVERITY_WARNING
            }));
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

const TEST_RESOURCE = "tests";
export const testResource = {
    getTests(page, size) {
        return instance.get(TEST_RESOURCE + `?page=${page}&size=${size}`);
    },
    createTest(testToCreate) {
        let { test, validators } = testToCreate;
        let requestBodyTest = {
            name: test.name,
            json: { ...test, validators }
        };
        return instance.post(TEST_RESOURCE, requestBodyTest);
    },
    updateTest(testToUpdate) {
        let { test, validators } = testToUpdate;
        let requestBodyTest = {
            id: test.id,
            name: test.name,
            json: { ...test, validators }
        };
        return instance.put(TEST_RESOURCE, requestBodyTest);
    },
    getTest(name) {
        return instance.get(TEST_RESOURCE + '/' + name);
    },
    deleteTests(tests) {
        return instance.patch(TEST_RESOURCE, tests);
    },
}

const EXECUTION_RESOURCE = "executions";
const EXECUTION_RESULT_RESOURCE = "/results";
export const executionResource = {
    createExecution(execution) {
        let { region, healthChecks } = execution;
        let requestBodyExecution = {
            name: healthChecks[0].name,
            region: region,
            tests: [...healthChecks],
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
        let { scheduleName, region, healthCheck, timer, emails} = schedule;
        let requestBody = {
            scheduleName,
            region,
            tests: [healthCheck],
            timer: timer,
            emails
        };
        return instance.post(SCHEDULE_RESOURCE, requestBody);
    },
    getSchedules(page, size) {
        return instance.get(SCHEDULE_RESOURCE + `?page=${page}&size=${size}`);
    }
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

export const handleCatchGlobally = (error, handleCatchLocally) => {
    console.log(error?.response);
    if (error?.response?.status === 401) {
        return;
    }
    handleCatchLocally(error);
}