import { all, call } from 'redux-saga/effects';
import { initSaga } from './initSaga';
import { validateAuth } from './authSaga';
import { taListSaga } from './taListSaga';
import tokenReportSaga from './tokenReportSaga';

function* rootSaga() {
  yield all([
    call(initSaga),
    call(validateAuth),
    call(taListSaga),
    call(tokenReportSaga)
  ]);
}

export default rootSaga;