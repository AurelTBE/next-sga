import { combineReducers } from 'redux';
import { authReducer, authError} from './authReducer';
import { homeTabReducer, gfTabReducer, sgaTabReducer, resulTabReducer, mediaTabReducer, jugesTabReducer, audioPlayReducer, notifPermReducer, loadingReducer } from './navReducer';
import { homeContentReducer, sgaContentReducer, gfContentReducer, jugContentReducer, currentActuReducer, currentResultReducer, galContentReducer, vidPlayReducer, mediathequeReducer, calendarReducer, resultsBoxReducer } from './contentReducer';

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
    audioprogress: audioPlayReducer,
    mediatheque: mediathequeReducer,
    calendarevents: calendarReducer,
    resultsbox: resultsBoxReducer,
    autherror: authError,
    notifperm: notifPermReducer,
    loadingstate: loadingReducer,
});

export default rootReducer;