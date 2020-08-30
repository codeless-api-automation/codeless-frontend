import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { validatorReducer } from './validator-reducer';
import { testCaseReducer } from './test-reducer';

const reducers = {
    verificationsTab: validatorReducer,
    testCasePage: testCaseReducer
};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));