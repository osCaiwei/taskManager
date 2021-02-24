import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/user/getLoginAgain');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function getUserList(params: any) {
  return request('/api/user/getUserInfo', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function setUser(params: any) {
  return request('/api/user/updateUserInfo', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function addUser(params: any) {
  return request('/api/user/createUserInfo', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}
