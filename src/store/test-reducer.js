import _ from 'lodash'

import {
    UPDATE_NAME,
    UPDATE_HTTP_METHOD,
    UPDATE_REQUEST_URL,
    UPDATE_REQUEST_BODY,
    CLEAN_TEST_ATTRIBUTES,
    UPDATE_ID,
    ADD_HEADER,
    REMOVE_HEADER,
    UPDATE_HEADER,
    SET_HEADER,
    CREATE_VALIDATOR,
    REMOVE_VALIDATOR,
    UPDATE_VALIDATOR_PREDICATE,
    UPDATE_VALIDATOR_INPUT_FIELD,
    UPDATE_VALIDATORS,
    CREATE_EXTRACTOR,
    REMOVE_EXTRACTOR
} from './test-action'

const initialTestState = {
    httpMethod: 'GET',
    headers: [],
    validators: [],
    extractors: []
}

export const testReducer = (state = initialTestState, action) => {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_ID: {
            const { id } = payload;
            let test = {
                ...state,
                id
            }
            return test;
        }
        case UPDATE_NAME: {
            const { name } = payload;
            let test = {
                ...state,
                name
            }
            return test;
        }
        case UPDATE_HTTP_METHOD: {
            const { httpMethod } = payload;
            let test = {
                ...state,
                httpMethod
            }
            return test;
        }
        case UPDATE_REQUEST_URL: {
            const { requestURL } = payload;
            let test = {
                ...state,
                requestURL
            }
            return test;
        }
        case UPDATE_REQUEST_BODY: {
            const { requestBody } = payload;
            let test = {
                ...state,
                requestBody
            }
            return test;
        }
        case ADD_HEADER: {
            const { name, value } = payload;
            let headers = state.headers.concat({ name, value });
            let test = {
                ...state,
                headers
            }
            console.log(test)
            return test;
        }
        case REMOVE_HEADER: {
            const { headerIndex } = payload;
            let headers = state.headers.filter((header, index) => index !== headerIndex);

            let test = {
                ...state,
                headers
            }
            return test;
        }
        case UPDATE_HEADER: {
            const { headerIndex, newHeader } = payload;

            let headers = state.headers.slice();
            headers[headerIndex] = { ...newHeader };

            let test = {
                ...state,
                headers
            }
            return test;
        }
        case SET_HEADER: {
            const { headers } = payload;
            let test = {
                ...state,
                headers
            }
            return test;
        }
        case CREATE_EXTRACTOR: {
            const { extractor } = payload;
            let test = {
                ...state,
                extractors: state.extractors.concat(extractor)
            }
            return test;
        }
        case REMOVE_EXTRACTOR: {
            const { extractor } = payload;
            let test = {
                ...state,
                extractors: state.extractors.filter((extractorFromStore) => !_.isEqual(extractorFromStore, extractor))
            }
            return test;
        }
        case CREATE_VALIDATOR: {
            const { validator, predicate } = payload;
            let newValidator = {
                ..._.cloneDeep(validator),
                predicate
            };

            let test = {
                ...state,
                validators: state.validators.concat(newValidator)
            }
            return test;
        }
        case REMOVE_VALIDATOR: {
            const { validator } = payload;
            let test = {
                ...state,
                validators: state.validators.filter((validatorFromStore) => !_.isEqual(validatorFromStore, validator))
            }
            return test;
        }
        case UPDATE_VALIDATOR_PREDICATE: {
            const { validator, newPredicateValue } = payload;

            let copiedValidatorWithUpdatedPredicate = _.cloneDeep(validator);
            copiedValidatorWithUpdatedPredicate.predicate = newPredicateValue;

            let validatorIndexNeededUpdate = state.validators.findIndex(validatorFromStore => _.isEqual(validatorFromStore, validator));

            let newValidators = state.validators.slice();
            newValidators[validatorIndexNeededUpdate] = copiedValidatorWithUpdatedPredicate

            let test = {
                ...state,
                validators: newValidators
            }

            return test;
        }
        case UPDATE_VALIDATOR_INPUT_FIELD: {
            const { validator, inputField, newInputFieldValue } = payload;

            let inputFields = _.cloneDeep(validator.inputFields);
            inputFields.forEach(updateInputField(inputField, newInputFieldValue));

            let copiedValidatorWithUpdatedInputFields = _.cloneDeep(validator);
            copiedValidatorWithUpdatedInputFields.inputFields = inputFields;

            let validatorIndexNeededUpdate = state.validators.findIndex(validatorFromStore => _.isEqual(validatorFromStore, validator));

            let newValidators = state.validators.slice();
            newValidators[validatorIndexNeededUpdate] = copiedValidatorWithUpdatedInputFields

            let test = {
                ...state,
                validators: newValidators
            }

            return test;
        }
        case UPDATE_VALIDATORS: {
            const { validators } = payload;
            let test = {
                ...state,
                validators: validators
            }
            return test;
        }
        case CLEAN_TEST_ATTRIBUTES: {
            return initialTestState;
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