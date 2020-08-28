import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/codeless/",
    headers: { "Content-Type": "application/json" }
});

const TEST_RESOURCE = "tests";
export const testResource = {
    getTests() {
        return instance.get(TEST_RESOURCE);
    },
    createTest(test) {
        let { testCase, validators } = test;
        let requestBodyTest = {
            name: testCase.probeName,
            json: { ...testCase, validators }
        };
        return instance.post(TEST_RESOURCE, requestBodyTest);
    },
    getTest(name) {
        return instance.get(TEST_RESOURCE + '/' + name);
    },
    deleteTest(name) {
        return instance.delete(TEST_RESOURCE + '/' + name);
    },
}