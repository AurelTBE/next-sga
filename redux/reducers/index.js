import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { homeTabReducer, gfTabReducer, sgaTabReducer, resulTabReducer, mediaTabReducer, jugesTabReducer } from './navReducer';
import { homeContentReducer, sgaContentReducer, gfContentReducer, jugContentReducer, currentActuReducer, currentResultReducer, galContentReducer, vidPlayReducer, mediathequeReducer, calendarReducer } from './contentReducer';

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
    currentactu: currentActuReducer,
    currentresult: currentResultReducer,
    galeriecontent: galContentReducer,
    vidplay: vidPlayReducer,
    mediatheque: mediathequeReducer,
    calendarevents: calendarReducer,
});

export default rootReducer;