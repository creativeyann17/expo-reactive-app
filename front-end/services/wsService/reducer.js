import * as actionTypes from './actionTypes';

export const initialState = {
  ws: undefined,
  retry: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.WS_SERVICE_OPEN:
      return {
        ...state,
        retry: state.retry + 1,
      };
    case actionTypes.WS_SERVICE_ON_OPEN:
      return {
        ...state,
        ws: action.ws,
        retry: 0,
      };
    case actionTypes.WS_SERVICE_ON_CLOSE:
      return {
        ...state,
        ws: undefined,
      };
    default:
      return state;
  }
}
