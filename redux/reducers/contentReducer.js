import { HOMECONTENT, SGACONTENT, GFCONTENT, JUGESCONTENT, GALERIECONTENT, VIDPLAYCONTENT, CURRENTACTU, CURRENTRESULT, MEDIATHEQUECONTENT, CALENDARCONTENT, RESULTSBOXCONTENT } from '../actionTypes';

export const homeContentReducer = (state={}, action) => {
    switch (action.type) {
        case HOMECONTENT:
            return action.payload;
        default:
            return state;
    }
};

export const sgaContentReducer = (state={}, action) => {
    switch (action.type) {
        case SGACONTENT:
            return action.payload;
        default:
            return state;
    }
};

export const gfContentReducer = (state={}, action) => {
    switch (action.type) {
        case GFCONTENT:
            return action.payload;
        default:
            return state;
    }
};

export const jugContentReducer = (state={}, action) => {
    switch (action.type) {
        case JUGESCONTENT:
            return action.payload;
        default:
            return state;
    }
};

export const currentActuReducer = (state={}, action) => {
    switch (action.type) {
        case CURRENTACTU:
            return action.payload;
        default:
            return state;
    }
};

export const currentResultReducer = (state={}, action) => {
    switch (action.type) {
        case CURRENTRESULT:
            return action.payload;
        default:
            return state;
    }
};

export const galContentReducer = (state={}, action) => {
    switch (action.type) {
        case GALERIECONTENT:
            return action.payload;
        default:
            return state;
    }
};

export const vidPlayReducer = (state={}, action) => {
    switch (action.type) {
        case VIDPLAYCONTENT:
            return action.payload;
        default:
            return state;
    }
};

export const mediathequeReducer = (state={}, action) => {
    switch (action.type) {
        case MEDIATHEQUECONTENT:
            return action.payload;
        default:
            return state;
    }
};

export const calendarReducer = (state={}, action) => {
    switch (action.type) {
        case CALENDARCONTENT:
            return action.payload;
        default:
            return state;
    }
};

export const resultsBoxReducer = (state={}, action) => {
    switch (action.type) {
        case RESULTSBOXCONTENT:
            return action.payload;
        default:
            return state;
    }
};