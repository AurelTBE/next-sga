import { combineReducers } from 'redux';
import fooReducer from './fooReducer';
import authReducer from './authReducer';
import boUrl from './boUrl';

const rootReducer = combineReducers({
    url: boUrl,
    foo: fooReducer,
    authentication: authReducer
});

export default rootReducer;