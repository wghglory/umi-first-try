import request from '@/utils/request';

export async function getChannelData() {
  return request('/api/getChannelData', {
    method: 'get',
  });
}
export async function getChannelDataBySearch(params: any) {
  return request('/api/getChannelDataBySearch', {
    method: 'post',
    data: params,
  });
}
