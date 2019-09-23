import { HOMETAB, GFTAB, SGATAB, RESULTAB, MEDIATAB, ARCHIVTAB } from '../actionTypes';

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

export const archivTabReducer = (state = 0, action) => {
    switch (action.type) {
        case ARCHIVTAB:
            return action.payload;
        default:
            return state;
    }
};