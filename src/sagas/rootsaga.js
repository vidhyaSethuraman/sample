import { all } from 'redux-saga/effects';
import {watchCO, watchDO,watchED,watchCU,watchAD}   from './saga';


export default function* rootSaga() {
  yield all([
    watchCO(),
    watchDO(),
    watchED(),
    watchCU(),
    watchAD()
  ]);
}