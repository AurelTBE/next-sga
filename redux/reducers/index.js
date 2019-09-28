import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { homeTabReducer, gfTabReducer, sgaTabReducer, resulTabReducer, mediaTabReducer, jugesTabReducer } from './navReducer';
import { homeContentReducer, sgaContentReducer, gfContentReducer, jugContentReducer, galContentReducer } from './contentReducer';

const rootReducer = combineReducers({
    authentication: authReducer,
    activhometab: homeTabReducer,
    activgftab: gfTabReducer,
    activsgatab: sgaTabReducer,
    activresultab: resulTabReducer,
    activmediatab: mediaTabReducer,
    activjugestab: jugesTabReducer,
    homecontent: homeContentReducer,
    sgacontent: sgaContentReducer,
    gfcontent: gfContentReducer,
    jugescontent: jugContentReducer,
    galeriecontent: galContentReducer,
});

export default rootReducer;