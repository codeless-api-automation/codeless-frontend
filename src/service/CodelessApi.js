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
    createTest(testToCreate) {
        let { test, validators } = testToCreate;
        let requestBodyTest = {
            name: test.name,
            json: { ...test, validators }
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