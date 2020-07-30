import _ from 'lodash'
import { CREATE_VALIDATOR, REMOVE_VALIDATOR } from './actions'

export const validators = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATE_VALIDATOR: {
            const { validator, predicate } = payload;
            let newValidator = {
                ..._.cloneDeep(validator),
                predicate
            };
            return state.concat(newValidator);
        }
        case REMOVE_VALIDATOR: {
            const { validator } = payload;
            return state.filter((validatorFromStore) => !_.isEqual(validatorFromStore, validator))
        }
        default:
            return state;
    }
}