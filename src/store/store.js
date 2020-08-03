import { createStore, combineReducers } from 'redux';
import { validatorReducer } from './validator-reducer';
import { testCaseReducer } from './test-case-reducer';

const reducers = {
    verificationsTab: validatorReducer,
    testCasePage: testCaseReducer
};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer);