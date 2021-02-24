import type { LatLngTuple } from 'leaflet';
import type { ReactNode } from 'react';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

type MapProp = {
  children?: ReactNode;
  handClick?: any;
  mapCenter: LatLngTuple;
};

const MAP_CONFIG = {
  url: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=8&x={x}&y={y}&z={z}',
  subdomains: '1234',
  tileSize: 256,
  minZoom: 3,
  maxZoom: 18,
  detectRetina: true,
};

export default function Map(props: MapProp) {
  return (
    <MapContainer zoom={10} center={props.mapCenter} style={{ width: '100%', height: '100%' }}>
      <TileLayer {...MAP_CONFIG} />
      {props.children}
    </MapContainer>
  );
}
