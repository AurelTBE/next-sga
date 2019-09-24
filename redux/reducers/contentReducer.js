import { HOMECONTENT } from '../actionTypes';

export const homeContentReducer = (state={}, action) => {
    switch (action.type) {
        case HOMECONTENT:
            return action.payload;
        default:
            return state;
    }
};