import { URL } from '../actionTypes';

const reducer = (state = { url: '' }, action) => {
    switch (action.type) {
        case URL:
            return { ...state, url: action.payload };
        default:
            return state;
    }
};

export default reducer;