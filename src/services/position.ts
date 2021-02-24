import request from '@/utils/request';

export async function getPosition() {
  return request('/api/taskPosition/getAllTaskPosition', {
    method: 'GEt',
  });
}
