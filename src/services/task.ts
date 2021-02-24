import request from '@/utils/request';
import type { FormData } from '@/pages/taskManagement/CreateTask';

export type TaskReq = {
  actor?: string[];
  current: number;
  founderName?: string;
  isStatus?: string | number;
  location?: string;
  pageSize: number;
  taskConent?: string;
  taskTime?: Date;
  updataTime?: Date;
};

export type ListParamsType = {
  current: number;
  pageSize: number;
};

export async function getAddress(longitude: number, latitude: number) {
  return request(`/api/taskPosition/getAddress?longitude=${longitude}&latitude=${latitude}`, {
    method: 'GET',
  });
}

export async function getLocationCode(address: string) {
  return request(`/api/taskPosition/getLocationCode?address=${address}`, {
    method: 'GET',
  });
}

export async function setTask(task: FormData) {
  return request('/api/taskCreation/createTaskCreation', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
}

export async function searchUser(name?: string) {
  return request(`/api/user/getSearchUser?userName=${name}`, {
    method: 'GET',
  });
}

export async function affirmTask(taskId: string, isStatus: string) {
  return request('/api/taskCreation/updateTaskTrackingn', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ taskId, isStatus }),
  });
}

export async function getTaskList(params: any) {
  return request('/api/taskCreation/getTaskCreation', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function getTaskMsg(params: string) {
  return request(`/api/taskCreation/getSingleTaskCreation`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      taskId: params,
    }),
  });
}

export async function getCoupleBackData(params: {
  taskId: string;
  current: number;
  pageSize: number | undefined;
}) {
  return request('/api/taskTracking/getTaskTracking', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function setCoupleBack(params: {
  taskId: string;
  feedbackText: string;
  positioningAddress?: number[];
}) {
  return request('/api/taskTracking/createTaskTracking', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function getTarck(params: { userId: number; startTime: string; endTime: string }) {
  return request('/api/taskPosition/getTaskPosition', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function addLocation(params: number[]) {
  return request('/api/taskPosition/createTaskPosition', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      positioningAddress: params,
    }),
  });
}
