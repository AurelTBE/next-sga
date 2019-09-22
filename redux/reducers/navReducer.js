import { HOMETAB } from '../actionTypes';

const reducer = (state = 0, action) => {
    switch (action.type) {
        case HOMETAB:
            return action.payload
        default:
            return state;
    }
};

export default reducer;