import { createStore, combineReducers } from 'redux';
import { validatorReducer } from './validator-reducer'

const reducers = {
    verificationsTab: validatorReducer
};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer);