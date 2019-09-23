import { HOMETAB, GFTAB, SGATAB, RESULTAB, MEDIATAB, ARCHIVTAB } from '../actionTypes';

export const setactivhometab = activetab => {
    return dispatch => {
        dispatch({ type: HOMETAB, payload: activetab });
    };
};

export const setactivsgatab = activetab => {
    return dispatch => {
        dispatch({ type: SGATAB, payload: activetab });
    };
};

export const setactivgftab = activetab => {
    return dispatch => {
        dispatch({ type: GFTAB, payload: activetab });
    };
};

export const setactivresultab = activetab => {
    return dispatch => {
        dispatch({ type: RESULTAB, payload: activetab });
    };
};

export const setactivmediatab = activetab => {
    return dispatch => {
        dispatch({ type: MEDIATAB, payload: activetab });
    };
};

export const setactivarchivtab = activetab => {
    return dispatch => {
        dispatch({ type: ARCHIVTAB, payload: activetab });
    };
};