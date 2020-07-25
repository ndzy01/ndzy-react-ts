import { createActions, handleActions } from 'redux-actions';
import http from '../../http';
import { FaviconState } from './types';

const initFaviconState: FaviconState = {
  faviconUrl: '',
};

export const { getfavicon } = createActions({
  GETFAVICON: async () => {
    const res = await http({ url: '/layout/logo', method: 'get' });
    if (res.status === 200) {
      return res.data.data.url;
    } else {
      // throw new Error('请求异常');
      return '';
    }
  },
});

const faviconReducer = handleActions(
  {
    GETFAVICON: (state: FaviconState, action) => {
      return Object.assign({}, state, {
        faviconUrl: action.payload,
      });
    },
  },
  initFaviconState
);

export default faviconReducer;
