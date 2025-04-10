import { all, call } from 'redux-saga/effects';
import { initSaga } from './initSaga';
import { dashboardSaga } from './dashboardSaga';
import { validateAuth } from './authSaga';
import { taListSaga } from './taListSaga';
import tokenReportSaga from './tokenReportSaga';

function* rootSaga() {
  yield all([
    call(initSaga),
    call(validateAuth),
    call(dashboardSaga),
    call(taListSaga),
    call(tokenReportSaga)
  ]);
}

export default rootSaga;