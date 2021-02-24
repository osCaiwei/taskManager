import { Request, Response } from 'express';

function getAddress(req: Request, res: Response) {
  const data = {
    status: 1,
    regeocode: {
      addressComponent: {
        city: [],
        province: '北京市',
        adcode: 110105,
        district: '朝阳区',
        towncode: '110105026000',
        streetNumber: {
          number: '6号',
          location: [116.482005, 39.990056],
          direction: '东南',
          distance: 63.2126,
          street: '阜通东大街',
        },
        country: '中国',
        township: '望京街道',
        businessAreas: [
          {
            location: [116.470293, 39.996171],
            name: '望京',
            id: 110105,
          },
          {
            location: [116.494356, 39.971563],
            name: '酒仙桥',
            id: 110105,
          },
          {
            location: [116.492891, 39.981321],
            name: '大山子',
            id: 110105,
          },
        ],
        building: {
          name: '方恒国际中心B座',
          type: '商务住宅;楼宇;商务写字楼',
        },
        neighborhood: {
          name: '方恒国际中心',
          type: '商务住宅;楼宇;商住两用楼宇',
        },
        citycode: '010',
      },
      formatted_address: '北京市朝阳区望京街道方恒国际中心B座',
    },
    info: 'OK',
    infocode: 10000,
  };
  res.send(data);
}

function getLocation(req: Request, res: Response) {
  const data = {
    status: 1,
    info: 'OK',
    infocode: '10000',
    count: 1,
    geocodes: [
      {
        formatted_address: '湖北省武汉市',
        country: '中国',
        province: '湖北省',
        citycode: '027',
        city: '武汉市',
        district: [],
        township: [],
        neighborhood: {
          name: [],
          type: [],
        },
        building: {
          name: [],
          type: [],
        },
        adcode: 420100,
        street: [],
        number: [],
        location: [114.305392, 30.593098],
        level: '市',
      },
    ],
  };
  res.send(data);
}

export default {
  'GET /api/getAddress': getAddress,
  'GET /api/getLoactionCode': getLocation,
  'GET /api/searchUser': {
    ret: 1,
    result: [
      {
        userId: '00000002',
        userName: '李四',
        phoneNum: null,
      },
      {
        userId: '00000001',
        userName: '张三',
        phoneNum: null,
      },
    ],
    msg: 'OK',
  },
  'POST /api/setTask': {
    ret: 1,
    result: [],
    msg: 'OK',
  },
  'POST /api/getTask': {
    ret: 1,
    result: [
      {
        taskConent: '你好啊',
        taskId: 0,
        location: '湖北武汉',
        mapLocation: [1, 2],
        founderName: 'caiwei',
        updataTime: new Date('1998-10-02'),
        taskTime: new Date('1998-10-02'),
        recipientld: ['1', '2'],
        actor: ['zhangsan', 'lisi'],
        isStatus: 0,
      },
      {
        taskConent: '你好啊',
        taskId: 1,
        location: '湖北武汉',
        mapLocation: [1, 2],
        founderName: 'caiwei',
        updataTime: new Date('1998-10-02'),
        taskTime: new Date('1998-10-02'),
        recipientld: ['1', '2'],
        actor: ['zhangsan', 'lisi'],
        isStatus: 1,
      },
      {
        taskConent: '你好啊',
        taskId: 2,
        location: '湖北武汉',
        mapLocation: [1, 2],
        founderName: 'caiwei',
        updataTime: new Date('1998-10-02'),
        taskTime: new Date('1998-10-02'),
        recipientld: ['1', '2'],
        actor: ['zhangsan', 'lisi'],
        isStatus: 2,
      },
      {
        taskConent: '你好啊',
        taskId: 3,
        location: '湖北武汉',
        mapLocation: [1, 2],
        founderName: 'caiwei',
        updataTime: new Date('1998-10-02'),
        taskTime: new Date('1998-10-02'),
        recipientld: ['1', '2'],
        actor: ['zhangsan', 'lisi'],
        isStatus: 3,
      },
    ],
    msg: 'ok',
  },
  'GET /api/getTaskMsg': {
    ret: 1,
    result: [
      {
        taskConent: '你好啊',
        taskId: 0,
        location: '湖北武汉',
        mapLocation: [30.592935, 114.305215],
        founderName: 'caiwei',
        updateTime: new Date('1998-10-02'),
        taskTime: new Date('1998-10-02'),
        recipientld: ['1', '2'],
        actor: ['zhangsan', 'lisi'],
        isStatus: 2,
      },
    ],
    msg: 'ok',
  },
  'POST /api/getCoupleBackData': {
    ret: 1,
    result: [
      {
        tarckingId: 0,
        feedbackText: '这是反馈',
        createTime: new Date(),
        updateTime: new Date(),
        recipientName: 'zhaangsan',
        taskId: 0,
        positioningAddress: [2, 2],
      },
      {
        tarckingId: 1,
        feedbackText: '这是反馈',
        createTime: new Date(),
        updateTime: new Date(),
        recipientName: 'zhaangsan',
        taskId: 1,
        positioningAddress: [2, 2],
      },
      {
        tarckingId: 2,
        feedbackText: '这是反馈',
        createTime: new Date(),
        updateTime: new Date(),
        recipientName: 'lisi',
        taskId: 2,
        positioningAddress: [2, 2],
      },
      {
        tarckingId: 3,
        feedbackText: '这是反馈',
        createTime: new Date(),
        updateTime: new Date(),
        recipientName: 'zhangsan',
        taskId: 0,
        positioningAddress: [2, 2],
      },
    ],
    msg: 'ok',
  },
  'POST /api/setCoupleBack': {
    ret: 1,
    result: [
      {
        tarckingId: 0,
        feedbackText: '这是反馈',
        createTime: new Date(),
        updateTime: new Date(),
        recipientName: 'zhaangsan',
        taskId: 0,
        positioningAddress: [2, 2],
      },
      {
        tarckingId: 1,
        feedbackText: '这是反馈',
        createTime: new Date(),
        updateTime: new Date(),
        recipientName: 'zhaangsan',
        taskId: 1,
        positioningAddress: [2, 2],
      },
      {
        tarckingId: 2,
        feedbackText: '这是反馈',
        createTime: new Date(),
        updateTime: new Date(),
        recipientName: 'lisi',
        taskId: 2,
        positioningAddress: [2, 2],
      },
      {
        tarckingId: 3,
        feedbackText: '这是反馈',
        createTime: new Date(),
        updateTime: new Date(),
        recipientName: 'zhangsan',
        taskId: 0,
        positioningAddress: [2, 2],
      },
    ],
    msg: 'OK',
  },
};
