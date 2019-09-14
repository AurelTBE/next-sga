import { combineReducers } from 'redux';
import authReducer from './authReducer';
import boUrl from './boUrl';

const rootReducer = combineReducers({
    url: boUrl,
    authentication: authReducer
});

export default rootReducer;