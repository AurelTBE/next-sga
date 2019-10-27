import { AUTHENTICATE, AUTHERROR, DEAUTHENTICATE } from '../actionTypes';

export const authReducer = (state = { token: null }, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return { ...state, token: action.payload };
        case DEAUTHENTICATE:
            return { token: null };
        default:
            return state;
    }
};

export const authError = (state={}, action) => {
    switch (action.type) {
        case AUTHERROR:
            return action.payload;
        default:
            return state;
    }
};