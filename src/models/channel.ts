import { Effect } from 'dva';
import { Reducer } from 'redux';

import { getChannelData, getChannelDataBySearch } from '@/services/channel';

export interface Channel {
  id: number;
  name: string;
  age: number;
  city: string;
}

export interface ChannelModelType {
  namespace: 'channel';
  state: { data: Channel[] };
  effects: {
    getChannelData: Effect;
    getChannelDataBySearch: Effect;
  };
  reducers: {
    channelData: Reducer<{ data: Channel[] }>;
    channelDataBySearch: Reducer<{ data: Channel[] }>;
  };
}

const Model: ChannelModelType = {
  namespace: 'channel',
  state: {
    data: [],
  },
  effects: {
    *getChannelData({ payload }, { call, put }) {
      const response = yield call(getChannelData, payload);
      yield put({
        type: 'channelData',
        payload: response,
      });
    },
    *getChannelDataBySearch({ payload }, { call, put }) {
      const response = yield call(getChannelDataBySearch, payload);
      yield put({
        type: 'channelDataBySearch',
        payload: response,
      });
    },
  },
  reducers: {
    channelData(state, { payload }) {
      return { ...state, data: [...payload.data] };
    },
    channelDataBySearch(state, { payload }) {
      return { ...state, data: [...payload.data] };
    },
  },
};
export default Model;
