import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost/codeless/",
    headers: { "Content-Type": "application/json" }
});

const TEST_RESOURCE = "tests";
export const testResource = {
    getTests() {
        return instance.get(TEST_RESOURCE);
    },
    createTest(test) {
        return instance.post(TEST_RESOURCE, test);
    },
    getTest(testId) {
        return instance.get(TEST_RESOURCE + '?testId=' + testId);
    },
    deleteTest(testId) {
        return instance.delete(TEST_RESOURCE + '?testId=' + testId);
    },
}