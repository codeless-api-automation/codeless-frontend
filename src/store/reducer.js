import { CREATE_VALIDATOR, REMOVE_VALIDATOR } from './actions'

export const validators = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATE_VALIDATOR: {
            const { validator, predicate } = payload;
            let newValidator = {
                ...validator,
                predicate
            };
            return state.concat(newValidator);
        }
        case REMOVE_VALIDATOR: {
            const { validator } = payload;
            return state.filter(item => item.displayName !== validator.displayName);
        }
        default:
            return state;
    }
}