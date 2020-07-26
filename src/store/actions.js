export const CREATE_VALIDATOR = 'CREATE_VALIDATOR';
export const createValidator = (selectedValidator, selectedPredicate) => ({
    type: CREATE_VALIDATOR,
    payload: { selectedValidator, selectedPredicate}
});

export const REMOVE_VALIDATOR = 'REMOVE_VALIDATOR';
export const removeValidator = validator => ({
    type: REMOVE_VALIDATOR,
    payload: { validator }
})