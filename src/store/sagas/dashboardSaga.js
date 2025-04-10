import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_DATA_REQUEST } from '../actions/dashboardActions';
import { fetchDataSuccess, fetchDataFailure } from '../actions/dashboardActions';
import { fetchWithAuth } from '../api/apiService';

function* fetchDashboardData() {
  try {
    //const response = yield call(fetchData, 'posts');
    //const data = yield response.json();
    const data = yield call(fetchWithAuth, 'users');
    yield put(fetchDataSuccess(data.slice(0, 10))); // Limit to 10 rows
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* dashboardSaga() {
  yield takeLatest(FETCH_DATA_REQUEST, fetchDashboardData);
}