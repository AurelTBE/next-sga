import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { homeTabReducer, gfTabReducer } from './navReducer';
import boUrl from './boUrl';

const rootReducer = combineReducers({
    url: boUrl,
    activhometab: homeTabReducer,
    activgftab: gfTabReducer,
    authentication: authReducer,
});

export default rootReducer;