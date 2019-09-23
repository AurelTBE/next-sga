import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { homeTabReducer, gfTabReducer, sgaTabReducer, resulTabReducer, mediaTabReducer, jugesTabReducer } from './navReducer';

const rootReducer = combineReducers({
    activhometab: homeTabReducer,
    activgftab: gfTabReducer,
    activsgatab: sgaTabReducer,
    activresultab: resulTabReducer,
    activmediatab: mediaTabReducer,
    activjugestab: jugesTabReducer,
    authentication: authReducer,
});

export default rootReducer;