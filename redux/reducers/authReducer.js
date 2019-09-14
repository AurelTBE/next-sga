import { AUTHENTICATE, DEAUTHENTICATE } from '../actionTypes';

const authReducer = (state = { token: null }, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return { ...state, token: action.payload };
        case DEAUTHENTICATE:
            return { token: null };
        default:
            return state;
    }
};

export default authReducer;