import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { validatorReducer } from './validator-reducer';
import { testReducer } from './test-reducer';
import { httpCallReducer } from './http-call-reducer';
import { healthChecksReducer } from './health-checks-reducer';
import { utilReducer } from './util-reducer';
import { executionHelperReducer } from './execution-reducer';
import { scheduleReducer } from './schedule-reducer';



const reducers = {
    httpCallResult: httpCallReducer,
    verificationsTab: validatorReducer,
    testPage: testReducer,
    healthChecksPage: healthChecksReducer,
    utilEvents: utilReducer,
    executionHelper: executionHelperReducer,
    scheduleHelper: scheduleReducer
};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));