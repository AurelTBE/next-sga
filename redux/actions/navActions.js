import { HOMETAB, GFTAB } from '../actionTypes';

export const setactivhometab = activetab => {
    return dispatch => {
        dispatch({ type: HOMETAB, payload: activetab });
    };
};

export const setactivgftab = activetab => {
    return dispatch => {
        dispatch({ type: GFTAB, payload: activetab });
    };
};