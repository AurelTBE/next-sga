import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { homeTabReducer, gfTabReducer, sgaTabReducer, resulTabReducer, mediaTabReducer, archivTabReducer } from './navReducer';

const rootReducer = combineReducers({
    activhometab: homeTabReducer,
    activgftab: gfTabReducer,
    activsgatab: sgaTabReducer,
    activresultab: resulTabReducer,
    activmediatab: mediaTabReducer,
    activarchivtab: archivTabReducer,
    authentication: authReducer,
});

export default rootReducer;