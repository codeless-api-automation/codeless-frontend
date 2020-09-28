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
        let { id, test, validators } = testToUpdate;
        let requestBodyTest = {
            id,
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
export const executionResource = {
    createExecution(execution) {
        let { region, healthChecks } = execution;
        let requestBodyExecution = {
            name: healthChecks[0].name,
            region: region,
            tests: [...healthChecks]
        };
        return instance.post(EXECUTION_RESOURCE, requestBodyExecution);
    },
    getExecutions(page, size) {
        return instance.get(EXECUTION_RESOURCE + `?page=${page}&size=${size}`);
    },
}

const REGIONS_RESOURCE = "regions";
export const regionsResource = {
    getRegions() {
        return instance.get(REGIONS_RESOURCE);
    }
}