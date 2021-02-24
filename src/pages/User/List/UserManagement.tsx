import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Radio } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { addUser, getUserList, setUser } from '@/services/user';

type UserItem = {
  userId: number;
  userName: string;
  phoneNum: string;
  password: string;
  userRoles: string;
};

const columns: ProColumns<UserItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
	},
	{
    title: '用户ID',
    dataIndex: 'userId',
    copyable: true,
		ellipsis: true,
		editable: false,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '联系方式',
    dataIndex: 'phoneNum',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '密码',
    hideInSearch: true,
    dataIndex: 'password',
    copyable: false,
    valueType: 'password',
  },
  {
    title: '权限',
    dataIndex: 'userRoles',
    valueType: 'select',
    valueEnum: {
      user: {
        text: '普通用户',
      },
      admin: {
        text: '管理员',
      },
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.userId);
        }}
      >
        编辑
      </a>,
      <a key="del" onClick={() => {}}>
        删除
      </a>,
    ],
  },
];

export default () => {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();
  return (
    <>
      <ProTable<UserItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params) => {
          const res = await getUserList(params);
          if (res.ret === 1) {
            return {
              data: res.result,
              success: true,
              total: res.total,
            };
          }
          return {
            data: [],
            success: true,
            total: 10,
          };
        }}
        editable={{
          type: 'multiple',
          onSave: async (key, row) => {
            const res = await setUser(row);
            if (res.ret === 1) {
              return Promise.resolve(true);
            }
            return Promise.resolve(false);
            message.error('修改失败');
          },
        }}
        rowKey="userId"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="用户管理"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setShowAdd(true);
            }}
          >
            新建
          </Button>,
        ]}
      />
      <Modal
        visible={showAdd}
        onCancel={() => {
          setShowAdd(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              // eslint-disable-next-line consistent-return
              addUser(values).then((res) => {
                if (res.ret === 1) {
                  message.success('添加成功');
                  actionRef.current?.reload();
                  setShowAdd(false);
                } else {
                  message.error('添加失败');
                }
              });
              // onCreate(values);
            })
            .catch((info) => {
              message.error(info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name="userName"
            label="用户名"
            rules={[{ required: true, message: 'Please input the userName' }]}
          >
            <Input />
          </Form.Item>
					<Form.Item
            name="userId"
            label="用户ID"
            rules={[{ required: true, message: 'Please input the userId' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="用户密码"
            rules={[{ required: true, message: 'Please input the password' }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="phoneNum"
            label="联系方式"
            rules={[{ required: true, message: 'Please input the password' }]}
          >
            <Input type="tel" />
          </Form.Item>
          <Form.Item
            name="userRoles"
            label="用户权限"
            rules={[{ required: true, message: 'Please select the userRoles' }]}
            className="collection-create-form_last-form-item"
          >
            <Radio.Group>
              <Radio value="admin">管理员</Radio>
              <Radio value="user">普通用户</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
