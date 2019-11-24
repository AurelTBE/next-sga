import { VIDPLAYCONTENT } from '../actionTypes';

export const setactivideo = content => {
    return dispatch => {
        dispatch({ type: VIDPLAYCONTENT, payload: content });
    };
};