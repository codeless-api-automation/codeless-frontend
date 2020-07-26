import { createStore, combineReducers } from 'redux';
import { validators } from './reducer'

const reducers = { validators };

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer);