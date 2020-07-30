export const CREATE_VALIDATOR = 'CREATE_VALIDATOR';
export const createValidator = (validator, predicate) => ({
    type: CREATE_VALIDATOR,
    payload: { validator, predicate}
});

export const REMOVE_VALIDATOR = 'REMOVE_VALIDATOR';
export const removeValidator = validator => ({
    type: REMOVE_VALIDATOR,
    payload: { validator }
})

export const UPDATE_PREDICATE = 'UPDATE_PREDICATE';
export const updatePredicate = (validator, newPredicateValue) => ({
    type: UPDATE_PREDICATE,
    payload: { validator, newPredicateValue }
})