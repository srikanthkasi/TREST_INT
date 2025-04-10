import { combineReducers } from 'redux';
import tokenReportReducer from './tokenReportReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  tokenReport: tokenReportReducer
});

export default rootReducer;