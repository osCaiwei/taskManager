import { getPosition } from '@/services/position';
import { getTarck } from '@/services/task';
import { analysisLocation } from '@/utils/location';
import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer } from 'react-leaflet';
import type { PositionResType } from '../taskManagement/CoupleBackTask';

const MAP_CONFIG = {
  url: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=8&x={x}&y={y}&z={z}',
  subdomains: '1234',
  tileSize: 256,
  minZoom: 3,
  maxZoom: 18,
  detectRetina: true,
};

export type PositionType = {
  userId: number;
  positioningAddress: string;
  userName: string;
};

export default function UserMap() {
  const [isShow, setIsShow] = useState<'all' | 'detail'>('all');
  const [allPositionData, setAllPositionData] = useState<PositionType[]>([]);
  const [detailData, setDetailData] = useState<PositionResType[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    timer = setInterval(() => {
      getPosition().then((res) => {
        if (res.ret === 1) {
          setAllPositionData(res.result);
        }
      });
    }, 5000);
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = undefined;
      }
    };
  }, []);

  function showTrack(params: { userId: number; startTime: string; endTime: string }) {
    getTarck(params).then((res) => {
      if (res.ret === 1) {
        setDetailData(res.result);
        if (res.result.length > 0) {
          setIsShow('detail');
        } else {
          message.warn('当前用户展示没有轨迹可查询');
        }
      }
    });
  }

  function trackLine() {
    if (detailData.length > 0) {
      const actorLineData: any = detailData.map((actorTarck) => {
        return analysisLocation(actorTarck.positioningAddress);
      });
      return (
        <>
          <Polyline positions={actorLineData} lineCap="round" color="red" />
          {detailData.map((val) => {
            const location = analysisLocation(val.positioningAddress);
            return (
              <CircleMarker center={[location[0], location[1]]} color="red">
                <Popup>
                  <p>{`姓名：${val.userName}`}</p>
                  <Button
                    onClick={() => {
                      setIsShow('all');
                    }}
                  >
                    返回定位图
                  </Button>
                </Popup>
              </CircleMarker>
            );
          })}
        </>
      );
    }
    return null;
  }

  return (
    <div style={{ width: '100%', height: '650px' }}>
      <MapContainer
        zoom={10}
        center={[30.592935, 114.305215]}
        style={{ width: '100%', height: '650px' }}
      >
        <TileLayer {...MAP_CONFIG} />
        {isShow === 'all'
          ? allPositionData.map((val) => {
              const location = analysisLocation(val.positioningAddress);
              return (
                <CircleMarker center={[location[0], location[1]]} color="green">
                  <Popup>
                    <p>{`姓名：${val.userName}`}</p>
                    <Button
                      onClick={() => {
                        showTrack({
                          userId: val.userId,
                          startTime: '2021-1-18',
                          endTime: '2021-1-20',
                        });
                      }}
                    >
                      显示运动轨迹
                    </Button>
                  </Popup>
                </CircleMarker>
              );
            })
          : null}
        {isShow === 'detail' ? trackLine() : null}
      </MapContainer>
    </div>
  );
}
