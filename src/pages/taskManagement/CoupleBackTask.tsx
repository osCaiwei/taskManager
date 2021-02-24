import { getCoupleBackData, getTarck, getTaskMsg, setCoupleBack } from '@/services/task';
import React, { useEffect, useState } from 'react';
import {
  Descriptions,
  Tag,
  Comment,
  List,
  Steps,
  Tooltip,
  Drawer,
  Button,
  Input,
  message,
  Row,
  Col,
} from 'antd';
import type { TaskItem } from './GetTask';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import Map from '@/components/Map/map';
import { CircleMarker, Polyline, Popup } from 'react-leaflet';
import { analysisLocation } from '@/utils/location';

const { Step } = Steps;
const { TextArea } = Input;
const colorList = [
  'orange',
  'green',
  'blue',
  'pink',
  'brown',
  'purple',
  '#2BD5D5',
  '#4444BB',
  '#997B66',
];

export type CoupleBackProp = {
  match: { params: { taskId: string } };
};

export type CoupleBackType = {
  tarckingId: number;
  feedbackText: string;
  createTime: Date;
  updateTime: Date;
  recipientName: string;
  taskId: string;
  positioningAddress: string;
};

export type PositionResType = {
  id: number;
  userId: number;
  positioningAddress: string;
  createTime: string | Date;
  userName: string;
};

