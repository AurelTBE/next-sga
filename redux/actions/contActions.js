import { HOMEACTUS, VIDPLAYCONTENT } from '../actionTypes';

export const sethomeactus = content => {
    return dispatch => {
        dispatch({ type: HOMEACTUS, payload: content });
    };
};

export const setactivideo = content => {
    return dispatch => {
        dispatch({ type: VIDPLAYCONTENT, payload: content });
    };
};
