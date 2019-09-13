import { createStore } from 'redux';

export const reducer = (state = { foo: '' }, action) => {
    switch (action.type) {
        case 'FOO':
            return { ...state, foo: action.payload };
        default:
            return state;
    }
};

export const makeStore = (initialState, options) => {
    return createStore(reducer, initialState);
};