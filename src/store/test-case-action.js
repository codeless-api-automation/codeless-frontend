export const UPDATE_USER_STORY = 'UPDATE_USER_STORY';
export const updateUserStory = (userStory) => ({
    type: UPDATE_USER_STORY,
    payload: { userStory }
});

export const UPDATE_TEST_NAME = 'UPDATE_TEST_NAME';
export const updateTestName = (testName) => ({
    type: UPDATE_TEST_NAME,
    payload: { testName }
});

export const UPDATE_HTTP_METHOD = 'UPDATE_HTTP_METHOD';
export const updateHttpMethod = httpMethod => ({
    type: UPDATE_HTTP_METHOD,
    payload: { httpMethod }
})

export const UPDATE_REQUEST_URL = 'UPDATE_REQUEST_URL';
export const updateRequestUrl = requestURL => ({
    type: UPDATE_REQUEST_URL,
    payload: { requestURL }
})