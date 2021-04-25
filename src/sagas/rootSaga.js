import {all} from 'redux-saga/effects';
import forumsRootSaga from './forumsSaga';

export default function* rootSaga(){
    yield all([
        forumsRootSaga(),
        ]);
};

