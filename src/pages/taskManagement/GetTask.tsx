import React, { useRef, useState } from 'react';
import { Tag, Space } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { affirmTask, getTaskList } from '@/services/task';
import { history } from 'umi';

export type actorType = {
  recipientId: number;
  actor: string;
};

export type TaskItem = {
  taskContent: string;
  taskId: string;
  location: string;
  mapLocation: number[];
  founderName: string;
  updateTime: Date;
  taskTime: Date;
  recipientld: string[];
  actorList: actorType[];
  isStatus: string;
};

export default function GetTask() {
  const actionRef = useRef<ActionType>();
  const [isUpdata, setIsUpdata] = useState<any>(false);
  const columns: ProColumns<TaskItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '任务内容',
      dataIndex: 'taskContent',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      width: '20%',
    },
    {
      title: '任务状态',
      dataIndex: 'isStatus',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        '0': { text: '未领取', status: 'Error' },
        '1': {
          text: '已确认',
          status: 'Processing',
        },
        '2': {
          text: '进行中',
          status: 'Processing',
        },
        '3': {
          text: '已完成',
          status: 'Success',
        },
      },
    },
    {
      title: '任务地址',
      dataIndex: 'location',
    },
    {
      title: '创建人',
      dataIndex: 'founderName',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      valueType: 'date',
    },
    {
      title: '操作人',
      dataIndex: 'actorList',
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          {record.actorList.map((val) => (
            <Tag color="success" key={val.recipientId}>
              {val.actor}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '结束时间',
      key: 'taskTime',
      dataIndex: 'taskTime',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => [
        <a
          key="ok"
          onClick={() => {
            affirmTask(record.taskId, '1').then((res) => {
              if (res.ret === 1) {
                setIsUpdata(!isUpdata);
              }
            });
          }}
        >
          确认任务
        </a>,
        <a
          key="detail"
          onClick={() => {
            history.push(`/task/coupleBackTask/${record.taskId}`);
          }}
        >
          任务详情
        </a>,
      ],
    },
  ];
  return (
    <ProTable<TaskItem>
      columns={columns}
      actionRef={actionRef}
      params={isUpdata}
      request={async (params) => {
        const res = await getTaskList(params);
        if (res.ret !== 1) {
          return {
            success: false,
            data: [],
            total: 0,
          };
        }
        return {
          success: true,
          data: res.result,
          total: res.total,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      rowKey="taskId"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      // toolBarRender={() => [
      //   <Button key="button" icon={<PlusOutlined />} type="primary">
      //     新建
      //   </Button>,
      //   <Dropdown key="menu" overlay={menu}>
      //     <Button>
      //       <EllipsisOutlined />
      //     </Button>
      //   </Dropdown>,
      // ]}
    />
  );
}
