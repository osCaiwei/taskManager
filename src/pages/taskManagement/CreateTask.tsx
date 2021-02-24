import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText, ProFormDatePicker, ProFormSelect } from '@ant-design/pro-form';
import { Row, Col, message } from 'antd';
import 'leaflet/dist/leaflet.css';
import Map from '@/components/Map/map';
import { CircleMarker, Popup, useMapEvent } from 'react-leaflet';
import { getAddress, getLocationCode, searchUser, setTask } from '@/services/task';

export type FormData = {
  taskContent: string;
  taskTime: Date;
  mapLocation: number[];
  location: string;
  actor: OptionData[];
};

export type UserData = {
  userId: number;
  userName: string;
  password?: string;
  userRoles?: string;
  phoneNum?: string;
};

export type OptionData = {
  label: string;
  value: number | string;
};

export default function CreateTask() {
  const [isfly, setIsfly] = useState(false);
  const [loaction, setLoaction] = useState<string>('1');
  const [mapLoaction, setMapLoaction] = useState<any>({ lat: 30.592935, lng: 114.305215 });
  const [searchVal, setSearchVal] = useState<any[]>([]);

  useEffect(() => {
    getAddress(mapLoaction.lng, mapLoaction.lat).then((res) => {
      if (res.ret === 1) {
        setLoaction(res.result.regeocode.formatted_address);
      }
    });
    const searchData: OptionData[] = [];
    searchUser('').then((res) => {
      if (res.ret === 1) {
        res.result.forEach((value: UserData) => {
          searchData.push({
            label: value.userName,
            value: value.userId,
          });
        });
        setSearchVal(searchData);
      } else {
        message.error(res.msg);
      }
    });
  }, [mapLoaction]);

  function MyComponent(prop: any) {
    const map = useMapEvent('click', (e) => {
      setMapLoaction(e.latlng);
      // addLocation([e.latlng.lat, e.latlng.lng]).then((res) => {
      //   console.log(res);
      // });
    });

    if (prop.isfly) {
      map.flyTo(prop.mapLoaction, map.getZoom());
    }

    return (
      <CircleMarker center={mapLoaction}>
        <Popup>You are here</Popup>
      </CircleMarker>
    );
  }

  return (
    <div>
      <Row>
        <Col span="24" style={{ justifyItems: 'center', alignItems: 'center' }}>
          <ProForm
            style={{
              width: '600px',
              margin: '0 auto',
            }}
            onFinish={async (val) => {
              const res = await setTask({
                taskContent: val.taskname,
                taskTime: val.tasktime,
                mapLocation: [mapLoaction.lat, mapLoaction.lng],
                location: loaction,
                actor: val.actor,
              });
              // console.log(res)
              if (res.ret === 1) {
                message.success('🎉 🎉 🎉  上传成功！');
              } else {
                message.error('上传失败');
              }
            }}
          >
            <ProFormText
              name="taskname"
              label="任务内容："
              rules={[
                {
                  required: true,
                  message: '任务名不能为空',
                },
              ]}
            />

            <ProFormDatePicker
              name="tasktime"
              label="任务时间："
              rules={[
                {
                  required: true,
                  message: '时间不能为空',
                },
              ]}
            />

            <ProFormText
              fieldProps={{
                value: loaction,
                onChange: (e) => {
                  setLoaction(e.target.value);
                },
                onBlur: () => {
                  getLocationCode(loaction).then((res) => {
                    if (res.ret === 1) {
                      setMapLoaction({
                        lat: Number(res.result.geocodes[0].location.split(',')[1]),
                        lng: Number(res.result.geocodes[0].location.split(',')[0]),
                      });
                      setIsfly(true);
                    }
                  });
                },
              }}
              label="任务地点："
            />

            <div style={{ width: '500px', height: '300px', marginBottom: '30px' }}>
              <Map mapCenter={[30.592935, 114.305215]}>
                <MyComponent mapLoaction={mapLoaction} isfly={isfly} />
              </Map>
            </div>

            <ProFormSelect
              name="actor"
              label="执行人："
              fieldProps={{
                mode: 'multiple',
                labelInValue: true,
                filterOption: false,
                onSearch: (val) => {
                  const searchData: OptionData[] = [];
                  searchUser(val).then((res) => {
                    if (res.ret === 1) {
                      res.result.forEach((value: UserData) => {
                        searchData.push({
                          label: value.userName,
                          value: value.userId,
                        });
                      });
                      setSearchVal(searchData);
                    } else {
                      message.error(res.msg);
                    }
                  });
                },
              }}
              options={searchVal}
            />
          </ProForm>
        </Col>
      </Row>
    </div>
  );
}
