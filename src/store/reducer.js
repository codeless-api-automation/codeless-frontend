import _ from 'lodash'
import {
    CREATE_VALIDATOR,
    REMOVE_VALIDATOR,
    UPDATE_PREDICATE
} from './actions'

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
        case UPDATE_PREDICATE: {
            const { validator, newPredicateValue } = payload;

            let copiedValidatorWithUpdatedPredicate = _.cloneDeep(validator);
            copiedValidatorWithUpdatedPredicate.predicate = newPredicateValue;

            let validatorIndexNeededUpdate = state.findIndex(validatorFromStore => _.isEqual(validatorFromStore, validator));

            let newValidators = state.slice();
            newValidators[validatorIndexNeededUpdate] = copiedValidatorWithUpdatedPredicate

            return newValidators;
        }

        default:
            return state;
    }
}