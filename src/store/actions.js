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