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
            name: testCase.testName,
            json: { ...testCase, validators }
        };
        console.log(requestBodyTest)
        return instance.post(TEST_RESOURCE, requestBodyTest);
    },
    getTest(testId) {
        return instance.get(TEST_RESOURCE + '?testId=' + testId);
    },
    deleteTest(testId) {
        return instance.delete(TEST_RESOURCE + '?testId=' + testId);
    },
}