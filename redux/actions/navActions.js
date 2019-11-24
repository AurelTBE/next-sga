import { HOMETAB, GFTAB, SGATAB, RESULTAB, MEDIATAB, JUGESTAB, AUDIOPLAY, NOTIFPERM, LOADING } from '../actionTypes';

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

export const setactivjugestab = activetab => {
    return dispatch => {
        dispatch({ type: JUGESTAB, payload: activetab });
    };
};

export const setprogress = activetab => {
    return dispatch => {
        dispatch({ type: AUDIOPLAY, payload: activetab });
    };
};

export const setnotifperm = perm => {
    return dispatch => {
        dispatch({ type: NOTIFPERM, payload: perm });
    };
};

export const setloading = loadingstate => {
    return dispatch => {
        dispatch({ type: LOADING, payload: loadingstate });
    };
};