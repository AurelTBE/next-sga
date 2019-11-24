import { HOMETAB, GFTAB, SGATAB, RESULTAB, MEDIATAB, JUGESTAB, AUDIOPLAY, NOTIFPERM, LOADING } from '../actionTypes';

export const homeTabReducer = (state = 0, action) => {
    switch (action.type) {
        case HOMETAB:
            return action.payload;
        default:
            return state;
    }
};

export const gfTabReducer = (state = 0, action) => {
    switch (action.type) {
        case GFTAB:
            return action.payload;
        default:
            return state;
    }
};

export const sgaTabReducer = (state = 0, action) => {
    switch (action.type) {
        case SGATAB:
            return action.payload;
        default:
            return state;
    }
};

export const resulTabReducer = (state = 0, action) => {
    switch (action.type) {
        case RESULTAB:
            return action.payload;
        default:
            return state;
    }
};

export const mediaTabReducer = (state = 0, action) => {
    switch (action.type) {
        case MEDIATAB:
            return action.payload;
        default:
            return state;
    }
};

export const jugesTabReducer = (state = 0, action) => {
    switch (action.type) {
        case JUGESTAB:
            return action.payload;
        default:
            return state;
    }
};

export const audioPlayReducer = (state = 0, action) => {
    switch (action.type) {
        case AUDIOPLAY:
            return action.payload;
        default:
            return state;
    }
};

export const notifPermReducer = (state = true, action) => {
    switch (action.type) {
        case NOTIFPERM:
            return action.payload;
        default:
            return state;
    }
};

export const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case LOADING:
            return action.payload;
        default:
            return state;
    }
};