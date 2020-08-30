import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { validatorReducer } from './validator-reducer';
import { testReducer } from './test-reducer';
import { httpCallReducer } from './http-call-reducer';

const reducers = {
    httpCallResult: httpCallReducer,
    verificationsTab: validatorReducer,
    testPage: testReducer
};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));