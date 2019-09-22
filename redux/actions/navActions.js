import { HOMETAB } from '../actionTypes';

export const setactivhometab = activetab => {
    return dispatch => {
        dispatch({ type: HOMETAB, payload: activetab });
    };
};