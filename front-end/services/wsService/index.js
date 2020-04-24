import { take, fork, put, select, takeLatest, delay } from 'redux-saga/effects';
import { Platform } from 'react-native';
import { eventChannel } from 'redux-saga';
import get from 'lodash/get';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import { debug } from '../../utils/logger';

const buildUrl = (path) => {
  let protocol;
  let host;

  if (Platform.OS === 'web') {
    protocol = __DEV__ ? 'ws:' : window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    host = __DEV__ ? '//localhost:8080' : window.location.host;
    return new URL(path, protocol + host);
  } else {
    return 'ws://192.168.0.135:8080/ws';
  }
};

const isOpen = (socket) => {
  return get(socket, 'readyState', WebSocket.CLOSED) !== WebSocket.CLOSED;
};

function* watchOnOpen(socket) {
  const chan = eventChannel((emitter) => {
    socket.onopen = (event) => emitter(event);
    return () => {};
  });
  while (isOpen(socket)) {
    const event = yield take(chan);
    yield put(actions.wsServiceOnOpen(event.target));
  }
}

function* watchOnMessage(socket) {
  const chan = eventChannel((emitter) => {
    socket.onmessage = (event) => emitter(event);
    return () => {};
  });
  while (isOpen(socket)) {
    const event = yield take(chan);
    const data = JSON.parse(event.data);
    yield put(actions.wsServiceOnMessage(data));
  }
}

function* watchOnError(socket) {
  const chan = eventChannel((emitter) => {
    socket.onerror = (event) => emitter(event);
    return () => {};
  });
  while (isOpen(socket)) {
    const event = yield take(chan);
    yield put(actions.wsServiceOnError(event.code));
  }
}

function* watchOnClose(socket) {
  const chan = eventChannel((emitter) => {
    socket.onclose = (event) => emitter(event);
    return () => {};
  });
  while (isOpen(socket)) {
    const event = yield take(chan);
    yield put(actions.wsServiceOnClose(event.target));
  }
}

export function* watchClose() {
  const existingWs = yield select(selectors.ws);
  if (existingWs && isOpen(existingWs)) {
    existingWs.close();
  }
}

export function* watchRetryOpen() {
  yield delay(5000);
  yield put(actions.wsServiceOpen());
}

export function* watchOpen() {
  const existingWs = yield select(selectors.ws);
  const retry = yield select(selectors.retry);
  if (!existingWs && retry < 5) {
    const ws = new WebSocket(buildUrl('/ws'));
    yield fork(watchOnOpen, ws);
    yield fork(watchOnMessage, ws);
    yield fork(watchOnError, ws);
    yield fork(watchOnClose, ws);
    /*ws.onopen = () => {
      debug('onopen');
    };
    ws.onmessage = (message) => {
      debug('onmessage');
    };
    ws.onerror = (event) => {
      debug('onerror');
    };
    ws.onclose = () => {

      debug('onclose');
    };*/
  }
}

export default function* watchAsync() {
  yield takeLatest(actionTypes.WS_SERVICE_OPEN, watchOpen);
  yield takeLatest(actionTypes.WS_SERVICE_ON_ERROR, watchClose);
  yield takeLatest(actionTypes.WS_SERVICE_ON_CLOSE, watchRetryOpen);
}
