import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import jobReducer from '../reducers/jobReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    jobs: jobReducer
});

export default rootReducer;
