import { HOMETAB, GFTAB } from '../actionTypes';

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