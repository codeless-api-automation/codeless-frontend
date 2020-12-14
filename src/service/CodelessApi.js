import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/codeless/",
    headers: { "Content-Type": "application/json" }
});

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

const REGIONS_RESOURCE = "regions";
export const regionsResource = {
    getRegions() {
        return instance.get(REGIONS_RESOURCE);
    }
}