export default function CoupleBackTask(props: CoupleBackProp) {
  // state
  const [taskMsg, setTaskMsg] = useState<TaskItem>();
  const [coupleBackData, setCoupleBackData] = useState<CoupleBackType[]>([]);
  const [visible, setVisible] = useState(false);
  const [coupleBackVal, setCoupleBackVal] = useState<string>();
  const [listTotal, setListTotal] = useState<number>(0);
  const [tarckData, setTarckData] = useState<PositionResType[][]>([[]]);
  // const [timerIdArr, setTimerIdArr] = useState<any>(0)
  // request TaskData
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    getTaskMsg(props.match.params.taskId).then((res) => {
      if (res.ret === 1) {
        // 解析任务目的地定位
        res.result[0].mapLocation = analysisLocation(res.result[0].mapLocation);
        setTaskMsg(res.result[0]);
        // 根据执行人生成请求定位路线数据
        timer = setInterval(() => {
          const params: any[] = [];
          res.result[0].actorList.forEach((val: any) => {
            params.push(
              getTarck({ userId: val.recipientId, startTime: '2021-1-18', endTime: '2021-1-30' }),
            );
          });
          Promise.all(params).then((resArr) => {
            const tkData: PositionResType[][] = [];
            resArr.forEach((val: { ret: number; result: PositionResType[]; msg: string }) => {
              if (val.ret === 1) {
                tkData.push(val.result);
              }
            });
            setTarckData(tkData);
          });
          // setTimerIdArr(timer)
        }, 5000);
      }
    });

    getCoupleBackData({
      current: 1,
      pageSize: 5,
      taskId: props.match.params.taskId,
    }).then((res) => {
      // console.log(res)
      if (res.ret === 1) {
        setCoupleBackData(res.result);
        setListTotal(res.total);
      }
    });
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = undefined;
      }
    };
  }, [props.match.params]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmitVal = () => {
    if (coupleBackVal && taskMsg) {
      setCoupleBack({
        taskId: taskMsg.taskId,
        feedbackText: coupleBackVal,
      }).then((res) => {
        if (res.ret === 1) {
          message.success('🎉 🎉 🎉  上传成功！');
          setCoupleBackData(res.result);
          setListTotal(res.total);
          setVisible(false);
        }
      });
    }
  };

  return (
    <>
      <Descriptions title="任务详情" size="small">
        {taskMsg?.taskContent ? (
          <>
            <Descriptions.Item label="创建人">{taskMsg.founderName}</Descriptions.Item>
            <Descriptions.Item label="任务地点">{taskMsg.location}</Descriptions.Item>
            <Descriptions.Item label="结束时间">{taskMsg.taskTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{taskMsg.updateTime}</Descriptions.Item>
            <Descriptions.Item label="执行人">
              {taskMsg.actorList.map((val) => {
                return <Tag color="success">{val.actor}</Tag>;
              })}
            </Descriptions.Item>
            <Descriptions.Item label="任务状态">
              <Steps current={Number(taskMsg.isStatus)} size="small">
                <Step title="未领取" />
                <Step title="以确认" />
                <Step title="进行中" />
                <Step title="已完成" />
              </Steps>
            </Descriptions.Item>
            <Descriptions.Item label="任务内容">{taskMsg.taskContent}</Descriptions.Item>
          </>
        ) : null}
      </Descriptions>
      <Row>
        <Col span={16}>
          <List
            header={<h3 style={{ fontWeight: 600 }}>任务反馈</h3>}
            itemLayout="horizontal"
            dataSource={coupleBackData}
            pagination={{
              onChange: (page, pageSize) => {
                getCoupleBackData({
                  current: page,
                  pageSize,
                  taskId: props.match.params.taskId,
                }).then((res) => {
                  if (res.ret === 1) {
                    setCoupleBackData(res.result);
                    setListTotal(res.total);
                  }
                });
              },
              total: listTotal,
              pageSize: 5,
              // hideOnSinglePage: true
            }}
            footer={
              <Button type="primary" onClick={showDrawer}>
                <PlusOutlined /> 添加反馈
              </Button>
            }
            renderItem={(item) => (
              <li key={item.tarckingId}>
                <Comment
                  author={item.recipientName}
                  avatar={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                  content={item.feedbackText}
                  datetime={
                    <Tooltip title={item.updateTime}>
                      <span>{moment().subtract(1, 'days').fromNow()}</span>
                    </Tooltip>
                  }
                />
              </li>
            )}
          />
        </Col>
        <Col span={8}>
          <div style={{ width: '100%', height: '100%' }}>
            {taskMsg?.mapLocation.length === 2 ? (
              <Map mapCenter={[taskMsg.mapLocation[0], taskMsg.mapLocation[1]]}>
                {/* 目的地定位显示 */}
                <CircleMarker center={[taskMsg.mapLocation[0], taskMsg.mapLocation[1]]} color="red">
                  <Popup>{`任务目的地：${taskMsg.location}`}</Popup>
                </CircleMarker>
                {/* 反馈定位显示 */}
                {coupleBackData.map((val) => {
                  if (val.positioningAddress) {
                    const location = analysisLocation(val.positioningAddress);
                    return (
                      <CircleMarker center={[location[0], location[1]]} color="yellow">
                        <Popup>{`任务反馈：${val.feedbackText}`}</Popup>
                      </CircleMarker>
                    );
                  }
                  return null;
                })}
                {/* 执行人路线显示 */}
                {tarckData.length > 0
                  ? tarckData.map((actorTarckArr, index) => {
                      let actorLineData: any = [];
                      if (actorTarckArr.length > 0) {
                        actorLineData = actorTarckArr.map((actorTarck) => {
                          return analysisLocation(actorTarck.positioningAddress);
                        });
                      }
                      return (
                        <>
                          <Polyline
                            positions={actorLineData}
                            lineCap="round"
                            color={colorList[index]}
                          />
                          {actorTarckArr.map((val) => {
                            const location = analysisLocation(val.positioningAddress);
                            return (
                              <CircleMarker
                                center={[location[0], location[1]]}
                                color={colorList[index]}
                              >
                                <Popup>{`执行信息：${val.userName}  ${moment(val.createTime).format(
                                  'YYYY-MM-DD hh:mm:ss',
                                )}`}</Popup>
                              </CircleMarker>
                            );
                          })}
                        </>
                      );
                    })
                  : null}
              </Map>
            ) : null}
          </div>
        </Col>
      </Row>
      <Drawer
        title="添加反馈"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        placement="bottom"
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button onClick={onSubmitVal} type="primary">
              发布反馈
            </Button>
          </div>
        }
      >
        <TextArea
          allowClear={true}
          value={coupleBackVal}
          onChange={(e) => {
            setCoupleBackVal(e.target.value);
          }}
        ></TextArea>
      </Drawer>
    </>
  );
}
