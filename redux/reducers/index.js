import { combineReducers } from 'redux';
import authReducer from './authReducer';
import activhometab from './navReducer';
import boUrl from './boUrl';

const rootReducer = combineReducers({
    url: boUrl,
    activhometab,
    authentication: authReducer,
});

export default rootReducer;