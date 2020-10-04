import _ from 'lodash'
import {
    CREATE_VALIDATOR,
    REMOVE_VALIDATOR,
    UPDATE_PREDICATE,
    UPDATE_INPUT_FIELD,
    CLEAN_VALIDATORS,
    UPDATE_VALIDATORS
} from './validator-action'

export const validatorReducer = (state = [], action) => {
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
        case UPDATE_INPUT_FIELD: {
            const { validator, inputField, newInputFieldValue } = payload;

            let inputFields = _.cloneDeep(validator.inputFields);
            inputFields.forEach(updateInputField(inputField, newInputFieldValue));

            let copiedValidatorWithUpdatedInputFields = _.cloneDeep(validator);
            copiedValidatorWithUpdatedInputFields.inputFields = inputFields;

            let validatorIndexNeededUpdate = state.findIndex(validatorFromStore => _.isEqual(validatorFromStore, validator));

            let newValidators = state.slice();
            newValidators[validatorIndexNeededUpdate] = copiedValidatorWithUpdatedInputFields

            return newValidators;
        }
        case UPDATE_VALIDATORS: {
            const { validators } = payload;
            return validators;
        }
        case CLEAN_VALIDATORS: {
            return [];
        }
        default:
            return state;
    }
}

function updateInputField(inputFieldToUpdate, newInputFieldValue) {
    return (inputField) => {
        if (_.isEqual(inputField, inputFieldToUpdate)) {
            inputField.value = newInputFieldValue;
        }
    };
}
